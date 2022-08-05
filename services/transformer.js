/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
exports.transformer = (data) => {
  data.is_active ? (data.is_active = '1') : (data.is_active = '0');
  return data;
};
