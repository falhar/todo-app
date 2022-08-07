const { toDo, actGroup } = require('../models');
const { transformer } = require('../services/transformer');

exports.getAllT = async (req, res) => {
  const option = {};
  const { activity_group_id } = req.query;
  if (activity_group_id) {
    option.activity_group_id = activity_group_id;
  }
  const data = await toDo.findAll({ where: option });
  data.forEach((dt) => transformer(dt));
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data,
  });
};

exports.getOneT = async (req, res) => {
  const data = await toDo.findByPk(req.params.id);
  if (!data) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${req.params.id} Not Found`,
      data: {},
    });
  }
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: transformer(data),
  });
};

exports.createT = async (req, res) => {
  const { activity_group_id, title, is_active, priority } = req.body;
  if (!activity_group_id) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
    });
  }
  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
    });
  }
  const checkExist = await actGroup.findByPk(activity_group_id);
  if (!checkExist) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${activity_group_id} Not Found`,
      data: {},
    });
  }
  const data = await toDo.create({ activity_group_id, title, is_active, priority });
  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data,
  });
};

exports.updateT = async (req, res) => {
  const { title, is_active, priority } = req.body;
  const checkExist = await toDo.findByPk(req.params.id);
  if (!checkExist) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${req.params.id} Not Found`,
      data: {},
    });
  }
  const data = await checkExist.update({ title, is_active, priority });
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: transformer(data),
  });
};

exports.deleteT = async (req, res) => {
  const checkExist = await toDo.findByPk(req.params.id);
  if (!checkExist) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${req.params.id} Not Found`,
      data: {},
    });
  }
  await checkExist.destroy({ force: true });
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {},
  });
};
