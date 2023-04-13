'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('ingredient_tags',{
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'ingredientTags-ingredient-association',
      references: {
        table: 'ingredients',
        field: 'ingredient_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('ingredient_tags',{
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'ingredientTags-ingredient-association',
      references: {
        table: 'ingredients',
        field: 'ingredient_id'
      }
    });
  }
};