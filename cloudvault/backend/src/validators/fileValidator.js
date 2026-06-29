const { z } = require('zod');

const fileListQuerySchema = z.object({
  search: z.string().trim().optional(),
  sortBy: z.enum(['name', 'size', 'date']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const fileIdSchema = z.object({
  id: z.string().trim().min(1, 'File id is required'),
});

module.exports = {
  fileListQuerySchema,
  fileIdSchema,
};
