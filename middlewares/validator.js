const ApiError = require('../errors/api-error');
const myValidationResult = require('../services/myValidationResult');

function handleValidationError(req, res, next) {
  const errors = myValidationResult(req);
  console.log('ini', errors.mapped({}));
  if (!errors.isEmpty()) {
    next(new ApiError(422, 'Unprocessible Entity', 'Validation Error', errors.mapped({})));
  } else {
    next();
  }
}

module.exports = handleValidationError;
