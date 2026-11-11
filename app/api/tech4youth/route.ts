import { NextRequest } from 'next/server';
import { handleProgrammeApply } from '@/lib/programme-application';

export async function POST(request: NextRequest) {
  return handleProgrammeApply(request, 'tech4youth');
}
