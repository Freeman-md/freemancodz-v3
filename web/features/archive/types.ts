export type ProjectEntryArchiveRow = {
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
  level: "beginner" | "intermediate" | "advanced" | null
  tech_stack: string[]
  featured: boolean
  updated_at: string
}

export type ArchiveProjectCard = {
  id: string
  sequenceLabel: string
  slug: string
  href: string
  actionLabel: string
  year: string | null
  title: string
  description: string
  typeLabel: string
  domainLabel: string
  levelLabel: string
  technologyLabels: string[]
  variant: "half" | "full"
}

export type ArchiveFilterOption = {
  label: string
  value: string
}

export type ArchivePageState = {
  projects: ArchiveProjectCard[]
  errorMessage: string | null
}
