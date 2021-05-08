const Sequelize = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define('product_type', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })
}