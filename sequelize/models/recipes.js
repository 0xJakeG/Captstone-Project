const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const recipes = sequelize.define("recipes", {
        recipes_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recipes_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_time_to_completion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_meal_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_reviews: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_nutrition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipes_directions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return recipes;
};