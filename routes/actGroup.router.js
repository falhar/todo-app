const router = require('express').Router();
const { createVG, getOneOrDelVG, updateVG } = require('../middlewares/validators/actGroup.validator');
const { createG, deleteG, getAllG, getOneG, updateG } = require('../controllers/actGroup.controller');
const catchAsync = require('./catch-async');

router.post('/', createVG, catchAsync(createG));
router.get('/', catchAsync(getAllG));
router.get('/:id', getOneOrDelVG, catchAsync(getOneG));
router.patch('/:id', updateVG, catchAsync(updateG));
router.delete('/:id', getOneOrDelVG, catchAsync(deleteG));

module.exports = router;
