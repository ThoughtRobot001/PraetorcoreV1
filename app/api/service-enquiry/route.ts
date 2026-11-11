import { NextRequest } from 'next/server';
import { serviceEnquirySchema, ServiceEnquiryPayload } from '@/lib/service-enquiry-schema';
import {
  isHoneypotFilled,
  apiHoneypotResponse,
  apiSuccessResponse,
  apiValidationErrorResponse,
  apiServerErrorResponse,
  extractZodErrors,
} from '@/lib/form-utils';

// TODO: implement saveToSheet() to append the consultation record to Google Sheets
async function saveToSheet(payload: ServiceEnquiryPayload): Promise<void> {
  // TODO: connect Google Sheets API service account to append consultation request
  void payload;
}

// TODO: implement sendEmails() to send client acknowledgement and alert sales/technical team
async function sendEmails(payload: ServiceEnquiryPayload): Promise<void> {
  // TODO: send client consultation confirmation and notify consulting desk
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
      return apiHoneypotResponse('Consultation enquiry received');
    }

    // Validate with shared schema
    const result = serviceEnquirySchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = extractZodErrors(result.error);
      return apiValidationErrorResponse(fieldErrors);
    }

    const cleanedData = result.data;
    const payload: ServiceEnquiryPayload = {
      ...cleanedData,
      submittedAt: new Date().toISOString(),
    };

    // Log cleaned data on the server
    console.log('[Service Consultation Request Received]', {
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      organisation: payload.organisation || 'N/A',
      service: payload.service,
      submittedAt: payload.submittedAt,
    });

    // TODO: persist via saveToSheet(payload)
    await saveToSheet(payload);

    // TODO: dispatch email alerts via sendEmails(payload)
    await sendEmails(payload);

    const firstName = payload.fullName.trim().split(' ')[0] || 'there';

    return apiSuccessResponse({ firstName }, 'Consultation request submitted successfully');
  } catch (error) {
    console.error('[Service Enquiry API Error]', error);
    return apiServerErrorResponse();
  }
}
