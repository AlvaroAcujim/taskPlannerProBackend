const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyToken} = require('../middlewares/authMiddleware')

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

router.get('/auth', verifyToken())
router.post('/', userController.createUser);
router.get('/', userController.getAllAdminUsers);
router.get('/:id', userController.getUserById);


module.exports = router;