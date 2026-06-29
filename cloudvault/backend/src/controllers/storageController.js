const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const fileService = require('../services/fileService');

const getStorage = asyncHandler(async (req, res) => {
  const storage = await fileService.getStorageSummary(req.user.id);
  return successResponse(res, 'Storage usage fetched successfully', storage);
});

module.exports = {
  getStorage,
};
