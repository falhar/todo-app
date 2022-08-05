module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('actGroups', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      title: { type: Sequelize.STRING, allowNull: false },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('actGroups');
  },
};
