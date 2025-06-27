const pg = require('pg');
const config = require('./env');
const { createUserTable } = require('../models/User');
const { createJobTable } = require('../models/Job');

const pool = new pg.Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

const initDB = async () => {
    try {
        await connectDB();
        await createUserTable();
        await createJobTable();
    } catch (err) {
        console.error('Error during database initialization:', err);
    }
};

module.exports = {
    pool,
    connectDB,
    initDB,
};
