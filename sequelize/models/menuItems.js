const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const menu_items = sequelize.define("menu_items", {
        menu_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        menu_item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menu_item_description: {
            type: DataTypes.STRING,
        },
        menu_item_instructions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menu_item_review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        
    });
    return menu_items
};