const express = require('express');
const { getActiveProjectsHandler, getProjectsHandler, getBucketItemsHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler, deleteObjectFromBucketHandler, deleteObjectUsingKey, copyToKeyHandler, projectCompleteHandler, getCompletedProjectsHandler } = require('../controllers/projectController');
const router = express.Router();

router.get('/active', getActiveProjectsHandler);
router.get('/completed', getCompletedProjectsHandler);
router.post('/bucket/:id', getBucketItemsHandler);
router.get('/:id', getProjectsHandler);
router.post('/', createProjectHandler);
router.post('/copy', copyToKeyHandler);
router.post('/:id/complete', projectCompleteHandler);
router.put('/:id', updateProjectHandler);
router.delete('/:id', deleteProjectHandler);
router.delete('/bucket/:id', deleteObjectFromBucketHandler);
router.delete('/object/:key', deleteObjectUsingKey);

module.exports = router;
