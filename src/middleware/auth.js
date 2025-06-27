const { verifyFirebaseToken } = require('../config/firebase');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const result = await verifyFirebaseToken(token);

        if (!result.success) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        req.user = result.user; // Add user info to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

module.exports = { authenticateUser };
