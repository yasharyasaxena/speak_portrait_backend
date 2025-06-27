const JobSchema = `
CREATE TABLE IF NOT EXISTS jobs (
    job_id SERIAL PRIMARY KEY,
    uid VARCHAR(128) NOT NULL,
    image_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);
`;

const createJobTable = async (pool) => {
    try {
        await pool.query(JobSchema);
        console.log("Job table created successfully.");
    } catch (error) {
        console.error("Error creating job table:", error);
    }
};

module.exports = {
    createJobTable,
};
