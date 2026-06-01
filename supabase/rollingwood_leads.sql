-- =============================================================================
-- Rollingwood Townhomes — rollingwood_leads (current production shape)
-- =============================================================================

begin;

create table if not exists public.rollingwood_leads (
  id uuid not null default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text null,
  purchase_timeframe text null,
  agent_name text null,
  brokerage text null,
  comments text null,
  consent boolean not null default true,
  created_at timestamp with time zone not null default now(),
  status text null default 'new'::text,
  lead_temperature text null default 'warm'::text,
  call_history jsonb null default '[]'::jsonb,
  call_count integer null default 0,
  last_note text null,
  lead_type text null default 'registration'::text,
  is_realtor boolean not null,
  constraint rollingwood_leads_pkey primary key (id)
);

create index if not exists rollingwood_leads_created_at_idx
  on public.rollingwood_leads (created_at desc);

create index if not exists rollingwood_leads_email_idx
  on public.rollingwood_leads (email);

alter table public.rollingwood_leads enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'rollingwood_leads'
      and policyname = 'rollingwood_leads_anon_insert'
  ) then
    create policy rollingwood_leads_anon_insert
      on public.rollingwood_leads
      for insert
      to anon, authenticated
      with check (true);
  end if;
end
$$;

grant insert on table public.rollingwood_leads to anon;
grant insert on table public.rollingwood_leads to authenticated;

commit;

-- After DDL changes, refresh API schema cache:
-- notify pgrst, 'reload schema';
