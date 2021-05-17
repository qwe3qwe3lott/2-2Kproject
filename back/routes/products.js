const express = require('express');
const router = express.Router();
const controller = require('../controllers/Products')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/all', controller.getAllProducts)

module.exports = router;