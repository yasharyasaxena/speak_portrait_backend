const express = require('express');
const { getActiveProjectsHandler, getProjectsHandler, getBucketItemsHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler, deleteObjectFromBucketHandler } = require('../controllers/projectController');
const router = express.Router();

router.get('/active', getActiveProjectsHandler);
router.get('/bucket/:id', getBucketItemsHandler);
router.get('/:id', getProjectsHandler);
router.post('/', createProjectHandler);
router.put('/:id', updateProjectHandler);
router.delete('/:id', deleteProjectHandler);
router.delete('/bucket/:id', deleteObjectFromBucketHandler);

module.exports = router;
