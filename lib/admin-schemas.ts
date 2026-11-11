import { z } from 'zod';

export const adminStatuses = ['new', 'reviewed', 'shortlisted', 'accepted', 'waitlisted', 'rejected'] as const;
export const adminStatusSchema = z.enum(adminStatuses);

const dateFilter = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').optional().or(z.literal(''));
export const adminFiltersSchema = z.object({
  programme: z.string().trim().max(120).optional().default(''),
  q: z.string().trim().max(120).optional().default(''),
  track: z.string().trim().max(120).optional().default(''),
  status: adminStatusSchema.optional().or(z.literal('')).default(''),
  from: dateFilter,
  to: dateFilter,
  page: z.coerce.number().int().min(1).max(100000).default(1),
});
export type AdminFilters = z.infer<typeof adminFiltersSchema>;

export const updateApplicationSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('status'), status: adminStatusSchema, programmeId: z.string().uuid() }),
  z.object({ type: z.literal('notes'), notes: z.string().max(2000), programmeId: z.string().uuid() }),
]);

export const bulkStatusSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
  programmeId: z.string().uuid(),
  status: adminStatusSchema,
});

export const deleteApplicationSchema = z.object({
  emailConfirmation: z.string().trim().email().max(320),
  programmeId: z.string().uuid(),
});

export const programmeUpdateSchema = z.object({
  status: z.enum(['draft', 'open', 'closed', 'archived']).optional(),
  closesAt: z.string().datetime().nullable().optional(),
  maxApplications: z.number().int().min(0).nullable().optional(),
}).refine((value) => Object.keys(value).length > 0);

export const exportQuerySchema = adminFiltersSchema.extend({
  includeAccessibilityAnswers: z.enum(['1', 'true', 'on']).optional().transform(Boolean),
  includeNotes: z.enum(['1', 'true', 'on']).optional().transform(Boolean),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(200),
});
