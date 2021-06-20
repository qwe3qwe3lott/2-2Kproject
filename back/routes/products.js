const express = require('express');
const router = express.Router();
const controller = require('../controllers/Products')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/all', controller.getAllProducts)

router.get('/allTypes', roleMiddleware(['admin', 'moder']), controller.getAllTypes)

router.post('/add', roleMiddleware(['admin', 'moder']), controller.addProduct)

router.post('/delete', roleMiddleware(['admin', 'moder']), controller.deleteProduct)

router.post('/update', roleMiddleware(['admin', 'moder']), controller.updateProduct)

router.get('/getDashboardData', roleMiddleware(['admin']), controller.getDashboardData)
//router.get('/getDashboardData', controller.getDashboardData)

module.exports = router;