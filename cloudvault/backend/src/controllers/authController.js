const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return successResponse(res, 'User registered successfully', result, 201);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  return successResponse(res, 'Login successful', result);
});

const profile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  return successResponse(res, 'Profile fetched successfully', user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  return successResponse(res, 'Profile updated successfully', user);
});

module.exports = {
  register,
  login,
  profile,
  updateProfile,
};
