const express = require('express');
const router = express.Router();
const controller = require('../controllers/Auth')

router.post('/', controller.toAuth);
router.post('/check', controller.check);

module.exports = router;