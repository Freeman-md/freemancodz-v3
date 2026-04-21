export type CaseStudyProjectEntryRow = {
  id: string
  slug: string
  title: string
  description: string
  year: string | null
  type: "project" | "case_study" | "experiment" | "system"
  domain:
    | "ai"
    | "blockchain"
    | "backend"
    | "automation"
    | "frontend"
    | "full_stack"
    | "tooling"
    | "other"
  status: "draft" | "published" | "archived"
  level: "beginner" | "intermediate" | "advanced" | null
  tech_stack: string[]
  repo_url: string | null
  live_url: string | null
  thumbnail_url: string | null
  featured: boolean
  summary: string | null
  case_study_id: string | null
}

export type CaseStudyRow = {
  project_entry_id: string
  problem_title: string | null
  problem_description: string | null
  solution_title: string | null
  solution_description: string | null
  outcome_title: string | null
  outcome_description: string | null
  context_body: string | null
  approach_body: string | null
  evidence_items: string[]
  implementation_details: string | null
  reinforcement_text: string | null
  next_steps: string | null
}

export type CaseStudyDetailsView = {
  title: string
  description: string
  year: string | null
  repoUrl: string | null
  liveUrl: string | null
  domainLabel: string
  typeLabel: string
  levelLabel: string
  statusLabel: string
  techStack: string[]
  problemTitle: string | null
  problemDescription: string | null
  solutionTitle: string | null
  solutionDescription: string | null
  outcomeTitle: string | null
  outcomeDescription: string | null
  contextParagraphs: string[]
  approachParagraphs: string[]
  evidenceItems: string[]
  implementationParagraphs: string[]
  reinforcementParagraphs: string[]
  nextStepsParagraphs: string[]
}
