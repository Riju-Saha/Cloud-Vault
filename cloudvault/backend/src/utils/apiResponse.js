const successResponse = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, details = [], statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
