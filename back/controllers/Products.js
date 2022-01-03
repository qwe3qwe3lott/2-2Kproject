const product = require('../db').product
const productType = require('../db').productType
const { Op } = require("sequelize");
const getAllProducts = async function (req, res) {
    product.findAll( { attributes: ['id', 'title', 'description', 'img', 'duration', 'price'], include: { model: productType, attributes: ['type'] }, raw: true, order: [ [productType, 'id', 'DESC'] ] } )
        .then(products => {
            products = JSON.parse(JSON.stringify(products).split('"product_type.type":').join('"type":'));
            res.status(200).json(products)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

const getAllTypes = async function (req, res) {
    productType.findAll()
        .then(roles => {
            res.status(200).json(roles)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

const addProduct = async function (req, res) {
    let data = req.body;
    if (data.title == null)
        res.status(422).json({ message: 'Не указано название' });
    else if (await existTitle(data.title.toString()).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Название уже занято' });
    else if (data.description == null)
        res.status(422).json({ message: 'Не указано описание' });
    else if (data.img == null)
        res.status(422).json({ message: 'Не указана ссылка на изображение' });
    else if (data.type == null)
        res.status(422).json({ message: 'Не указан тип' });
    else if (!await existType(data.type).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Не существует указаного типа' });
    else if (data.price == null)
        res.status(422).json({ message: 'Не указана цена' });
    else if (data.duration == null)
        res.status(422).json({ message: 'Не указана продолжительность' });
    else {
        product.create({
            title: data.title,
            description: data.description,
            img: data.img,
            typeId: await getTypeId(data.type),
            price: data.price,
            duration: data.duration
        })
            .then(result => {
                res.status(200).json({ message: 'Позиция добавлена', id: result.id });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const updateProduct = async function (req, res) {
    let data = req.body;
    if (data.id == null)
        res.status(422).json({ message: 'Не указан id' });
    else if (!await existProduct(data.id).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Не существует позиции с таким id' });
    else if (data.title == null)
        res.status(422).json({ message: 'Не указано название' });
    else if (await existTitleWithException(data.title.toString(), data.id).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Название уже занято' });
    else if (data.description == null)
        res.status(422).json({ message: 'Не указано описание' });
    else if (data.img == null)
        res.status(422).json({ message: 'Не указана ссылка на изображение' });
    else if (data.type == null)
        res.status(422).json({ message: 'Не указан тип' });
    else if (!await existType(data.type).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Не существует указаного типа' });
    else if (data.price == null)
        res.status(422).json({ message: 'Не указана цена' });
    else if (data.duration == null)
        res.status(422).json({ message: 'Не указана продолжительность' });
    else {
         let result = await product.findOne({ where: { id: data.id } })
             .catch(err => {
                 console.log(err);
                 res.status(500).json({ message: 'Неизвестная ошибка' });
             })
         result.update({
             title: data.title,
             description: data.description,
             img: data.img,
             typeId: await getTypeId(data.type),
             price: data.price,
             duration: data.duration
         })
             .then(result => {
                 res.status(200).json({ message: 'Позиция обновлена' });
             })
             .catch(err => {
                 console.log(err);
                 res.status(500).json({ message: 'Неизвестная ошибка' });
             })
    }
}

const deleteProduct = async function (req, res) {
    let data = req.body;
    if (data.id == null)
        res.status(422).json({ message: 'Не указан id' });
    else {
        product.destroy({ where: { id: data.id } })
            .then(result => {
                res.status(200).json({ message: 'Позиция удалена' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const existProduct = id =>
    product.count({ where: { id } })
        .then(count => {
            return count === 1;
        })

const existTitle = title =>
    product.count({ where: { title } })
        .then(count => {
            return count === 1;
        })

const existTitleWithException = (title, exceptionId) =>
    product.count({ where: { [Op.and]: [ { title }, { id: { [Op.not]: exceptionId } } ] } })
        .then(count => {
            return count === 1;
        })

const existType = type =>
    productType.count({ where: { type } })
        .then(count => {
            return count === 1;
        })

const getTypeId = type =>
    productType.findOne({ where: { type } })
        .then(type => {
            return type.id
        })

const getDashboardData = async function (req, res) {
    productType.findAll()
        .then(async productTypes => {
            let data = []
            for (const productType of productTypes) {
                let typeCount = await product.count({ where: { typeId: productType.id }})
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({ message: 'Неизвестная ошибка' });
                    })
                data.unshift( { name: interpretProductType(productType.type) + " - " + typeCount, pv: typeCount } )
            }
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Неизвестная ошибка' });
        })
}

const interpretProductType = type => {
    switch (type) {
        case 'hair':
            return 'Парикм. зал'
        case 'cure':
            return 'Ман., пед.'
        case 'massage':
            return 'Массаж'
        case 'cosmetology':
            return 'Космет.'
        default:
            return type
    }
}

module.exports = {
    getAllProducts,
    getAllTypes,
    addProduct,
    updateProduct,
    deleteProduct,
    getDashboardData
}
