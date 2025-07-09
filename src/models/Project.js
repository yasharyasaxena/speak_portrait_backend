const ProjectSchema = `
CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    uid VARCHAR(128) NOT NULL,
    image_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);
`;

const createProjectTable = async (pool) => {
    try {
        await pool.query(ProjectSchema);
        console.log("Project table created successfully.");
    } catch (error) {
        console.error("Error creating project table:", error);
    }
};

module.exports = {
    createProjectTable,
};
