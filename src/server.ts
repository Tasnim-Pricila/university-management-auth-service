/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function connect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected!')

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect to database', error)
  }

  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log('Unhandled rejection, closing the server')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
      })
    } else {
      process.exit(1)
    }
  })
}
connect()

process.on('SIGTERM', () => {
  logger.info('Sigterm is recieved')
  if (server) {
    server.close()
  }
})
