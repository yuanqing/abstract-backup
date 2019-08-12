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
  log.succeed(`Retrieved ${projects.length} projects`)
  await pEachSeries(projects, async function ({
    id: projectId,
    name: projectName
  }) {
    log.info(`Project: "${projectName}"`)
    log.start('Retrieving files...')
    const directory = join(outputDirectory, sanitizeFilename(projectName))
    await ensureDir(directory)
    const files = await client.retrieveFiles(projectId)
    log.succeed(`Retrieved ${files.length} files`)
    log.start(`Downloading ${files.length} files...`)
    let count = 0
    await Promise.all(
      files.map(async function ({ id: fileId, name, type }) {
        const filename = join(directory, sanitizeFilename(`${name}.${type}`))
        try {
          await client.downloadFile(projectId, fileId, filename)
        } catch (error) {
          log.error(`Download failed: "${filename}"`)
        }
        count++
        log.succeed(`File: "${filename}"`)
        const remaining = files.length - count
        log.start(
          `Downloading ${remaining} file${remaining === 1 ? '' : 's'}...`
        )
      })
    )
    log.succeed(`Downloaded ${files.length} files`)
  })
}

module.exports = abstractDownload
