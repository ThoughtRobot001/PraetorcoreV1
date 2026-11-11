ALTER TABLE public.tech4youth_applications
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS status_updated_by text;

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  admin_email text NOT NULL,
  action text NOT NULL CHECK (action IN ('login', 'view', 'update_status', 'update_notes', 'export', 'delete')),
  application_id uuid NULL,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx
  ON public.admin_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_audit_log_application_id_idx
  ON public.admin_audit_log (application_id);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.admin_audit_log FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.admin_audit_log TO service_role;