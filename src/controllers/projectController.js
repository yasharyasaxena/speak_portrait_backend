const { getUserProjects, createProject, updateProject, deleteProject } = require('../services/projectServices');

const getProjectsHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projects = await getUserProjects(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Error fetching projects');
    }
}

const createProjectHandler = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const projectData = req.body;
        projectData.userId = userId; // Ensure userId is set
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

module.exports = {
    getProjectsHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler
};