const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
const { user, role, order } = require('../db')
const transport = require('../email/transport')
const generateRandomString = require('../util/generateRandomString')
const errorJSON = require('../util/errorJSON')

const emailCodes = []

// Соответствия между ролями пользователей и начальными страницами их личных кабинетов
const personalPagesForRoles = {
    admin: 'dashboard',
    moder: 'orders',
    customer: 'customerHistory'
}

const generateAccessToken = (id, role) => {
    const payload = { id, role }
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
}

const toAuth = async function (req, res) {
    const data = req.body;
    if (data.login == null)
        res.status(422).json({ message: 'Не указан логин' });
    else if (!await existLogin(data.login.toString()).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Логин не существует' });
    else if (data.hash == null)
        res.status(422).json({ message: 'Не указан хэш' });
    else {
        user.findOne({ where: { login: data.login }})
            .then(user => {
                if (user.hash === crypto.SHA256(data.hash + user.salt).toString(crypto.enc.Hex)) {
                    role.findOne({ attributes: ['role'], where : { id: user.roleId }})
                        .then(result => {
                            res.status(200).json({
                                token: generateAccessToken(user.id, result.role),
                                routeName: personalPagesForRoles[result.role]
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({ message: 'Неизвестная ошибка' })
                        })
                }
                else res.status(422).json({ message: 'Пароль не верен' })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Неизвестная ошибка' })
            })
    }
}

// Количество милисекунд за которые клиент может ввести код из письма
const CODE_ACTIVE_TIME = 1000 * 60 * 5
// Метод отправки письма с кодом подтверждения на электронную почту клиента
const sendEmail = async function (req, res) {
    // Валидация на входные поля
    const email = req.query.email
    if (!email)
        return res.status(422).json(errorJSON('Не указана электронная почта'))
    // Проверяем, был ли заказ с указанием пришедшей в запросе электронной почтой
    try {
        const result = await order.findOne({ where: { email }})
        if (!result) return res.status(422).json(errorJSON('По данной электронной почте не было найдено записей'))
    } catch (err) {
        console.log(err)
        return res.status(500).json(errorJSON())
    }
    // Если прошлый код всё ещё действителен, он удаляется
    const index = emailCodes.findIndex(el => el.email === email)
    if (index !== -1)
        emailCodes.splice(index, 1)
    // Создаётся новый код
    const code = generateRandomString(6)
    emailCodes.push({ email, code })
    // Код действует удаляется через CODE_ACTIVE_TIME милисекунд
    setTimeout(() => {
        const index = emailCodes.findIndex(el => el.email === email)
        if (index !== -1) emailCodes.splice(index, 1)
    }, CODE_ACTIVE_TIME)
    // Заполняется письмо
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Код подтверждения',
        text: 'Ваш код: ' + code
    }
    try {
        const result = await transport.sendMail(mailOptions)
        console.log(result)
        res.status(200).json(errorJSON('Код подтверждения выслан на почту'))

    } catch (err) {
        console.log(err)
        res.status(500).json(errorJSON())
    }
}

const confirmCustomerCode = async function (req, res) {
    const email = req.body.email
    const code = req.body.code
    console.log(emailCodes)
    console.log(email)
    console.log(code)
    if (!emailCodes.some(el => el.email === email && el.code === code)) {
        return res.status(422).json(errorJSON('Код не действителен'))
    }
    const index = emailCodes.findIndex(el => el.email === email)
    if (index !== -1) emailCodes.splice(index, 1)
    res.status(200).json({
        token: generateAccessToken(email, 'customer'),
        routeName: personalPagesForRoles['customer']
    })
}

const checkRole = async function (req, res) {
    res.status(200).json({ name: personalPagesForRoles[req.userRole]})
}

const existLogin = login =>
    user.count({ where: { login } })
        .then(count => count === 1)

module.exports = {
    toAuth,
    sendEmail,
    confirmCustomerCode,
    checkRole
}
