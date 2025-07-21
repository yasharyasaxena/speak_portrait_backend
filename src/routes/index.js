const express = require('express');
const authRoutes = require('./auth');
const uploadRoutes = require('./upload');
const projectRoutes = require('./project');
const { authenticateUser } = require('../middleware/auth.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/upload', authenticateUser, uploadRoutes);
router.use('/projects', authenticateUser, projectRoutes);

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
