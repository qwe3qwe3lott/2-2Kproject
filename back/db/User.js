const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        hash: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    })
}