const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'kozlov',
    'postgres',
    'qwe3qwe3',
    {
        dialect: "postgres",
        host: 'localhost'
    });

const User = require('./User')(sequelize)

module.exports = {
    sequelize,
    user: User
}