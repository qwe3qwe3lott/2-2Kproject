var express = require('express');
var router = express.Router();
const controller = require('../controllers/Users')

router.get('/all', controller.getAllUsers);

router.post('/add', controller.addUser);

module.exports = router;
