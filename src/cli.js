#!/usr/bin/env node

const sade = require('sade')
const abstractDownload = require('./abstract-download')

sade('abstract-download', true)
  .option('-t, --token', 'Access token')
  .option('-o, --output', 'Output directory')
  .action(async function ({ output, token }) {
    await abstractDownload(output, token)
  })
  .parse(process.argv)
