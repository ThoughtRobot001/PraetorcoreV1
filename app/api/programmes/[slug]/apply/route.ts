import { NextRequest } from 'next/server';
import { handleProgrammeApply } from '@/lib/programme-application';

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) { const { slug } = await context.params; return handleProgrammeApply(request, slug); }
