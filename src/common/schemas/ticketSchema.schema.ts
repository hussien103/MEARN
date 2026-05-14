import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(20, 'Title must be at most 20 characters'),

  description: z.string().min(15, 'Description must be at least 15 characters'),

  status: z.enum(['open', 'in-progress', 'closed']),

  priority: z.enum(['low', 'medium', 'high', 'critical']),

  assignee: z.string().min(3, 'Assignee is required'),
  reporter: z.string().min(3, 'Reporter is required'),
});

export type CreateTicketType = z.infer<typeof createTicketSchema>;

export const updateTicketSchema = createTicketSchema.partial();

export type UpdateTicketType = z.infer<typeof updateTicketSchema>;
