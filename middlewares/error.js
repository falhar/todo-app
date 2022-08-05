const config = require('../config');
const ApiError = require('../errors/api-error');
const logger = require('../tools/logger');

/**
 * @param {Error} err
 * @returns {ApiError}
 * */
const convertError = (err) => {
  if (err instanceof ApiError) {
    return err;
  }

  return new ApiError(500, 'Error', err.message, undefined, false);
};

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const error = convertError(err);
  if (!error.isOperational) {
    logger.error(err);
  }

  let { status, message } = error;
  if (config.app.env === 'production' && !error.isOperational) {
    status = 'Error';
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = message;
  if (error.errorPayloads) {
    logger.error(`Error Payloads ${JSON.stringify(error.errorPayloads)}`);
  }

  res.status(error.statusCode).json({
    status,
    message,
    errors: error.errorPayloads,
    ...(config.app.env !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
