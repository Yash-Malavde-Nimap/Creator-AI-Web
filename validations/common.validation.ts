import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const idSchema = z.string().uuid('Invalid ID format');

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100),
});

export type PaginationValues = z.infer<typeof paginationSchema>;
export type SearchValues = z.infer<typeof searchSchema>;
