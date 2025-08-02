const { prisma } = require('../config/prisma');

const getUserProjects = async (userId) => {
    try {
        const projects = await prisma.project.findMany({
            where: { userId: userId },
            include: {
                media: true,
            },
        });
        return projects;
    } catch (error) {
        console.error('Error fetching user projects:', error);
        throw error;
    }
}

const createProject = async (data) => {
    const { projectId = "", userId, name = "", media = [] } = data;
    try {
        const project = await prisma.project.create({
            data: {
                ...(projectId ? { id: projectId } : {}),
                userId,
                name,
                media: {
                    create: media.map(mediaItem => ({
                        url: mediaItem.url,
                        fileName: mediaItem.fileName,
                        metadata: mediaItem.metadata,
                        fileType: mediaItem.fileType.toUpperCase(),
                    })),
                },
            },
        });
        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

const updateProject = async (projectId, data) => {
    try {
        const { media, ...projectData } = data;

        // Handle media updates
        const updateData = {
            ...projectData
        };

        // If media is provided, add it to update data
        if (media) {
            updateData.media = media;
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: updateData
        });
        return updatedProject;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

const deleteProject = async (projectId) => {
    try {
        await prisma.project.delete({
            where: { id: projectId },
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

const getProjectById = async (projectId) => {
    if (!projectId) {
        return null;
    }
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                media: true,
            },
        });
        return project;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

module.exports = {
    createProject,
    updateProject,
    getUserProjects,
    deleteProject,
    getProjectById
};