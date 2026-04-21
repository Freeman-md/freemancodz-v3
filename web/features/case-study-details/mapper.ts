import type {
  CaseStudyDetailsView,
  CaseStudyProjectEntryRow,
  CaseStudyRow,
} from "@/features/case-study-details/types"

const domainLabelMap: Record<CaseStudyProjectEntryRow["domain"], string> = {
  ai: "AI",
  blockchain: "Blockchain",
  backend: "Backend",
  automation: "Automation",
  frontend: "Frontend",
  full_stack: "Full Stack",
  tooling: "Tooling",
  other: "Other",
}

const typeLabelMap: Record<CaseStudyProjectEntryRow["type"], string> = {
  project: "Project",
  case_study: "Case Study",
  experiment: "Experiment",
  system: "System",
}

const statusLabelMap: Record<CaseStudyProjectEntryRow["status"], string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
}

const levelLabelMap: Record<Exclude<CaseStudyProjectEntryRow["level"], null>, string> =
  {
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

export function mapCaseStudyDetailsToView(
  entry: CaseStudyProjectEntryRow,
  caseStudy: CaseStudyRow | null,
): CaseStudyDetailsView {
  return {
    title: entry.title,
    description: entry.description,
    year: entry.year,
    repoUrl: entry.repo_url,
    liveUrl: entry.live_url,
    domainLabel: domainLabelMap[entry.domain],
    typeLabel: typeLabelMap[entry.type],
    levelLabel: entry.level ? levelLabelMap[entry.level] : "Unavailable",
    statusLabel: statusLabelMap[entry.status],
    techStack: entry.tech_stack,
    problemTitle: caseStudy?.problem_title ?? null,
    problemDescription: caseStudy?.problem_description ?? null,
    solutionTitle: caseStudy?.solution_title ?? null,
    solutionDescription: caseStudy?.solution_description ?? null,
    outcomeTitle: caseStudy?.outcome_title ?? null,
    outcomeDescription: caseStudy?.outcome_description ?? null,
    contextParagraphs: splitIntoParagraphs(caseStudy?.context_body ?? null),
    approachParagraphs: splitIntoParagraphs(caseStudy?.approach_body ?? null),
    evidenceItems: caseStudy?.evidence_items ?? [],
    implementationParagraphs: splitIntoParagraphs(
      caseStudy?.implementation_details ?? null,
    ),
    reinforcementParagraphs: splitIntoParagraphs(
      caseStudy?.reinforcement_text ?? null,
    ),
    nextStepsParagraphs: splitIntoParagraphs(caseStudy?.next_steps ?? null),
  }
}
