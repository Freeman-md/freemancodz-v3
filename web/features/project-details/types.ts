export type ProjectEntryDetailsRecord = {
  system_snapshot_title: string | null
  system_snapshot_items: string[]
  design_focus_items: string[]
  context_text: string | null
  innovation_text: string | null
  implementation_text: string | null
  latency_profile_title: string | null
  latency_profile_content: string | null
  system_focus_title: string | null
  system_focus_content: string | null
  outcomes_text: string | null
  why_this_matters: string | null
}

export type ProjectDetailsRecord = {
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
  level: "beginner" | "intermediate" | "advanced" | null
  repo_url: string | null
  live_url: string | null
  tech_stack: string[]
  details: ProjectEntryDetailsRecord | null
}
