import type {
  ProjectDetailsAction,
  ProjectMetric,
  ProjectNarrativeSection,
  ProjectParameter,
} from "@/features/project-details/types"

export const projectDetailsHeroContent = {
  eyebrow: "System architecture",
  year: "2026",
  title: "Distributed Identity Gateway Protocol",
  description:
    "A zero-trust gateway architecture for federating identity across distributed services without relying on centralized bottlenecks or brittle coordination paths.",
  repositoryLink: {
    label: "View repository",
    href: "https://github.com/Freeman-md/internal-ops-automation",
  } satisfies ProjectDetailsAction,
  deploymentLink: {
    label: "Live deployment",
    href: "https://freemanmadudili.com",
  } satisfies ProjectDetailsAction,
}

export const projectParameters: ProjectParameter[] = [
  { label: "Domain", value: "Security & Authentication" },
  { label: "Type", value: "Distributed Protocol" },
  { label: "Complexity Level", value: "Advanced" },
]

export const projectTechStack = [
  "TypeScript",
  "Supabase",
  "OpenAI",
  "PostgreSQL",
  "Docker",
  "n8n",
]

export const systemSnapshotItems = [
  "Decision routing at the gateway boundary",
  "Explicit retry and state transition handling",
  "Policy-aware orchestration across distributed services",
]

export const challengeSection: ProjectNarrativeSection = {
  title: "The Architectural Challenge",
  paragraphs: [
    "Most identity systems still centralize trust, state, or verification flow in ways that create operational choke points. The challenge here was to model a gateway that could coordinate authentication and routing decisions without collapsing under service coupling or retry storms.",
    "The system needed to make failure an expected part of the design. That meant explicit handling for retries, state transitions, event ordering, and degraded execution paths instead of relying on optimistic assumptions.",
  ],
}

export const innovationCard = {
  title: "Core Innovation",
  description:
    "The system is designed as a decision boundary rather than a thin transport layer: requests are classified, routed, retried, and persisted through explicit workflow steps so the architecture remains inspectable under pressure.",
}

export const implementationSection: ProjectNarrativeSection = {
  title: "Implementation Details",
  paragraphs: [
    "The implementation combines typed service boundaries, structured workflow orchestration, and persistence layers that make system state observable instead of implicit. The emphasis is reliability and debuggability over magical throughput claims.",
    "Each stage is modeled as a system responsibility rather than a hidden side effect, which keeps operational decisions traceable when the architecture is under pressure.",
  ],
}

export const projectMetrics: ProjectMetric[] = [
  {
    label: "Latency profile",
    value: "Sub-second",
    description:
      "Operational decision overhead stays low by keeping workflow state explicit and localized.",
  },
  {
    label: "System focus",
    value: "High reliability",
    description:
      "Built around failure handling, retries, and predictable state transitions rather than optimistic paths.",
  },
]

export const outcomesSection: ProjectNarrativeSection = {
  title: "Outcomes & Future Iterations",
  paragraphs: [
    "The result is a system design pattern that can support AI-driven workflows, internal operations, and distributed service coordination without turning complexity into hidden coupling.",
    "Future iterations would deepen observability, strengthen policy-driven routing, and make the operational state model reusable across more workflow classes.",
  ],
}
