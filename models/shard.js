'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shard.init({
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    ancients: DataTypes.INTEGER,
    voids: DataTypes.INTEGER,
    sacreds: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shard',
  });
  return Shard;
};