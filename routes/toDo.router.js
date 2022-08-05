const router = require('express').Router();
const { createVT, getOneOrDelVT, updateVT } = require('../middlewares/validators/toDo.validator');
const { createT, deleteT, getAllT, getOneT, updateT } = require('../controllers/toDo.controller');

router.post('/', createVT, createT);
router.get('/', getAllT);
router.get('/:id', getOneOrDelVT, getOneT);
router.patch('/:id', updateVT, updateT);
router.delete('/:id', getOneOrDelVT, deleteT);

module.exports = router;
