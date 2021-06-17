const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('order_status', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })
}