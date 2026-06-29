const AppError = require('../utils/AppError');

const validateRequest = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    const details = result.error.flatten();
    return next(new AppError('Validation failed', 400, details.fieldErrors));
  }

  req[source] = result.data;
  next();
};

module.exports = validateRequest;
