const { createProject, getProjectById, updateProject } = require('../services/projectServices');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }
        const imageUrl = 'C:/Users/HP/Documents/speak_portrait_backend/temp/uploads/' + req.file.filename;
        const projectId = req.body.projectId;
        const userId = req.body.userId;
        const project = projectId ? await getProjectById(projectId) : null;
        if (!project) {
            const newProject = await createProject({ userId: userId, imageUrl: imageUrl });
            res.status(200).json({ success: true, message: 'Image uploaded successfully', imageUrl: imageUrl, projectId: newProject.project_id });
        }
        else {
            const updatedProject = await updateProject(projectId, { image_url: imageUrl });
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
        const projectId = req.body.projectId;
        const userId = req.body.userId;
        const project = projectId ? await getProjectById(projectId) : null;
        if (!project) {
            const newProject = await createProject({ userId: userId, audioUrl: audioUrl });
            res.status(200).json({ success: true, message: 'Audio uploaded successfully', audioUrl: audioUrl, projectId: newProject.project_id });
        }
        else {
            const updatedProject = await updateProject(projectId, { audio_url: audioUrl });
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
