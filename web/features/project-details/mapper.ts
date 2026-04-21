import type {
  ProjectDetailsView,
  ProjectEntryDetailsRow,
  ProjectEntryRow,
} from "@/features/project-details/types"

const domainLabelMap: Record<ProjectEntryRow["domain"], string> = {
  ai: "AI",
  blockchain: "Blockchain",
  backend: "Backend",
  automation: "Automation",
  frontend: "Frontend",
  full_stack: "Full Stack",
  tooling: "Tooling",
  other: "Other",
}

const typeLabelMap: Record<ProjectEntryRow["type"], string> = {
  project: "Project",
  case_study: "Case Study",
  experiment: "Experiment",
  system: "System",
}

const levelLabelMap: Record<Exclude<ProjectEntryRow["level"], null>, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
}

function splitIntoParagraphs(text: string | null): string[] {
  if (!text) return []
  return text
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function mapToProjectDetailsView(
  entry: ProjectEntryRow,
  details: ProjectEntryDetailsRow | null,
): ProjectDetailsView {
  return {
    title: entry.title,
    description: entry.description,
    year: entry.year,
    repoUrl: entry.repo_url,
    liveUrl: entry.live_url,
    techStack: entry.tech_stack,
    domainLabel: domainLabelMap[entry.domain],
    typeLabel: typeLabelMap[entry.type],
    levelLabel: entry.level ? levelLabelMap[entry.level] : "Undisclosed",
    systemSnapshotTitle: details?.system_snapshot_title ?? null,
    systemSnapshotItems: details?.system_snapshot_items ?? [],
    designFocusItems: details?.design_focus_items ?? [],
    contextParagraphs: splitIntoParagraphs(details?.context_text ?? null),
    innovationText: details?.innovation_text ?? null,
    implementationParagraphs: splitIntoParagraphs(
      details?.implementation_text ?? null,
    ),
    latencyProfileTitle: details?.latency_profile_title ?? null,
    latencyProfileContent: details?.latency_profile_content ?? null,
    systemFocusTitle: details?.system_focus_title ?? null,
    systemFocusContent: details?.system_focus_content ?? null,
    outcomesParagraphs: splitIntoParagraphs(details?.outcomes_text ?? null),
    whyThisMattersParagraphs: splitIntoParagraphs(
      details?.why_this_matters ?? null,
    ),
  }
}
