const { createJob, getJobById, updateJob } = require('../services/jobServices');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }
        const imageUrl = 'C:/Users/HP/Documents/speak_portrait_backend/temp/uploads/' + req.file.filename;
        const jobId = req.body.jobId;
        const userId = req.body.userId;
        const job = jobId ? await getJobById(jobId) : null;
        if (!job) {
            const newJob = await createJob({ userId: userId, imageUrl: imageUrl });
            res.status(200).json({ success: true, message: 'Image uploaded successfully', imageUrl: imageUrl, jobId: newJob.job_id });
        }
        else {
            const updatedJob = await updateJob(jobId, { image_url: imageUrl });
            res.status(200).json({ success: true, message: 'Image uploaded successfully', imageUrl: imageUrl });
        }

    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ success: false, message: 'Image upload failed', error: error.message });
    }
};

const uploadAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No audio uploaded' });
        }
        const audioUrl = 'C:/Users/HP/Documents/speak_portrait_backend/temp/uploads/' + req.file.filename;
        const jobId = req.body.jobId;
        const userId = req.body.userId;
        const job = jobId ? await getJobById(jobId) : null;
        if (!job) {
            const newJob = await createJob({ userId: userId, audioUrl: audioUrl });
            res.status(200).json({ success: true, message: 'Audio uploaded successfully', audioUrl: audioUrl, jobId: newJob.job_id });
        }
        else {
            const updatedJob = await updateJob(jobId, { audio_url: audioUrl });
            res.status(200).json({ success: true, message: 'Audio uploaded successfully', audioUrl: audioUrl });
        }
    } catch (error) {
        console.error('Audio upload error:', error);
        res.status(500).json({ success: false, message: 'Audio upload failed', error: error.message });
    }
};

module.exports = {
    uploadImage,
    uploadAudio
};
