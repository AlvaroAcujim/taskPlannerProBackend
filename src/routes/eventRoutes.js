const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/', eventController.getAllEvents);
router.post('/', verifyToken(['admin']), eventController.createEvent);
router.delete('/:eventId', verifyToken(['admin']),eventController.removeEvent);
router.put('/:eventId', verifyToken(['admin']), eventController.updateEvent);
module.exports = router;