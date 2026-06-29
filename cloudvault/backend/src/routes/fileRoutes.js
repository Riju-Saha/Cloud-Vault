const express = require('express');

const fileController = require('../controllers/fileController');
const validateRequest = require('../middleware/validateRequest');
const upload = require('../middleware/uploadMiddleware');
const { authenticate } = require('../middleware/authMiddleware');
const { fileListQuerySchema, fileIdSchema } = require('../validators/fileValidator');

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), fileController.uploadFile);
router.get('/', authenticate, validateRequest(fileListQuerySchema, 'query'), fileController.listFiles);
router.get('/download/:id', authenticate, validateRequest(fileIdSchema, 'params'), fileController.downloadFile);
router.get('/:id', authenticate, validateRequest(fileIdSchema, 'params'), fileController.getFile);
router.delete('/:id', authenticate, validateRequest(fileIdSchema, 'params'), fileController.deleteFile);

module.exports = router;
