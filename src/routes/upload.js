const express = require('express');
const upload = require('../services/multerService');
const { uploadHandler } = require('../controllers/uploadController');
const router = express.Router();

router.post('/upload', upload, uploadHandler);

module.exports = router;
