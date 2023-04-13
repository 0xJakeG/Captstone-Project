'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('instructions',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'instruction_recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('instructions',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'instruction_recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  }
};