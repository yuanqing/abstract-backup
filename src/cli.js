#!/usr/bin/env node

const sade = require('sade')
const abstractBackup = require('./abstract-backup')

sade('abstract-backup [token]', true)
  .option('-d, --directory', 'Directory to save your Sketch files')
  .action(async function (token, { directory }) {
    await abstractBackup(token, directory)
  })
  .parse(process.argv)
