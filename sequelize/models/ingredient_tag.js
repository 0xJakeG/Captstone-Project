'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingredient_tag.belongsTo(models.ingredient);
      models.ingredient.hasMany(ingredient_tag);
    }
  }
  ingredient_tag.init({
    tag_id: DataTypes.INTEGER,
    type_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ingredient_tag',
  });
  return ingredient_tag;
};