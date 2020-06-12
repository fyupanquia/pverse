'use strict'

const http = require('http')
const chalk = require('chalk')
const asyncify = require('express-asyncify')
const express = require('express')
const debug = require('debug')
const api = require('./api')
const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)
// const db = require('pverse-db')
// const { db: { config } } = require('pverse-utils')

app.use('/api', api)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

if (!module.parent) { // if is not required
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(
      `${chalk.green('[pverse-api]')} server listening on port ${port}`
    )
  })
}

module.exports = server
