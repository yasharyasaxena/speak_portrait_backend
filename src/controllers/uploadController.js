const { uploadToS3 } = require('../services/awsService');
const { v4: uuidv4 } = require('uuid');
const { createProject, getProjectById, updateProject } = require('../services/projectServices');

const uploadHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        var projectId = req.body.projectId;
        if (!projectId) {
            projectId = uuidv4();
        }
        const files = req.files;
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const uploadedFiles = [];
        for (const [fieldname, fileArray] of Object.entries(files)) {
            for (const file of fileArray) {
                const key = `${userId}/${projectId}/${file.fieldname}/${file.originalname}`;
                const data = await uploadToS3(bucketName, key, file.buffer);
                uploadedFiles.push({ fieldname, url: data.Location, metadata: data.size, filename: file.originalname });
            }
        }

        const projectData = {
            projectId: projectId,
            name: req.body.projectName || 'New Project',
            userId: userId,
            media: uploadedFiles.map(file => ({
                url: file.url,
                fileName: file.filename,
                metadata: file.metadata,
                fileType: file.fieldname.toUpperCase()
            }))
        };
        const project = await getProjectById(projectId);
        if (!project) {
            await createProject(projectData);
        }
        else {
            // const existingMedia = project.media;
            // const uploadedFileTypes = uploadedFiles.map(file => file.fieldname.toUpperCase());

            // const mediaToDelete = existingMedia.filter(media =>
            //     uploadedFileTypes.includes(media.fileType)
            // );

            const updateData = {
                name: projectData.name,
                media: {
                    // delete: mediaToDelete.map(media => ({ id: media.id })),
                    create: projectData.media
                }
            };
            await updateProject(projectId, updateData);
        }
        res.status(200).json({ message: 'Files uploaded successfully', files: uploadedFiles, projectId });

    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files');
    }
};

module.exports = { uploadHandler };