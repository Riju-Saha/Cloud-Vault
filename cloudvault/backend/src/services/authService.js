const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const env = require('../config/env');
const AppError = require('../utils/AppError');
const userRepository = require('../repositories/userRepository');

const tokenForUser = (userId) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '7d' });
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
});

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError('Email is already registered', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  const user = await userRepository.updateLastLoginAt(createdUser.id);

  return {
    user: sanitizeUser(user),
    token: tokenForUser(user.id),
  };
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401);
  }

  const updatedUser = await userRepository.updateLastLoginAt(user.id);

  return {
    user: sanitizeUser(updatedUser),
    token: tokenForUser(updatedUser.id),
  };
};

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

const updateProfile = async (userId, { name, password }) => {
  const updateData = {};

  if (name) {
    updateData.name = name;
  }

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError('No profile changes were provided', 400);
  }

  const user = await userRepository.updateById(userId, updateData);
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};
