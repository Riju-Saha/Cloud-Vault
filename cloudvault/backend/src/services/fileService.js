const path = require('path');

const AppError = require('../utils/AppError');
const fileRepository = require('../repositories/fileRepository');
const storageService = require('./storageService');

const buildPagination = (page = 1, limit = 10) => {
  const safePage = Number(page) || 1;
  const safeLimit = Number(limit) || 10;
  return {
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
    page: safePage,
    limit: safeLimit,
  };
};

const storeUploadedFile = async ({ userId, file }) => {
  if (!file) {
    throw new AppError('File is required', 400);
  }

  const savedFile = await storageService.saveBuffer({
    buffer: file.buffer,
    originalName: file.originalname,
  });

  return fileRepository.create({
    filename: savedFile.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    path: savedFile.relativePath,
    checksum: savedFile.checksum,
    userId,
  });
};

const listUserFiles = async ({ userId, search, sortBy, sortOrder, page, limit }) => {
  const pagination = buildPagination(page, limit);
  const [files, total] = await Promise.all([
    fileRepository.findByUserId(userId, {
      search,
      sortBy,
      sortOrder,
      skip: pagination.skip,
      take: pagination.take,
    }),
    fileRepository.countByUserId(userId, search),
  ]);

  return {
    files,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / pagination.limit)),
    },
  };
};

const getUserFile = async ({ userId, fileId }) => {
  const file = await fileRepository.findByIdAndUserId(fileId, userId);

  if (!file) {
    throw new AppError('File not found', 404);
  }

  return file;
};

const deleteUserFile = async ({ userId, fileId }) => {
  const file = await getUserFile({ userId, fileId });
  await storageService.deleteByPath(file.path);
  await fileRepository.deleteByIdAndUserId(fileId, userId);

  return file;
};

const getStorageSummary = async (userId) => {
  const result = await fileRepository.sumSizeByUserId(userId);
  const usedStorage = result.usedStorage || 0;
  const totalStorage = 10 * 1024 * 1024 * 1024;
  const remainingStorage = Math.max(0, totalStorage - usedStorage);
  const percentageUsed = totalStorage === 0 ? 0 : Number(((usedStorage / totalStorage) * 100).toFixed(2));

  return {
    totalStorage,
    usedStorage,
    remainingStorage,
    percentageUsed,
  };
};

const getDownloadPath = async ({ userId, fileId }) => {
  const file = await getUserFile({ userId, fileId });
  return path.resolve(process.cwd(), file.path);
};

module.exports = {
  storeUploadedFile,
  listUserFiles,
  getUserFile,
  deleteUserFile,
  getStorageSummary,
  getDownloadPath,
};
