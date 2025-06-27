const { pool } = require('../config/db');

const createJob = async ({ userId, imageUrl = null, audioUrl = null, videoUrl = null }) => {
    const query = 'INSERT INTO jobs (uid, image_url, audio_url, video_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, imageUrl, audioUrl, videoUrl];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
}

const getJobById = async (jobId) => {
    const query = 'SELECT * FROM jobs WHERE job_id = $1';
    const values = [jobId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching job:', error);
        throw error;
    }
}

const updateJob = async (jobId, updates) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [jobId, ...Object.values(updates)];

    const query = `UPDATE jobs SET ${fields} WHERE job_id = $1 RETURNING *`;

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
}

const deleteJob = async (jobId) => {
    const query = 'DELETE FROM jobs WHERE job_id = $1 RETURNING *';
    const values = [jobId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
}

module.exports = {
    createJob,
    getJobById,
    updateJob,
    deleteJob
};