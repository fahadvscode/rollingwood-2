-- Run this in Supabase SQL Editor if rollingwood_leads already exists with
-- buyer_type / home_interest columns (one-time migration).

begin;

alter table public.rollingwood_leads
  add column if not exists is_realtor boolean;

update public.rollingwood_leads
set is_realtor = false
where is_realtor is null;

alter table public.rollingwood_leads
  alter column is_realtor set not null;

alter table public.rollingwood_leads
  drop constraint if exists rollingwood_leads_buyer_type_check;

alter table public.rollingwood_leads
  drop constraint if exists rollingwood_leads_home_interest_check;

alter table public.rollingwood_leads
  drop column if exists buyer_type;

alter table public.rollingwood_leads
  drop column if exists home_interest;

notify pgrst, 'reload schema';

commit;
