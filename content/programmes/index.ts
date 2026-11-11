import { exampleProgramme } from './example-programme';
import { tech4youthProgramme } from './tech4youth';
import type { ProgrammeDefinition } from './types';

export const programmeRegistry: Record<string, ProgrammeDefinition> = {
  [tech4youthProgramme.slug]: tech4youthProgramme,
  [exampleProgramme.slug]: exampleProgramme,
};

export function getProgramme(slug: string) { return programmeRegistry[slug]; }
export function publicProgrammes() { return Object.values(programmeRegistry).filter((item) => item.status === 'open' || item.status === 'closed'); }
