'use strict';

const menu_items = require('../models/menu_items');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_item_picture: {
        type: Sequelize.STRING
      },
      menu_item_name: {
        type: Sequelize.STRING
      },
      menu_item_description: {
        type: Sequelize.STRING
      },
      /*user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'user',
            schema: 'booksforcooks',
          },
          key: 'id'
        },
        allowNull: false
        },
        */
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    menu_items.belongsTo(booksforcooks.users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu_items');
  }
};