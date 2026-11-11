import type { ProgrammeDefinition } from './types';

export const exampleProgramme: ProgrammeDefinition = {
  slug: 'example-programme',
  title: 'Example Programme',
  summary: 'A simple draft programme definition for testing the shared programme engine.',
  status: 'draft',
  pageContent: { hero: { eyebrow: 'EXAMPLE', title: 'Example programme', lead: 'A draft programme used to test programme-aware pages and forms.' }, sections: [] },
  form: { sections: [
    { title: '01. Your details', fields: [
      { key: 'fullName', label: 'Full name', type: 'text', required: true, group: 'core' },
      { key: 'email', label: 'Email address', type: 'email', required: true, group: 'core' },
      { key: 'phone', label: 'Phone number', type: 'phone', required: true, group: 'core' },
      { key: 'track', label: 'Area of interest', type: 'text', required: false, group: 'core' },
      { key: 'experience', label: 'Experience level', type: 'select', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
    ] },
  ] },
};
