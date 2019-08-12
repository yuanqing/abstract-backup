const { ensureDir } = require('fs-extra')
const ora = require('ora')
const pEachSeries = require('p-each-series')
const { join } = require('path')
const sanitizeFilename = require('sanitize-filename')
const AbstractApiClient = require('./abstract-api-client')

async function abstractDownload (
  outputDirectory = './abstract-download',
  accessToken = process.env.ABSTRACT_TOKEN
) {
  if (typeof accessToken === 'undefined') {
    throw new Error('Need an access token')
  }
  const log = ora()
  await ensureDir(outputDirectory)
  const client = new AbstractApiClient(accessToken)
  log.start('Retrieving projects...')
  const projects = await client.retrieveProjects()
  await pEachSeries(projects, async function ({
    id: projectId,
    name: projectName
  }, index) {
    log.info(`${projectName} (${index + 1} of ${projects.length})`)
    const directory = join(outputDirectory, sanitizeFilename(projectName))
    await ensureDir(directory)
    const files = await client.retrieveFiles(projectId)
    log.start(`Downloading ${files.length} files...`)
    let downloadedFileCount = 0
    await Promise.all(
      files.map(async function ({ id: fileId, name, type }) {
        const filename = sanitizeFilename(`${name}.${type}`)
        const path = join(directory, filename)
        try {
          await client.downloadFile(projectId, fileId, path)
        } catch (error) {
          log.fail(`Failed: "${filename}"`)
        }
        downloadedFileCount++
        log.succeed(filename)
        const remaining = files.length - downloadedFileCount
        log.start(
          `${remaining} more file${remaining === 1 ? '' : 's'}...`
        )
      })
    )
    log.stop()
  })
}

module.exports = abstractDownload
