'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('favorite_recipes',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'favoriterecipe-recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('favorite_recipes',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'favoriterecipe-recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  }
};