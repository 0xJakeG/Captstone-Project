'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('recipe_ingredients',{
      fields: ['measurement_id'],
      type: 'foreign key',
      name: 'measurement_unit-recipe_ingredient-association',
      references: {
        table: 'measurement_units',
        field: 'measurement_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('recipe_ingredients',{
      fields: ['measurement_id'],
      type: 'foreign key',
      name: 'measurement_unit-recipe_ingredient-association',
      references: {
        table: 'measurement_units',
        field: 'measurement_id'
      }
    });
  }
};