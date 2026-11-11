CREATE TABLE public.tech4youth_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  gender text NOT NULL,
  age_range text NOT NULL,
  date_of_birth date NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  location text NOT NULL,
  nationality text NOT NULL,
  education text NOT NULL,
  employment_status text NOT NULL,
  difficulty_seeing text NOT NULL,
  difficulty_hearing text NOT NULL,
  difficulty_walking text NOT NULL,
  difficulty_remembering text NOT NULL,
  difficulty_self_care text NOT NULL,
  difficulty_communicating text NOT NULL,
  track text NOT NULL,
  track_knowledge text NOT NULL,
  previous_ict_training text NOT NULL,
  linkedin_url text,
  github_url text,
  why_join text NOT NULL,
  goals text NOT NULL,
  can_attend_in_person text NOT NULL,
  laptop_access text NOT NULL,
  consent boolean NOT NULL,
  phone_normalized text NOT NULL,
  email_normalized text NOT NULL,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewed', 'shortlisted', 'accepted', 'waitlisted', 'rejected')),
  notes text,
  source_ip_hash text NOT NULL
);

CREATE UNIQUE INDEX tech4youth_applications_email_normalized_unique
  ON public.tech4youth_applications (email_normalized);
CREATE UNIQUE INDEX tech4youth_applications_phone_normalized_unique
  ON public.tech4youth_applications (phone_normalized);
CREATE INDEX tech4youth_applications_created_at_idx
  ON public.tech4youth_applications (created_at);
CREATE INDEX tech4youth_applications_status_idx
  ON public.tech4youth_applications (status);
CREATE INDEX tech4youth_applications_track_idx
  ON public.tech4youth_applications (track);

ALTER TABLE public.tech4youth_applications ENABLE ROW LEVEL SECURITY;

-- Only the server's service role may read or write this table; do not add anon or authenticated policies.
REVOKE ALL ON TABLE public.tech4youth_applications FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.tech4youth_applications TO service_role;
