import { createLogger, format, transports } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label }) => {
  const date = new Date()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), myFormat, timestamp()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), myFormat, timestamp()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
})
