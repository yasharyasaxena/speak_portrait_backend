const { pool } = require('../config/db');

const createProject = async ({ userId, imageUrl = null, audioUrl = null, videoUrl = null }) => {
    const query = 'INSERT INTO projects (uid, image_url, audio_url, video_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, imageUrl, audioUrl, videoUrl];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

const getProjectById = async (projectId) => {
    const query = 'SELECT * FROM projects WHERE project_id = $1';
    const values = [projectId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

const updateProject = async (projectId, updates) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [projectId, ...Object.values(updates)];

    const query = `UPDATE projects SET ${fields} WHERE project_id = $1 RETURNING *`;

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

const deleteProject = async (projectId) => {
    const query = 'DELETE FROM projects WHERE project_id = $1 RETURNING *';
    const values = [projectId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

module.exports = {
    createProject,
    getProjectById,
    updateProject,
    deleteProject
};