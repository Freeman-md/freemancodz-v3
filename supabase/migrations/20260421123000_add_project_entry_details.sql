alter table public.project_entries
  add column year text,
  drop column content,
  drop column notes;

create table public.project_entry_details (
  id uuid primary key default gen_random_uuid(),
  project_entry_id uuid not null unique references public.project_entries(id) on delete cascade,
  system_snapshot_title text,
  system_snapshot_items text[] not null default '{}',
  design_focus_items text[] not null default '{}',
  context_text text,
  innovation_text text,
  implementation_text text,
  latency_profile_title text,
  latency_profile_content text,
  system_focus_title text,
  system_focus_content text,
  outcomes_text text,
  why_this_matters text,
  updated_at timestamptz not null default timezone('utc', now())
);

create index project_entry_details_project_entry_id_idx
on public.project_entry_details (project_entry_id);
