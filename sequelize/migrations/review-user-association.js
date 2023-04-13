'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('reviews',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'review-user-association',
      references: {
        table: 'users',
        field: 'user_id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('reviews',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'review-user-association',
      references: {
        table: 'users',
        field: 'user_id'
      }
    });
  }
};