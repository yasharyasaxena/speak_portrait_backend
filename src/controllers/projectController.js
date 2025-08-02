const { prisma } = require('../config/prisma');
const { listObjectsInS3, deleteFromS3, copyToS3 } = require('../services/awsService');
const { createProject, updateProject, deleteProject, getProjectById, getUserProjects } = require('../services/projectServices');

const getActiveProjectsHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projects = await getUserProjects(userId);
        const activeProjects = projects.filter(project => project.status === 'ACTIVE').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(activeProjects);
    } catch (error) {
        console.error('Error fetching active projects:', error);
        res.status(500).send('Error fetching active projects');
    }
};

const getProjectsHandler = async (req, res) => {
    try {
        const projectId = req.params.id;
        const projects = await getProjectById(projectId);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Error fetching projects');
    }
}

const getBucketItemsHandler = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const fieldname = req.body.fieldname;
        const prefix = `${userId}/${projectId}/${fieldname}/`;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const bucketItems = await listObjectsInS3(bucketName, prefix);
        res.status(200).json(bucketItems);
    } catch (error) {
        console.error('Error fetching bucket items:', error);
        res.status(500).send('Error fetching bucket items');
    }
}

const deleteObjectFromBucketHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projectId = req.params.id;
        const fieldname = req.body.fieldname;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const key = `${userId}/${projectId}/${fieldname}/`;
        const data = await deleteFromS3(bucketName, key);
        const deleteMedia = await prisma.project.update({
            where: { id: projectId },
            data: {
                media: {
                    deleteMany: {
                        fileType: fieldname.toUpperCase()
                    }
                }
            }
        });
        console.log('Deleted media from project:', deleteMedia);
        console.log('Deleted object from bucket:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error deleting object from bucket:', error);
        res.status(500).send('Error deleting object from bucket');
    }
}

const createProjectHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projectData = req.body;
        projectData.userId = userId;
        const project = await createProject(projectData);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).send('Error creating project');
    }
}

const updateProjectHandler = async (req, res) => {
    try {
        const projectId = req.params.id;
        const data = req.body;
        const updatedProject = await updateProject(projectId, data);
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).send('Error updating project');
    }
}

const deleteProjectHandler = async (req, res) => {
    try {
        const projectId = req.params.id;
        await deleteProject(projectId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send('Error deleting project');
    }
}

const deleteObjectUsingKey = async (req, res) => {
    try {
        const key = req.params.key;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const data = await deleteFromS3(bucketName, key);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error deleting object using key:', error);
        res.status(500).send('Error deleting object using key');
    }
}

const copyToKeyHandler = async (req, res) => {
    try {
        const { sourceKey, destinationKey } = req.body;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const data = await copyToS3(bucketName, sourceKey, bucketName, destinationKey);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error copying object:', error);
        res.status(500).send('Error copying object');
    }
}

const projectCompleteHandler = async (req, res) => {
    try {
        const projectId = req.params.id;
        const video_url = req.body.video_url;
        const fileName = req.body.fileName;
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: { status: 'COMPLETED', media: { create: { url: video_url, fileType: 'VIDEO', fileName } } }
        });
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error completing project:', error);
        res.status(500).send('Error completing project');
    }
}

const getCompletedProjectsHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projects = await getUserProjects(userId);
        const completedProjects = projects.filter(project => project.status === 'COMPLETED').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(completedProjects);
    } catch (error) {
        console.error('Error fetching completed projects:', error);
        res.status(500).send('Error fetching completed projects');
    }
};


module.exports = {
    getActiveProjectsHandler,
    getProjectsHandler,
    getBucketItemsHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
    deleteObjectFromBucketHandler,
    deleteObjectUsingKey,
    copyToKeyHandler,
    projectCompleteHandler,
    getCompletedProjectsHandler
};