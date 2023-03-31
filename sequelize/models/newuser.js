'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  newUser.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'newUser',
  });
  return newUser;
};