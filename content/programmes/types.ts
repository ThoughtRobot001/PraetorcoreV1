export type ProgrammeFieldType = 'text' | 'email' | 'phone' | 'date' | 'select' | 'radio' | 'textarea' | 'checkbox' | 'url';
export type ProgrammeFieldGroup = 'core' | 'answers' | 'sensitive';

export interface ProgrammeField {
  key: string;
  label: string;
  type: ProgrammeFieldType;
  required: boolean;
  options?: string[];
  helperText?: string;
  placeholder?: string;
  group?: ProgrammeFieldGroup;
  validation?: { minLength?: number; maxLength?: number; email?: boolean; phone?: 'nigerian'; dateInPast?: boolean; minAge?: number; url?: boolean };
}

export interface ProgrammeFormSection {
  title: string;
  subtitle?: string;
  introTitle?: string;
  introText?: string;
  introAfterFieldCount?: number;
  fields: ProgrammeField[];
}

export interface ProgrammePageContent {
  sections?: unknown[];
  hero?: { eyebrow: string; title: string; lead?: string; ctaLabel?: string };
  programme?: { duration?: string; delivery?: string; location?: string };
  overview?: { eyebrow: string; title: string; lead: string; targetAudience?: string[] };
  tracks?: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<{ id: string; title: string; description: string; skills?: string[] }>;
  };
  benefits?: { eyebrow: string; title: string; items: string[] };
  eligibility?: { eyebrow: string; title: string; items: string[] };
}

export interface ProgrammeDefinition<PageContent = ProgrammePageContent> {
  slug: string;
  title: string;
  summary: string;
  status: 'draft' | 'open' | 'closed' | 'archived';
  pageContent: PageContent;
  form: { sections: ProgrammeFormSection[]; successMessage?: string; closedMessage?: string; fullMessage?: string };
}
