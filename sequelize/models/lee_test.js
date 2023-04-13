'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lee_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lee_test.init({
    test_val: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lee_test',
  });
  return lee_test;
};