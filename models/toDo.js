const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.activity, { foreignKey: 'activity_group_id' });
    }
  }
  Todo.init(
    {
      activity_group_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      priority: { type: DataTypes.ENUM('very-high', 'high', 'normal', 'low', 'very-low'), defaultValue: 'very-high' },
    },
    {
      sequelize,
      modelName: 'todo',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );
  return Todo;
};
