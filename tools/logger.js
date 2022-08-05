const winston = require('winston');
const config = require('../config');

const isProduction = config.app.env === 'production';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }

  return info;
});

const jsonifyObjectAndArray = winston.format((info) => {
  if (info.message && typeof info.message === 'object') {
    Object.assign(info, { message: JSON.stringify(info.message, null, isProduction ? 0 : 2) });
  }

  return info;
});

const logger = winston.createLogger({
  level: config.app.env === 'production' ? 'http' : 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    jsonifyObjectAndArray(),
    isProduction ? winston.format.uncolorize() : winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, meta, timestamp }) =>
        `${level}: ${message}${meta ? ` - \n${JSON.stringify({ ...meta })}` : ''} - ${timestamp}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
