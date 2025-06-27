const express = require('express');
const authRoutes = require('./auth');
const uploadRoutes = require('./upload');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
