const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const recipes = sequelize.define("recipes", {
        recipe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recipe_picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_to_complete: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return recipes;
};