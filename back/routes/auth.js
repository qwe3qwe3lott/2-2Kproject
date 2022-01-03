const express = require('express')
const router = express.Router()
const controller = require('../controllers/Auth')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', controller.toAuth)
router.get('/checkAdmin', roleMiddleware(['admin']), ((req, res) => res.status(200).json({ name: 'orders'})))
router.get('/checkModer', roleMiddleware(['moder','admin']), ((req, res) => res.status(200).json({ name: 'dashboard'})))

module.exports = router
