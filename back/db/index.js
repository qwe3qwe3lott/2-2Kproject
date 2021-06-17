const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'kozlov',
    'postgres',
    'qwe3qwe3',
    {
        dialect: 'postgres',
        host: 'localhost'
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