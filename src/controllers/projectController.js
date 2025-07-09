const { createProject, getProjectById, deleteProject, updateProject } = require('../services/projectServices');

const createProjectController = async (req, res) => {
    console.log('Creating project with data:', req.body);

    // try {
    //     const newProject = await createProject(projectData);
    //     res.status(201).json(newProject);
    // } catch (error) {
    //     console.error('Error creating project:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}
