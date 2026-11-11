import 'server-only';
import { getProgramme, programmeRegistry } from '@/content/programmes';
import type { ProgrammeDefinition } from '@/content/programmes/types';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

export interface ProgrammeState { id: string; slug: string; status: 'draft' | 'open' | 'closed' | 'archived'; opens_at: string | null; closes_at: string | null; max_applications: number | null; created_at: string }

export async function loadProgrammeStates(): Promise<ProgrammeState[]> {
  const { data, error } = await createSupabaseAdminClient().from('programmes').select('id,slug,status,opens_at,closes_at,max_applications,created_at').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).filter((row) => getProgramme(row.slug)).map((row) => ({ ...row, status: row.status as ProgrammeState['status'] }));
}

export async function loadPublicProgrammes(): Promise<Array<ProgrammeDefinition & ProgrammeState>> {
  try {
    const states = await loadProgrammeStates();
    return states.filter((state) => state.status === 'open' || state.status === 'closed').map((state) => ({ ...getProgramme(state.slug)!, ...state }));
  } catch {
    return Object.values(programmeRegistry).filter((definition) => definition.status === 'open' || definition.status === 'closed').map((definition) => ({ ...definition, id: definition.slug, opens_at: null, closes_at: null, max_applications: null, created_at: '' }));
  }
}

export async function getProgrammeState(slug: string): Promise<ProgrammeState | null> {
  const { data, error } = await createSupabaseAdminClient().from('programmes').select('id,slug,status,opens_at,closes_at,max_applications,created_at').eq('slug', slug).maybeSingle();
  if (error) throw error;
  if (!data || !getProgramme(data.slug)) return null;
  return { ...data, status: data.status as ProgrammeState['status'] };
}

export async function getPublicApplicationMessage(slug: string): Promise<string | null> {
  const definition = getProgramme(slug);
  if (!definition) return null;
  try {
    const state = await getProgrammeState(slug);
    if (!state) return 'This programme is currently unavailable.';
    if (state.status !== 'open' || (state.opens_at && Date.now() < new Date(state.opens_at).getTime()) || (state.closes_at && Date.now() > new Date(state.closes_at).getTime())) return definition.form.closedMessage ?? 'Applications for this programme are currently closed.';
    if (state.max_applications !== null) {
      const { count, error } = await createSupabaseAdminClient().from('applications').select('id', { count: 'exact', head: true }).eq('programme_id', state.id);
      if (error) throw error;
      if ((count ?? 0) >= state.max_applications) return definition.form.fullMessage ?? 'Applications for this programme are full.';
    }
    return null;
  } catch { return 'Applications are temporarily unavailable. Please try again later.'; }
}
