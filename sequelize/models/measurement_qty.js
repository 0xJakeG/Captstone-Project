'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measurement_qty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      measurement_qty.belongsTo(models.recipe_ingredient);
      models.recipe_ingredient.hasMany(measurement_qty);    
    }
  }
  measurement_qty.init({
    measurement_qty_id: DataTypes.INTEGER,
    qty_amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'measurement_qty',
  });
  return measurement_qty;
};