import { z } from 'zod';
import type { ProgrammeDefinition, ProgrammeField } from '@/content/programmes/types';

function fieldSchema(field: ProgrammeField) {
  let schema: z.ZodTypeAny = z.string();
  if (field.required) {
    schema = (schema as z.ZodString).min(1, `Please enter ${field.label.toLowerCase()}`);
  } else {
    schema = z.string().optional().or(z.literal(''));
  }
  const validation = field.validation;
  if (field.required && validation?.minLength) schema = (schema as z.ZodString).min(validation.minLength, `${field.label} must be at least ${validation.minLength} characters`);
  if (field.required && validation?.maxLength) schema = (schema as z.ZodString).max(validation.maxLength, `${field.label} must be under ${validation.maxLength} characters`);
  if (field.type === 'email' || validation?.email) schema = (schema as z.ZodString).email('Please enter a valid email address');
  if (field.type === 'phone' || validation?.phone === 'nigerian') {
    schema = (schema as z.ZodString).refine((value) => {
      if (!value) return !field.required;
      return /^(?:\+234|234|0)[789][01]\d{8}$/.test(value.replace(/[\s\-()]/g, ''));
    }, { message: 'Please enter a valid Nigerian phone number (e.g. 0803. or +234803.)' });
  }
  if (field.type === 'date' || validation?.dateInPast) {
    schema = (schema as z.ZodString).refine((value) => {
      if (!value) return !field.required;
      const date = new Date(value);
      return Number.isFinite(date.getTime()) && date < new Date();
    }, { message: 'Date must be a valid past date' });
    if (validation?.minAge) schema = (schema as z.ZodString).refine((value) => {
      if (!value) return !field.required;
      const birthDate = new Date(value); const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      if (now.getMonth() < birthDate.getMonth() || (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())) age--;
      return age >= validation.minAge!;
    }, { message: `Applicants must be at least ${validation.minAge} years old to apply.` });
  }
  if (field.type === 'url' || validation?.url) {
    schema = (schema as z.ZodString).refine((value) => {
      if (!value) return !field.required;
      try { const url = new URL(value.trim()); return url.protocol === 'http:' || url.protocol === 'https:'; } catch { return false; }
    }, { message: 'Please enter a valid URL (including https://)' });
  }
  if (field.options?.length && field.required) schema = (schema as z.ZodString).refine((value) => field.options!.includes(value), { message: `Please select a valid ${field.label.toLowerCase()}` });
  return schema;
}

export function buildSchema(definition: ProgrammeDefinition) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const section of definition.form.sections) {
    for (const field of section.fields) {
      if (field.key === 'consent' || field.key === 'website') throw new Error(`Field key "${field.key}" is reserved`);
      if (shape[field.key]) throw new Error(`Duplicate programme field key: ${field.key}`);
      shape[field.key] = fieldSchema(field);
    }
  }
  shape.consent = z.boolean().refine((value) => value === true, { message: 'You must agree to the processing of your personal data to submit' });
  shape.website = z.string().optional().default('');
  return z.object(shape).strict();
}

export type ProgrammeSubmission = Record<string, unknown> & { consent: boolean; website?: string };
