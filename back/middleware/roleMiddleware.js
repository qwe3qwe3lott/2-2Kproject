const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') next()
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) return res.status(403).json({ message: 'Пользователь не авторизован' })
            const data = jwt.verify(token, jwtSecret)
            console.log(data)
            if (!roles.includes(data.role)) return res.status(403).json({ message: 'Доступ запрещён' })
            req.userId = data.id
            req.userRole = data.role
            next()
        } catch (err) {
            console.log(err)
            return res.status(403).json({ message: 'Пользователь не авторизован' })
        }
    }
}
