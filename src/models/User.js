const UserSchema = `
CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(128) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    display_name VARCHAR(100),
    photo_url TEXT,
    phone_number VARCHAR(20),
    provider_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const createUserTable = async (pool) => {
    try {
        await pool.query(UserSchema);
        console.log("User table created successfully.");
    } catch (error) {
        console.error("Error creating user table:", error);
    }
};

module.exports = {
    createUserTable
};
