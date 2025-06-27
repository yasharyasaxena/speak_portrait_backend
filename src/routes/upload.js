const express = require('express');
const upload = require('../services/uploadService');
const { uploadImage, uploadAudio } = require('../controllers/uploadController');
const router = express.Router();

router.post('/image', upload.single('image'), uploadImage);
router.post('/audio', upload.single('audio'), uploadAudio);

module.exports = router;
