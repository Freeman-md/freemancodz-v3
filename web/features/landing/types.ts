import type { LucideIcon } from "lucide-react"

export type CapabilityCard = {
  title: string
  description: string
  icon: LucideIcon
}

export type SelectedWork = {
  title: string
  description: string
  tags: string[]
  variant: "wide" | "stacked"
  eyebrow: string
  actionLabel: string
  href: string
}

export type ContactLink = {
  label: string
  href: string
}
