const { createJob, getJob, getAllJobs, updateJob, deleteJob } = require('../services/jobService');

const createJobController = async (req, res) => {
    console.log('Creating job with data:', req.body);

    // try {
    //     const newJob = await createJob(jobData);
    //     res.status(201).json(newJob);
    // } catch (error) {
    //     console.error('Error creating job:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}
