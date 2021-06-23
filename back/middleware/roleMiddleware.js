const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
const role = require('../db').role;

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') next()

        try {
            let token = req.headers.authorization.split(' ')[1]
            if (!token) return res.status(403).json({ message: 'Пользователь не авторизован' })
            let data = jwt.verify(token, jwtSecret)
            console.log(data)
            console.log(roles)
            console.log(role)
            if (!roles.includes(data.role)) return res.status(403).json({ message: 'Доступ запрещён' })
            req.userId = data.id
            next()
        } catch (err) {
            console.log(err)
            return res.status(403).json({ message: 'Пользователь не авторизован' })
        }
    }
}