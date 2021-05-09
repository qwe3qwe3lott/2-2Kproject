const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    })
}