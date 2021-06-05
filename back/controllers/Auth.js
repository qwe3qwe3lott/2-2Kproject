const crypto = require("crypto-js");
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
const user = require('../db').user;
const role = require('../db').role;

const generateAccessToken = (id, role) => {
    const payload = { id, role }
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
}

function getRouteName(role) {
    switch (role) {
        case 'admin':
            return 'admin'
        case 'moder':
            return 'orders'
        default:
            return role
    }
}

const toAuth = async function (req, res) {
    let data = req.body;
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
                                route: getRouteName(result.role)
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


const existLogin = login =>
    user.count({ where: { login } })
        .then(count => {
            return count === 1;
        })

module.exports = {
    toAuth
}