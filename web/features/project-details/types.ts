export type ProjectEntryRow = {
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
}

export type ProjectEntryDetailsRow = {
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

export type ProjectDetailsView = {
  title: string
  description: string
  year: string | null
  repoUrl: string | null
  liveUrl: string | null
  techStack: string[]
  domainLabel: string
  typeLabel: string
  levelLabel: string
  systemSnapshotTitle: string | null
  systemSnapshotItems: string[]
  designFocusItems: string[]
  contextParagraphs: string[]
  innovationText: string | null
  implementationParagraphs: string[]
  latencyProfileTitle: string | null
  latencyProfileContent: string | null
  systemFocusTitle: string | null
  systemFocusContent: string | null
  outcomesParagraphs: string[]
  whyThisMattersParagraphs: string[]
}
