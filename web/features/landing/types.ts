import type { LucideIcon } from "lucide-react"

export type CapabilityCard = {
  title: string
  description: string
  icon: LucideIcon
}

export type ProjectEntryFeaturedRow = {
  id: string
  slug: string
  title: string
  description: string
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
  tech_stack: string[]
}

export type FeaturedWorkPanel = {
  id: string
  slug: string
  href: string
  eyebrow: string
  actionLabel: string
  title: string
  description: string
  tags: string[]
  variant: "wide" | "stacked"
}

export type FeaturedWorksState = {
  works: FeaturedWorkPanel[]
  errorMessage: string | null
}

export type ContactLink = {
  label: string
  href: string
}
