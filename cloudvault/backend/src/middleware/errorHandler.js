const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || [];

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
