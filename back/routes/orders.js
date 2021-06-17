const express = require('express');
const router = express.Router();
const controller = require('../controllers/Orders')

router.post('/add', controller.addOrder)

module.exports = router;