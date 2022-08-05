const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ActGroup.hasMany(models.toDo, { foreignKey: 'activity_group_id', onDelete: 'CASCADE' });
    }
  }
  ActGroup.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'actGroup',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );
  return ActGroup;
};
