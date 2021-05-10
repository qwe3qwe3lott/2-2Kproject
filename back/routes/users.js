const express = require('express');
const router = express.Router();
const controller = require('../controllers/Users')

router.get('/all', controller.getAllUsers);

router.get('/list', controller.getUsersList);

router.get('/allRoles', controller.getAllRoles);

router.post('/add', controller.addUser);

router.post('/delete', controller.deleteUser);

module.exports = router;