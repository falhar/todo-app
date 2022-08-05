module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('toDos', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      activity_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'actGroups', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: { type: Sequelize.STRING, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      priority: {
        type: Sequelize.ENUM('very-high', 'high', 'normal', 'low', 'very-low'),
        allowNull: false,
        defaultValue: 'very-high',
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('toDos');
  },
};
