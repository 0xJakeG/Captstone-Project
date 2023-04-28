'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instruction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      instruction.belongsTo(models.recipe);
      models.recipe.hasMany(instruction);
    }
  }
  instruction.init({
    instruction_id: DataTypes.INTEGER,
    order_number: DataTypes.INTEGER,
    instruction_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'instruction',
  });
  return instruction;
};