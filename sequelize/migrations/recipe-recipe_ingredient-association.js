'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('recipe_ingredients',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'recipe-recipe_ingredient-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('recipe_ingredients',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'recipe-recipe_ingredient-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  }
};