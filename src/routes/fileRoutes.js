const express = require('express');
const multer = require('multer');
const fileController  = require('../controllers/fileController');

const router = express.Router();
const upload = multer(); // usa memoria, ya que escribimos con fs

router.post('/upload/:model/:id', upload.single('file'), fileController.uploadAndReplaceImage);
router.get('/image/:model/:filename', fileController.serveImage);
module.exports = router;