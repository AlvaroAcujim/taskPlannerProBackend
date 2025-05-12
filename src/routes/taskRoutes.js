const express = require('express');
const router = express.Router();
const taskController =  require('../controllers/taskController');
const {verifyToken} = require('../middlewares/authMiddleware')

router.get('/', verifyToken(['user', 'admin']), taskController.getTask);
router.post('/', verifyToken(['user', 'admin']), taskController.createTasks);
router.delete('/:taskId', verifyToken(['user', 'admin']), taskController.removeTask);
router.put('/:taskId', verifyToken(['user', 'admin']), taskController.updateTasks);

module.exports = router;
