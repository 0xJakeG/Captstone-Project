const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const user = sequelize.define("user", {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            valiidate: {
                notEmpty: true
            },
        },
    
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            valiidate: {
                notEmpty: true
            }
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            valiidate: {
                notEmpty: true
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            valiidate: {
                notEmpty: true
            }
        }
});

    return user;
};