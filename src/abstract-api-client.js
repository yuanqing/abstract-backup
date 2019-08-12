const { Client } = require('abstract-sdk')
const { RateLimiter } = require('limiter')

class AbstractApiClient {
  constructor (accessToken) {
    this.client = new Client({ accessToken, transportMode: 'auto' })
    this.rateLimiter = new RateLimiter(120, 'minute')
    this.rateLimit = this.rateLimit.bind(this)
    this.retrieveProjects = this.retrieveProjects.bind(this)
    this.retrieveFiles = this.retrieveFiles.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }

  rateLimit (fn) {
    const { rateLimiter } = this
    return new Promise(function (resolve, reject) {
      rateLimiter.removeTokens(1, async function () {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  retrieveProjects () {
    const { client, rateLimit } = this
    return rateLimit(function () {
      return client.projects.list()
    })
  }

  retrieveFiles (projectId) {
    const { client, rateLimit } = this
    return rateLimit(function () {
      return client.files.list({
        projectId,
        branchId: 'master',
        sha: 'latest'
      })
    })
  }

  downloadFile (projectId, fileId, filename) {
    const { client, rateLimit } = this
    return rateLimit(function () {
      return client.files.raw(
        {
          projectId,
          branchId: 'master',
          fileId,
          sha: 'latest'
        },
        {
          filename
        }
      )
    })
  }
}

module.exports = AbstractApiClient
