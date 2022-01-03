const express = require('express')
const router = express.Router()
const controller = require('../controllers/Orders')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/all', roleMiddleware(['admin', 'moder']), controller.getAllOrders)
router.get('/allStatuses', roleMiddleware(['admin', 'moder']), controller.getAllStatuses)
router.post('/add', controller.addOrder)
router.get('/getDashboardData', roleMiddleware(['admin']), controller.getDashboardData)
router.post('/updateStatus', roleMiddleware(['admin', 'moder']), controller.updateOrderStatus)

module.exports = router
