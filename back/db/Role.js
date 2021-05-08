const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })
}