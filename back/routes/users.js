const express = require('express');
const router = express.Router();
const controller = require('../controllers/Users')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/all', roleMiddleware(['admin']), controller.getAllUsers);

router.get('/list', roleMiddleware(['admin']), controller.getUsersList);

router.get('/allRoles', roleMiddleware(['admin']), controller.getAllRoles);

router.post('/add', roleMiddleware(['admin']), controller.addUser);

router.post('/delete', roleMiddleware(['admin']), controller.deleteUser);

module.exports = router;