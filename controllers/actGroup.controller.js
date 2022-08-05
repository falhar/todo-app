const { actGroup } = require('../models');

exports.getAllG = async (req, res) => {
  const data = await actGroup.findAll();
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data,
  });
};

exports.getOneG = async (req, res) => {
  const data = await actGroup.findByPk(req.params.id);
  if (!data) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {},
    });
  }
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data,
  });
};

exports.createG = async (req, res) => {
  const { title, email } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    });
  }
  const new_act = await actGroup.create({ title, email });
  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data: new_act,
  });
};

exports.deleteG = async (req, res) => {
  const checkExist = await actGroup.findByPk(req.params.id);
  if (!checkExist) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
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

exports.updateG = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    });
  }
  const checkExist = await actGroup.findByPk(req.params.id);
  if (!checkExist) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {},
    });
  }
  const data = await checkExist.update({ title });
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data,
  });
};
