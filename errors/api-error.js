class ApiError extends Error {
  constructor(
    statusCode,
    status,
    message = 'Internal Server Error',
    errorPayloads = undefined,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.errorPayloads = errorPayloads;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
