import { z } from 'zod';
import { nigerianPhoneZod } from './form-utils';

export const serviceOptions = [
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Capacity building and Training', label: 'Capacity building and Training' },
  { value: 'training', label: 'Training for my organisation' },
  { value: 'Not sure yet', label: 'Not sure yet' },
] as const;

export const serviceValues = [
  'Data Analytics',
  'Cybersecurity',
  'Software Development',
  'Capacity building and Training',
  'training',
  'Not sure yet',
] as const;

export type ServiceChoice = (typeof serviceValues)[number];

export const serviceEnquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(120, 'Name must be under 120 characters'),
  email: z
    .string()
    .min(1, 'Please enter your work email')
    .email('Please enter a valid work email address'),
  phone: nigerianPhoneZod,
  organisation: z.string().max(120, 'Organisation name must be under 120 characters').optional().or(z.literal('')),
  service: z.enum(serviceValues, {
    message: 'Please select a service',
  }),
  message: z
    .string()
    .min(20, 'Please provide at least 20 characters describing how we can help')
    .max(1000, 'Message cannot exceed 1000 characters'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to submit your consultation request',
  }),
  website: z.string().optional(), // Honeypot field
});

export type ServiceEnquiryFormData = z.infer<typeof serviceEnquirySchema>;

export type ServiceEnquiryPayload = ServiceEnquiryFormData & {
  submittedAt: string;
};
