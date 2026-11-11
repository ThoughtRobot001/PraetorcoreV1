import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Standard Nigerian phone number validator:
 * Accepts formats: 080..., 070..., 090..., 091..., +234..., 234...
 */
export const NIGERIAN_PHONE_REGEX = /^(?:\+234|234|0)[789][01]\d{8}$/;

export function isValidNigerianPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-()]/g, '');
  return NIGERIAN_PHONE_REGEX.test(clean);
}

export const nigerianPhoneZod = z
  .string()
  .min(1, 'Please enter your phone or WhatsApp number')
  .refine(isValidNigerianPhone, {
    message: 'Please enter a valid Nigerian phone number (e.g. 0803… or +234803…)',
  });

/**
 * Check if the honeypot field is filled.
 * Returns true if bot activity is suspected.
 */
export function isHoneypotFilled(honeypotValue?: string | null): boolean {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

/**
 * Standard API error and success responses
 */
export function apiHoneypotResponse(message = 'Request received') {
  return NextResponse.json({ ok: true, message }, { status: 200 });
}

export function apiSuccessResponse(data: Record<string, unknown> = {}, message = 'Submission successful') {
  return NextResponse.json({ ok: true, message, ...data }, { status: 200 });
}

export function apiValidationErrorResponse(errors: Record<string, string>, message = 'Validation failed') {
  return NextResponse.json({ ok: false, errors, message }, { status: 422 });
}

export function apiServerErrorResponse(message = 'An unexpected server error occurred. Please try again.') {
  return NextResponse.json({ ok: false, message }, { status: 500 });
}

/**
 * Extract field-level errors from ZodError
 */
export function extractZodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const path = issue.path[0];
    if (path && typeof path === 'string') {
      fieldErrors[path] = issue.message;
    }
  });
  return fieldErrors;
}
