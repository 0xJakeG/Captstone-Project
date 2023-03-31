'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      menu_items.associate = models => {
        menu_items.belongsTo(models.users, {
            as: 'menu_items',
            foreignKey: 'user_id'
        });
      };
    }
  }
  menu_items.init({
    menu_item_picture: DataTypes.STRING,
    menu_item_name: DataTypes.STRING,
    menu_item_description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menu_items',
  });
  return menu_items;
};