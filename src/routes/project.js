const express = require('express');
const { getProjectsHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } = require('../controllers/projectController');
const router = express.Router();

router.post('/', createProjectHandler);
router.get('/:id', getProjectsHandler);
router.put('/:id', updateProjectHandler);
router.delete('/:id', deleteProjectHandler);

module.exports = router;
