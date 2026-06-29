const { z } = require('zod');

const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').optional(),
    confirmPassword: z.string().min(8, 'Confirm your password').optional(),
  })
  .refine((data) => {
    if (data.password || data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
