'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('reviews',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'review-recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  },

async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('reviews',{
      fields: ['recipe_id'],
      type: 'foreign key',
      name: 'review-recipe-association',
      references: {
        table: 'recipes',
        field: 'recipe_id'
      }
    });
  }
};