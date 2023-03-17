const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const recipe = sequelize.define("recipe", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        postedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mealType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeToCompletion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return recipe;
};