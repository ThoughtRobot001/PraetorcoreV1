import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(120, 'Name must be under 120 characters'),
  email: z
    .string()
    .min(1, 'Please enter your email address')
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Please provide a subject line')
    .max(150, 'Subject line must be under 150 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters long')
    .max(1000, 'Message cannot exceed 1000 characters'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to submit your message',
  }),
  website: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactPayload = ContactFormData & {
  submittedAt: string;
};
