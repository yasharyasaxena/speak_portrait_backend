const express = require('express');
const { syncUser, getUserProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/sync', syncUser);

router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;
