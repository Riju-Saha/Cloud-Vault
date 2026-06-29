const multer = require('multer');

const env = require('../config/env');
const AppError = require('../utils/AppError');

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file || !file.originalname) {
      cb(new AppError('A valid file is required', 400));
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: env.maxFileSize,
  },
});

module.exports = uploadMiddleware;
