const { prisma } = require('../config/prisma');

const getUserProjects = async (userId) => {
    try {
        const projects = await prisma.project.findMany({
            where: { uid: userId },
        });
        return projects;
    } catch (error) {
        console.error('Error fetching user projects:', error);
        throw error;
    }
}

const createProject = async (data) => {
    const { projectId = "", userId, name = "", media: [{ url = "", fileName = "", metadata = {} }] } = data;
    try {
        const project = await prisma.project.create({
            data: {
                ...(projectId ? { id: projectId } : {}),
                userId,
                name,
                media: {
                    create: {
                        url,
                        fileName,
                        metadata,
                    },
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
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data,
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

module.exports = {
    createProject,
    updateProject,
    getUserProjects,
    deleteProject
};