const admin = require('firebase-admin');
const serviceAccount = require('../../speakportrait-60e57-firebase-adminsdk-fbsvc-dd0249b8af.json');
const { pool } = require('./db');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const syncUserToDatabase = async (user) => {
    try {
        const userData = {
            uid: user.uid,
            email: user.email,
            display_name: user.displayName || null,
            photo_url: user.photoURL || null,
            email_verified: user.emailVerified,
            phone_number: user.phoneNumber || null,
            provider_id: user.providerData[0]?.providerId || null,
            disabled: user.disabled || false,
            created_at: new Date(user.metadata.creationTime),
            last_sign_in: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : null,
        };

        const query = `
            INSERT INTO users (
                uid, email, display_name, photo_url, email_verified,
                phone_number, provider_id, disabled, created_at, last_sign_in
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (uid) DO UPDATE SET
                email = EXCLUDED.email,
                display_name = EXCLUDED.display_name,
                photo_url = EXCLUDED.photo_url,
                email_verified = EXCLUDED.email_verified,
                phone_number = EXCLUDED.phone_number,
                provider_id = EXCLUDED.provider_id,
                disabled = EXCLUDED.disabled,
                last_sign_in = EXCLUDED.last_sign_in,
                updated_at = CURRENT_TIMESTAMP
        `;

        await pool.query(query, [
            userData.uid,
            userData.email,
            userData.display_name,
            userData.photo_url,
            userData.email_verified,
            userData.phone_number,
            userData.provider_id,
            userData.disabled,
            userData.created_at,
            userData.last_sign_in,
        ]);

        console.log('User synced successfully:', user.uid);
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
