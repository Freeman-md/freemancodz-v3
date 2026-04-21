import type {
  FeaturedWorkPanel,
  ProjectEntryFeaturedRow,
} from "@/features/landing/types"

const projectDomainLabelMap: Record<
  ProjectEntryFeaturedRow["domain"],
  string
> = {
  ai: "AI System",
  blockchain: "Blockchain System",
  backend: "Backend System",
  automation: "Automation System",
  frontend: "Frontend System",
  full_stack: "Full-Stack System",
  tooling: "Tooling",
  other: "Built System",
}

function buildFeaturedWorkHref(
  projectEntry: ProjectEntryFeaturedRow,
): string {
  return projectEntry.type === "case_study"
    ? `/case-studies/${projectEntry.slug}`
    : `/projects/${projectEntry.slug}`
}

function buildFeaturedWorkActionLabel(
  projectEntry: ProjectEntryFeaturedRow,
): string {
  return projectEntry.type === "case_study"
    ? "Open case study"
    : "Open project details"
}

function buildFeaturedWorkVariant(
  projectIndex: number,
): FeaturedWorkPanel["variant"] {
  return projectIndex === 0 ? "wide" : "stacked"
}

export function mapProjectEntryToFeaturedWorkPanel(
  projectEntry: ProjectEntryFeaturedRow,
  projectIndex: number,
): FeaturedWorkPanel {
  return {
    id: projectEntry.id,
    slug: projectEntry.slug,
    href: buildFeaturedWorkHref(projectEntry),
    eyebrow: projectDomainLabelMap[projectEntry.domain],
    actionLabel: buildFeaturedWorkActionLabel(projectEntry),
    title: projectEntry.title,
    description: projectEntry.description,
    tags: projectEntry.tech_stack,
    variant: buildFeaturedWorkVariant(projectIndex),
  }
}
