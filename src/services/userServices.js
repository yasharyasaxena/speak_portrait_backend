const { prisma } = require('../config/prisma');

const createOrUpdateUser = async (userData) => {
    const { id, email, emailVerified = false, displayName, imageUrl = null, phoneNumber = null, providerId, disabled = false, lastLogin = new Date(), createdAt } = userData;
    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: id },
        });
        if (existingUser) {
            prisma.user.update({
                where: { id: id },
                data: {
                    email,
                    emailVerified,
                    displayName,
                    imageUrl,
                    phoneNumber,
                    providerId,
                    disabled,
                    lastLogin,
                },
            });
            return existingUser;
        }
        const user = await prisma.user.create({
            data: {
                id,
                email,
                emailVerified,
                displayName,
                imageUrl,
                phoneNumber,
                providerId,
                disabled,
                lastLogin,
                createdAt
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error creating user', error);
    }
};

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user;
    } catch (error) {
        throw new Error('Error fetching user', error);
    }
};

const addProjectsToUser = async (userId, projectIds) => {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                projects: {
                    connect: projectIds.map((projectId) => ({ id: projectId })),
                },
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error adding projects to user', error);
    }
};

module.exports = {
    getUserById,
    addProjectsToUser,
    createOrUpdateUser
};