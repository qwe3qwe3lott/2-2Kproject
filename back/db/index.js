const Sequelize = require("sequelize");

//Из-за проблем между pm2 и dotenv пришлось захардкодить .env конфиг
/*const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_LOGIN,
    process.env.DATABASE_PASSWORD,
    {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST
    });*/
const isDev = process.env.NODE_ENV === 'development'

const sequelize = new Sequelize(
    isDev ? 'kozlov' : 'std_1497_kozlov',
    isDev ? 'postgres' : 'std_1497_kozlov',
    'qwe3qwe3',
    {
        dialect: isDev ? 'postgresql' : 'mysql',
        host: isDev ? 'localhost' : 'std-mysql'
    });

const User = require('./User')(sequelize)
const Role = require('./Role')(sequelize)
const Product_type = require('./Product_type')(sequelize)
const Product = require('./Product')(sequelize)
const Order = require('./Order')(sequelize)
const Order_status = require('./Order_status')(sequelize)

User.belongsTo(Role, { foreignKey: 'roleId' })
Role.hasMany(User, { foreignKey: 'roleId' })
Product.belongsTo(Product_type, { foreignKey: 'typeId' })
Product_type.hasMany(Product, { foreignKey: 'typeId' })
Product.belongsToMany(Order, { through: 'order_products' })
Order.belongsToMany(Product, { through: 'order_products' })
Order.belongsTo(Order_status, { foreignKey: 'statusId' })
Order_status.hasMany(Order, { foreignKey: 'statusId' })

module.exports = {
    sequelize,
    user: User,
    role: Role,
    productType: Product_type,
    product: Product,
    order: Order,
    orderStatus: Order_status
}
