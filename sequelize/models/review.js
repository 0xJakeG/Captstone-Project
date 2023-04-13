'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.user);
      models.user.hasMany(review);
      review.belongsTo(models.recipe);
      models.recipe.hasMany(review);
    }
  }
  review.init({
    review_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};