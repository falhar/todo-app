const { param, body } = require('express-validator');
const { actGroup } = require('../../models');
const handleValidationError = require('../validator');

module.exports = {
  getOneOrDelVG: [param('id').notEmpty().withMessage('id required').isInt(), handleValidationError],
  createVG: [
    body('title').isString().optional(),
    body('email')
      .notEmpty()
      .withMessage('email required')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address'),
    handleValidationError,
  ],
  updateVG: [
    param('id').notEmpty().withMessage('id required').isInt(),
    body('title').isString().optional(),
    handleValidationError,
  ],
};
