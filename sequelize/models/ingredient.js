'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingredient.belongsTo(models.recipe_ingredient);
      models.recipe_ingredient.hasMany(ingredient);    
    }
  }
  ingredient.init({
    ingredient_id: DataTypes.INTEGER,
    ingredient_name: DataTypes.STRING,
    ingredient_desc: DataTypes.STRING,
    ingredient_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ingredient',
  });
  return ingredient;
};