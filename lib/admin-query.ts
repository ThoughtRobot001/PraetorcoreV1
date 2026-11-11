import 'server-only';
import type { AdminFilters } from '@/lib/admin-schemas';

export const ADMIN_PAGE_SIZE = 25;

export function applyApplicationFilters(query: any, filters: AdminFilters): any {
  let result = query;
  if (filters.status) result = result.eq('status', filters.status);
  if (filters.track) result = result.eq('track', filters.track);
  if (filters.from) result = result.gte('created_at', `${filters.from}T00:00:00.000Z`);
  if (filters.to) result = result.lte('created_at', `${filters.to}T23:59:59.999Z`);
  const search = filters.q.trim().replace(/[\\,()]/g, '\\$&').replace(/[%_]/g, '\\$&');
  if (search) {
    const like = `*${search}*`;
    result = result.or(`full_name.ilike.${like},email.ilike.${like},phone.ilike.${like}`);
  }
  return result;
}

export function paramsToObject(params: URLSearchParams): Record<string, string> {
  const values: Record<string, string> = {};
  params.forEach((value, key) => { values[key] = value; });
  return values;
}
