const order = require('../db').order
const orderStatus = require('../db').orderStatus
const product = require('../db').product

const getAllOrders = async function (req, res) {
    order.findAll( { attributes: ['id', 'phone', 'description', 'customer', 'duration', 'price', 'moment', 'email'],
        include: [{ model: orderStatus, attributes: ['id', 'status'], raw: true }, { model: product, through: { attributes: [] } }] } )
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

const getAllStatuses = async function (req, res) {
    orderStatus.findAll()
        .then(statuses => {
            res.status(200).json(statuses)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

//const changeStatus

const addOrder = async function (req, res) {
    const data = req.body;
    if (data.customer == null)
        res.status(422).json({ message: 'Не указано ФИО' });
    else if (data.phone == null)
        res.status(422).json({ message: 'Не указан номер телефона' });
    else if (data.description == null)
        res.status(422).json({ message: 'Не указано описание' });
    else if (data.price == null)
        res.status(422).json({ message: 'Не указана итоговая цена' });
    else if (data.duration == null)
        res.status(422).json({ message: 'Не указана итоговая продолжительность' });
    else if (data.moment == null)
        res.status(422).json({ message: 'Не указан момент приёма' });
    else if (data.email == null)
        res.status(422).json({ message: 'Не указана электронная почта' });
    else if (new Date(data.moment).getTime() < new Date().getTime())
        res.status(422).json({ message: 'Время указано в прошлом' });
    else if (data.productIds == null || data.productIds.length === 0)
        res.status(422).json({ message: 'Не указаны id товаров' });
    else {
        order.create({
            description: data.description,
            phone: data.phone,
            moment: data.moment+"+0000",
            customer: data.customer,
            statusId: await getStatusId('Untreated'),
            price: data.price,
            duration: data.duration,
            email: data.email
        })
            .then(result => {
                result.setProducts([...data.productIds])
                    .then(subResult => {
                        res.status(200).json({ message: 'Заказ добавлен', number: result.id });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Неизвестная ошибка' });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const updateOrderStatus = async function (req, res) {
    let data = req.body;
    if (data.orderId == null)
        res.status(422).json({ message: 'Не указан id заказа' });
    else if (data.statusId == null)
        res.status(422).json({ message: 'Не указан id статуса' });
    else {
        let result = await order.findOne({ where: { id: data.orderId } })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
        result.update({
            statusId: data.statusId
        })
            .then(result => {
                res.status(200).json({ message: 'Статус обновлён' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const getStatusId = status =>
    orderStatus.findOne({ where: { status } })
    .then(status => {
        return status.id
    })

const getDashboardData = async function (req, res) {
    orderStatus.findAll()
        .then(async orderStatuses => {
            let data = []
            for (const orderStatus of orderStatuses) {
                let statusCount = await order.count({ where: { statusId: orderStatus.id }})
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({ message: 'Неизвестная ошибка' });
                    })
                data.unshift( { name: interpretOrderStatus(orderStatus.status) + " - " + statusCount, pv: statusCount } )
            }
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Неизвестная ошибка' });
        })
}

const interpretOrderStatus = status => {
    switch (status) {
        case 'Untreated':
            return 'На рассм.'
        case 'Planned':
            return 'Заплан.'
        case 'Denied':
            return 'Отказано'
        case 'Done':
            return 'Выполнено'
        default:
            return status
    }
}

module.exports = {
    addOrder,
    getAllOrders,
    getAllStatuses,
    getDashboardData,
    updateOrderStatus
}
