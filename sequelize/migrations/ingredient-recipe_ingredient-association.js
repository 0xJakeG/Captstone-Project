'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('recipe_ingredients',{
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'ingredient-recipe_ingredient-association',
      references: {
        table: 'ingredients',
        field: 'ingredient_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('recipe_ingredients',{
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'ingredient-recipe_ingredient-association',
      references: {
        table: 'ingredients',
        field: 'ingredient_id'
      }
    });
  }
};