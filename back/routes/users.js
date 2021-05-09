const express = require('express');
const router = express.Router();
const controller = require('../controllers/Users')

router.get('/all', controller.getAllUsers);

router.get('/list', controller.getUsersList);

router.post('/add', controller.addUser);

router.delete('/delete', controller.deleteUser);

module.exports = router;