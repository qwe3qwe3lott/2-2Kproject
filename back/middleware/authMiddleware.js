const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') next()

    try {
        let token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(403).json({ message: 'Пользователь не авторизован' })
        jwt.verify(token, jwtSecret)
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
}