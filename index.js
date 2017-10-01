#!/usr/bin/env node

'use strict'

const got = require('got')
const fs = require('fs')
const tmpdir = require('os').tmpdir()
const {execSync} = require('child_process')

let server
const start = new Date()

try {
  server = fs.readFileSync(`${process.env.HOME}/.horst`, 'utf8')
} catch (_) {
  console.error('First set up https://github.com/horstpkg/server, then:')
  console.error()
  console.error('  echo SERVER_ADDRESS > ~/.horst')
  console.error()
  process.exit(1)
}

fs.createReadStream('package.json')
  .pipe(got.stream.post(serer))
  .pipe(fs.createWriteStream('.horst.tar.gz'))
  .on('close', () => {
    execSync('tar -xzf .horst.tar.gz')
    fs.unlinkSync('.horst.tar.gz')
    console.log(`Installed dependencies in ${new Date() - start}ms`)
  })
