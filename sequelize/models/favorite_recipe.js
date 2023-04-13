'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite_recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite_recipe.belongsTo(models.user);
      models.user.hasMany(favorite_recipe);
    }
  }
  favorite_recipe.init({
    favorite_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorite_recipe',
  });
  return favorite_recipe;
};