alter table public.case_studies
  add column problem_title text,
  add column problem_description text,
  add column solution_title text,
  add column solution_description text,
  add column outcome_title text,
  add column outcome_description text,
  add column context_body text,
  add column approach_body text,
  add column evidence_items text[] not null default '{}',
  add column implementation_details text,
  add column reinforcement_text text,
  add column next_steps text;

update public.case_studies
set
  problem_title = coalesce(problem_title, 'Problem'),
  problem_description = coalesce(problem_description, problem),
  solution_title = coalesce(solution_title, 'Solution'),
  solution_description = coalesce(solution_description, solution),
  outcome_title = coalesce(outcome_title, case when outcome is not null then 'Outcome' else null end),
  outcome_description = coalesce(outcome_description, outcome),
  implementation_details = coalesce(implementation_details, content);

alter table public.case_studies
  alter column problem_title set not null,
  alter column problem_description set not null,
  alter column solution_title set not null,
  alter column solution_description set not null;

alter table public.case_studies
  drop column problem,
  drop column solution,
  drop column outcome,
  drop column content;
