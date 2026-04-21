export type CaseStudyRecord = {
  title: string
  description: string
  year: string | null
  domain: string
  type: string
  level: string | null
  status: string
  repo_url: string | null
  live_url: string | null
  tech_stack: string[]
  problem_title: string
  problem_description: string
  solution_title: string
  solution_description: string
  outcome_title: string | null
  outcome_description: string | null
  context_body: string | null
  approach_body: string | null
  evidence_items: string[]
  implementation_details: string | null
  reinforcement_text: string | null
  next_steps: string | null
}
