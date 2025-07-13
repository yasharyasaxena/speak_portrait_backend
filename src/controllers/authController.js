const { getUserById } = require('../services/userServices');
const { syncUserToDatabase, getFirebaseUser } = require('../config/firebase');

const syncUser = async (req, res) => {
    try {
        const { uid } = req.body;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: 'User UID is required'
            });
        }

        const userResult = await getFirebaseUser(uid);

        if (!userResult.success) {
            return res.status(404).json({
                success: false,
                message: 'User not found in Firebase'
            });
        }

        const syncResult = await syncUserToDatabase(userResult.user);

        if (!syncResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to sync user to database'
            });
        }

        res.json({
            success: true,
            message: 'User synced successfully'
        });

    } catch (error) {
        console.error('Sync user error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { uid } = req.user;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: 'User UID is required'
            });
        }
        const user = await getUserById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                uid,
                email: user.email,
                name: user.displayName,
                picture: user.photoURL
            }
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user profile'
        });
    }
};

module.exports = {
    syncUser,
    getUserProfile
};
