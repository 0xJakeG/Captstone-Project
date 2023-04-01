'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('menu_items',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'menu_item_user-association',
      references: {
        table: 'users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('menu_items',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'menu_item_user-association',
      references: {
        table: 'users',
        field: 'id'
      }
    });
  }
};
