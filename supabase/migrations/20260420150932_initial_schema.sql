create extension if not exists pgcrypto;

create type project_type as enum (
  'project',
  'case_study',
  'experiment',
  'system'
);

create type project_domain as enum (
  'ai',
  'blockchain',
  'backend',
  'automation',
  'frontend',
  'full_stack',
  'tooling',
  'other'
);

create type project_status as enum (
  'draft',
  'published',
  'archived'
);

create type project_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

create table public.project_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  type project_type not null,
  domain project_domain not null,
  status project_status not null default 'draft',
  tech_stack text[] not null,
  level project_level,
  repo_url text,
  live_url text,
  thumbnail_url text,
  featured boolean not null default false,
  summary text,
  content text,
  notes text,
  case_study_id uuid,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint project_entries_slug_not_blank check (btrim(slug) <> ''),
  constraint project_entries_title_not_blank check (btrim(title) <> ''),
  constraint project_entries_description_not_blank check (btrim(description) <> ''),
  constraint project_entries_tech_stack_not_empty check (cardinality(tech_stack) > 0),
  constraint project_entries_case_study_type_check check (
    type = 'case_study' or case_study_id is null
  )
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  project_entry_id uuid not null unique references public.project_entries(id) on delete cascade,
  problem text not null,
  solution text not null,
  outcome text,
  content text,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint case_studies_problem_not_blank check (btrim(problem) <> ''),
  constraint case_studies_solution_not_blank check (btrim(solution) <> '')
);

alter table public.project_entries
  add constraint project_entries_case_study_id_fkey
  foreign key (case_study_id)
  references public.case_studies(id)
  on delete set null
  deferrable initially deferred;

create index project_entries_type_idx on public.project_entries (type);
create index project_entries_domain_idx on public.project_entries (domain);
create index project_entries_status_idx on public.project_entries (status);
create index project_entries_featured_idx on public.project_entries (featured)
where featured = true;
create index project_entries_updated_at_idx on public.project_entries (updated_at desc);
create index project_entries_tech_stack_gin_idx on public.project_entries using gin (tech_stack);
