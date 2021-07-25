'use strict'

const debug = require('debug')('pverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const proxy = require('./proxy')
const { error, log, emit } = require('pverse-utils')
// const chalk = require('chalk')
const socketio = require('socket.io')
const PAgent = require('pverse-agent')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const agent = new PAgent()

// Socket.io / WebSockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)
  emit.pipe(agent, socket)
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

process.on('uncaughtException', error.handleFatalError)
process.on('unhandledRejection', error.handleFatalError)

server.listen(port, () => {
  log.success(`server listening on port ${port}`, `[pverse-web]`)
  agent.connect()
})
