const admin = require('firebase-admin');
const serviceAccount = require('../../speakportrait-60e57-firebase-adminsdk-fbsvc-dd0249b8af.json');
const { createOrUpdateUser } = require('../services/userServices');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const syncUserToDatabase = async (user) => {
    try {
        const userData = {
            ...user.toJSON(),
            id: user.uid,
            imageUrl: user.photoURL || null,
            phoneNumber: user.phoneNumber || null,
            providerId: user.providerData[0]?.providerId || null,
            createdAt: new Date(user.metadata.creationTime),
            lastLogin: new Date(user.metadata.lastSignInTime),
            updatedAt: new Date()
        };

        const newUser = await createOrUpdateUser(userData);
        console.log('User synced successfully:', newUser.id);
        return { success: true };

    } catch (error) {
        console.error('Error syncing user:', error);
        return { success: false, error: error.message };
    }
};

const verifyFirebaseToken = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return { success: true, user: decodedToken };
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return { success: false, error: error.message };
    }
};

const getFirebaseUser = async (uid) => {
    try {
        const user = await admin.auth().getUser(uid);
        return { success: true, user };
    } catch (error) {
        console.error('Error getting Firebase user:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    admin,
    syncUserToDatabase,
    verifyFirebaseToken,
    getFirebaseUser
};
