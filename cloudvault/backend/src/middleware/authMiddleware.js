const jwt = require('jsonwebtoken');

const env = require('../config/env');
const AppError = require('../utils/AppError');
const userRepository = require('../repositories/userRepository');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication token is required', 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.name === 'JsonWebTokenError' ? new AppError('Invalid token', 401) : error);
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    if (!allowedRoles.length || allowedRoles.includes(req.user.role)) {
      next();
      return;
    }

    next(new AppError('You do not have permission to perform this action', 403));
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
