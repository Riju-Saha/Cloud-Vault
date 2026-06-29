const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const fileService = require('../services/fileService');

const uploadFile = asyncHandler(async (req, res) => {
  const file = await fileService.storeUploadedFile({
    userId: req.user.id,
    file: req.file,
  });

  return successResponse(res, 'File uploaded successfully', file, 201);
});

const listFiles = asyncHandler(async (req, res) => {
  const files = await fileService.listUserFiles({
    userId: req.user.id,
    search: req.query.search,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
    page: req.query.page,
    limit: req.query.limit,
  });

  return successResponse(res, 'Files fetched successfully', files);
});

const getFile = asyncHandler(async (req, res) => {
  const file = await fileService.getUserFile({
    userId: req.user.id,
    fileId: req.params.id,
  });

  return successResponse(res, 'File fetched successfully', file);
});

const downloadFile = asyncHandler(async (req, res) => {
  const file = await fileService.getUserFile({
    userId: req.user.id,
    fileId: req.params.id,
  });
  const downloadPath = await fileService.getDownloadPath({
    userId: req.user.id,
    fileId: req.params.id,
  });

  return res.download(downloadPath, file.originalName);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await fileService.deleteUserFile({
    userId: req.user.id,
    fileId: req.params.id,
  });

  return successResponse(res, 'File deleted successfully', file);
});

module.exports = {
  uploadFile,
  listFiles,
  getFile,
  downloadFile,
  deleteFile,
};
