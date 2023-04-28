'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('recipe_ingredients',{
      fields: ['measurement_qty_id'],
      type: 'foreign key',
      name: 'measurement_qty-recipe_ingredient-association',
      references: {
        table: 'measurement_qties',
        field: 'measurement_qty_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('recipe_ingredients',{
      fields: ['measurement_qty_id'],
      type: 'foreign key',
      name: 'measurement_qty-recipe_ingredient-association',
      references: {
        table: 'measurement_qties',
        field: 'measurement_qty_id'
      }
    });
  }
};