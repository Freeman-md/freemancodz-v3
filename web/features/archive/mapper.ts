import type {
  ArchiveProjectCard,
  ProjectEntryArchiveRow,
} from "@/features/archive/types"

const projectTypeLabelMap: Record<ProjectEntryArchiveRow["type"], string> = {
  project: "Project",
  case_study: "Case Study",
  experiment: "Experiment",
  system: "System",
}

const projectDomainLabelMap: Record<ProjectEntryArchiveRow["domain"], string> = {
  ai: "AI",
  blockchain: "Blockchain",
  backend: "Backend",
  automation: "Automation",
  frontend: "Frontend",
  full_stack: "Full Stack",
  tooling: "Tooling",
  other: "Other",
}

const projectLevelLabelMap: Record<
  Exclude<ProjectEntryArchiveRow["level"], null>,
  string
> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
}

function buildArchiveProjectHref(projectEntry: ProjectEntryArchiveRow): string {
  return projectEntry.type === "case_study"
    ? `/case-studies/${projectEntry.slug}`
    : `/projects/${projectEntry.slug}`
}

function buildArchiveProjectActionLabel(
  projectEntry: ProjectEntryArchiveRow,
): string {
  return projectEntry.type === "case_study"
    ? "Open case study"
    : "Open project details"
}

function buildArchiveProjectVariant(
  projectIndex: number,
): ArchiveProjectCard["variant"] {
  return projectIndex % 3 === 2 ? "full" : "half"
}

function buildArchiveProjectSequenceLabel(projectIndex: number): string {
  return String(projectIndex + 1).padStart(3, "0")
}

export function mapProjectEntryToArchiveProjectCard(
  projectEntry: ProjectEntryArchiveRow,
  projectIndex: number,
): ArchiveProjectCard {
  return {
    id: projectEntry.id,
    sequenceLabel: buildArchiveProjectSequenceLabel(projectIndex),
    slug: projectEntry.slug,
    href: buildArchiveProjectHref(projectEntry),
    actionLabel: buildArchiveProjectActionLabel(projectEntry),
    year: projectEntry.year,
    title: projectEntry.title,
    description: projectEntry.description,
    typeLabel: projectTypeLabelMap[projectEntry.type],
    domainLabel: projectDomainLabelMap[projectEntry.domain],
    levelLabel: projectEntry.level
      ? projectLevelLabelMap[projectEntry.level]
      : "Undisclosed",
    technologyLabels: projectEntry.tech_stack,
    variant: buildArchiveProjectVariant(projectIndex),
  }
}
