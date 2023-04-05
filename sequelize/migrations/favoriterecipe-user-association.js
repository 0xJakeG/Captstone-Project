'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('favorite_recipes',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'favoriterecipe-user-association',
      references: {
        table: 'users',
        field: 'user_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('favorite_recipes',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'favoriterecipe-user-association',
      references: {
        table: 'users',
        field: 'user_id'
      }
    });
  }
};