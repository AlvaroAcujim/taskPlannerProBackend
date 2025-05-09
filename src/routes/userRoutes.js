const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('login/:identifier', userController.getUserByUsernameOrEmail);

router.post('/', userController.createUser);
router.get('/admins', userController.getAllAdminUsers);
router.get('/:id', userController.getUserById);


module.exports = router;