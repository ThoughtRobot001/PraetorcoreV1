import { NextRequest } from 'next/server';
import { contactSchema, ContactPayload } from '@/lib/contact-schema';
import {
  isHoneypotFilled,
  apiHoneypotResponse,
  apiSuccessResponse,
  apiValidationErrorResponse,
  apiServerErrorResponse,
  extractZodErrors,
} from '@/lib/form-utils';

// TODO: implement saveToSheet() to log general inquiries to Google Sheets
async function saveToSheet(payload: ContactPayload): Promise<void> {
  // TODO: connect Google Sheets API service account to append inquiry row
  void payload;
}

// TODO: implement sendEmails() to send applicant auto-reply and notify staff
async function sendEmails(payload: ContactPayload): Promise<void> {
  // TODO: send client confirmation email and dispatch notification to info desk
  void payload;
}

// TODO: implement verifyTurnstile() to validate Cloudflare Turnstile token if enabled
async function verifyTurnstile(token?: string): Promise<boolean> {
  // TODO: verify captcha response token with Cloudflare API
  void token;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check: silent 200 success if filled
    if (isHoneypotFilled(body.website)) {
      return apiHoneypotResponse('Message received');
    }

    // Validate with shared schema
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = extractZodErrors(result.error);
      return apiValidationErrorResponse(fieldErrors);
    }

    const cleanedData = result.data;
    const payload: ContactPayload = {
      ...cleanedData,
      submittedAt: new Date().toISOString(),
    };

    // Log cleaned data on the server
    console.log('[General Contact Message Received]', {
      fullName: payload.fullName,
      email: payload.email,
      subject: payload.subject,
      submittedAt: payload.submittedAt,
    });

    // TODO: persist via saveToSheet(payload)
    await saveToSheet(payload);

    // TODO: dispatch email alerts via sendEmails(payload)
    await sendEmails(payload);

    const firstName = payload.fullName.trim().split(' ')[0] || 'there';

    return apiSuccessResponse({ firstName }, 'Message submitted successfully');
  } catch (error) {
    console.error('[Contact API Error]', error);
    return apiServerErrorResponse();
  }
}
