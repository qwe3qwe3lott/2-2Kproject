const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        img: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        }
    })
}