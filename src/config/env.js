require('dotenv').config({ path: '.env.local' });


const config = {
    port: process.env.PORT || 3000,
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
};

module.exports = config;