const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const user = sequelize.define("user", {
    
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
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

        test: {
            type: DataTypes.STRING,
            allowNull: false,
            valiidate: {
                notEmpty: true
            }
        }
});

    return user;
};