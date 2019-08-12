#!/usr/bin/env node

const sade = require('sade')
const abstractBackup = require('./abstract-backup')

sade('abstract-backup', true)
  .option('-t, --token', 'Access token')
  .option('-o, --output', 'Output directory')
  .action(async function ({ output, token }) {
    await abstractBackup(output, token)
  })
  .parse(process.argv)
