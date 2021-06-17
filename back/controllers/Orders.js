const order = require('../db').order
const orderStatus = require('../db').orderStatus

const addOrder = async function (req, res) {
    let data = req.body;
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
    else if (data.productIds == null || data.productIds.length === 0)
        res.status(422).json({ message: 'Не указаны id товаров' });
    else {
        order.create({
            description: data.description,
            phone: data.phone,
            customer: data.customer,
            statusId: await getStatusId('Untreated'),
            price: data.price,
            duration: data.duration
        })
            .then(result => {
                result.setProducts([...data.productIds])
                    .then(result => {
                        res.status(200).json({ message: 'Заказ добавлен' });
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

const getStatusId = status =>
    orderStatus.findOne({ where: { status } })
    .then(status => {
        return status.id
    })

module.exports = {
    addOrder
}