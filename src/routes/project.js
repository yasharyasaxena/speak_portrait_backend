const express = require('express');
const { getProjectsHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } = require('../controllers/projectController');
const router = express.Router();

router.get('/', getProjectsHandler);
router.post('/', createProjectHandler);
router.put('/:id', updateProjectHandler);
router.delete('/:id', deleteProjectHandler);

module.exports = router;
