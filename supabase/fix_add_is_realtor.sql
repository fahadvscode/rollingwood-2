-- Minimal fix when the app expects is_realtor but the column is missing.
-- Safe to run multiple times. Run in Supabase → SQL Editor.

alter table public.rollingwood_leads
  add column if not exists is_realtor boolean;

update public.rollingwood_leads
set is_realtor = false
where is_realtor is null;

alter table public.rollingwood_leads
  alter column is_realtor set not null;

-- Refresh PostgREST schema cache (Supabase picks this up within a few seconds)
notify pgrst, 'reload schema';
