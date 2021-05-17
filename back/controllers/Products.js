const product = require('../db').product
const productType = require('../db').productType
const getAllProducts = async function (req, res) {
    product.findAll( { attributes: ['id', 'title', 'description', 'img', 'duration', 'price'], include: { model: productType, attributes: ['type'] }, raw: true } )
        .then(products => {
            products = JSON.parse(JSON.stringify(products).split('"product_type.type":').join('"type":'));
            res.status(200).json(products)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}


module.exports = {
    getAllProducts
}