'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      recipe_ingredient.belongsTo(models.recipe);
      models.recipe.hasMany(recipe_ingredient);    
    }
  }
  recipe_ingredient.init({
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ingredient_id: DataTypes.INTEGER,
    measurement_qty_id: DataTypes.INTEGER,
    measurement_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe_ingredient',
  });
  return recipe_ingredient;
};