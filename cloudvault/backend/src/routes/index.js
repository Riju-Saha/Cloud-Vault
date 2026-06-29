const express = require('express');

const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const fileRoutes = require('./fileRoutes');
const storageRoutes = require('./storageRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);
router.use('/storage', storageRoutes);

module.exports = router;
