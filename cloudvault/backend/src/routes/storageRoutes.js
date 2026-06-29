const express = require('express');

const storageController = require('../controllers/storageController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, storageController.getStorage);

module.exports = router;
