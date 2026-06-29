const express = require('express');

const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, updateProfileSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.get('/profile', authenticate, authController.profile);
router.put('/profile', authenticate, validateRequest(updateProfileSchema), authController.updateProfile);

module.exports = router;
