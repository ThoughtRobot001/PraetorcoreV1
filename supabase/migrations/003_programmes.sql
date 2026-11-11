CREATE TABLE public.programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'open', 'closed', 'archived')),
  opens_at timestamptz,
  closes_at timestamptz,
  max_applications integer NULL CHECK (max_applications IS NULL OR max_applications >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.programmes (slug, title, status)
VALUES ('tech4youth', 'Tech4Youth', 'open'), ('example-programme', 'Example Programme', 'draft')
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id uuid NOT NULL REFERENCES public.programmes(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'accepted', 'waitlisted', 'rejected')),
  notes text,
  status_updated_at timestamptz,
  status_updated_by text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  email_normalized text NOT NULL,
  phone_normalized text NOT NULL,
  track text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  sensitive jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_ip_hash text NOT NULL
);

CREATE UNIQUE INDEX applications_programme_email_unique ON public.applications (programme_id, email_normalized);
CREATE UNIQUE INDEX applications_programme_phone_unique ON public.applications (programme_id, phone_normalized);
CREATE INDEX applications_programme_id_idx ON public.applications (programme_id);
CREATE INDEX applications_created_at_idx ON public.applications (created_at);
CREATE INDEX applications_status_idx ON public.applications (status);
CREATE INDEX applications_track_idx ON public.applications (track);

ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.programmes, public.applications FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.programmes, public.applications TO service_role;

ALTER TABLE public.admin_audit_log DROP CONSTRAINT IF EXISTS admin_audit_log_action_check;
ALTER TABLE public.admin_audit_log ADD CONSTRAINT admin_audit_log_action_check
  CHECK (action IN ('login', 'view', 'update_status', 'update_notes', 'update_programme', 'export', 'delete'));

INSERT INTO public.applications (
  programme_id, created_at, status, notes, status_updated_at, status_updated_by,
  full_name, email, phone, email_normalized, phone_normalized, track, answers, sensitive, source_ip_hash
)
SELECT
  programme.id, old.created_at, old.status, old.notes, old.status_updated_at, old.status_updated_by,
  old.full_name, old.email, old.phone, old.email_normalized, old.phone_normalized, old.track,
  jsonb_build_object(
    'gender', old.gender, 'ageRange', old.age_range, 'dateOfBirth', old.date_of_birth,
    'location', old.location, 'nationality', old.nationality, 'education', old.education,
    'employmentStatus', old.employment_status, 'trackKnowledge', old.track_knowledge,
    'previousIctTraining', old.previous_ict_training, 'linkedinUrl', old.linkedin_url,
    'githubUrl', old.github_url, 'whyJoin', old.why_join, 'goals', old.goals,
    'canAttendInPerson', old.can_attend_in_person, 'laptopAccess', old.laptop_access,
    'consent', old.consent
  ),
  jsonb_build_object(
    'difficultySeeing', old.difficulty_seeing, 'difficultyHearing', old.difficulty_hearing,
    'difficultyWalking', old.difficulty_walking, 'difficultyRemembering', old.difficulty_remembering,
    'difficultySelfCare', old.difficulty_self_care, 'difficultyCommunicating', old.difficulty_communicating
  ),
  old.source_ip_hash
FROM public.tech4youth_applications AS old
JOIN public.programmes AS programme ON programme.slug = 'tech4youth'
ON CONFLICT (programme_id, email_normalized) DO NOTHING;
