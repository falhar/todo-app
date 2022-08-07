const { param, body, query } = require('express-validator');
const handleValidationError = require('../validator');

module.exports = {
  getAllVT: [query('activity_group_id').notEmpty().withMessage('activity_group_id required').isInt(), handleValidationError],
  getOneOrDelVT: [param('id').notEmpty().withMessage('id required').isInt(), handleValidationError],
  createVT: [
    body('activity_group_id').isInt().optional(),
    body('title').isString().optional(),
    body('is_active').isBoolean().optional(),
    body('priority').toLowerCase().isIn(['very-high', 'high', 'normal', 'low', 'very-low']).optional(),
    handleValidationError,
  ],
  updateVT: [
    param('id').notEmpty().withMessage('id required').isInt(),
    body('title').isString().optional(),
    body('is_active').isBoolean().optional(),
    body('priority').toLowerCase().isIn(['very-high', 'high', 'normal', 'low', 'very-low']).optional(),
    handleValidationError,
  ],
};
