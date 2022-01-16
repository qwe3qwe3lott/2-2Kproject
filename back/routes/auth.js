const express = require('express')
const router = express.Router()
const controller = require('../controllers/Auth')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', controller.toAuth)
router.get('/sendEmail', controller.sendEmail)
router.post('/confirmCustomerCode', controller.confirmCustomerCode)
router.get('/checkRole', roleMiddleware(['admin', 'moder', 'customer']), controller.checkRole)

module.exports = router
