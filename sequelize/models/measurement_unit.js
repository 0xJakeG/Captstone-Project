'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measurement_unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      measurement_unit.belongsTo(models.recipe_ingredient);
      models.recipe_ingredient.hasMany(measurement_unit);
    }
  }
  measurement_unit.init({
    measurement_id: DataTypes.INTEGER,
    measurment_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'measurement_unit',
  });
  return measurement_unit;
};