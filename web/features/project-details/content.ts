import type { ProjectDetailsRecord } from "@/features/project-details/types"

export const projectDetailsRecord: ProjectDetailsRecord = {
  title: "Distributed Identity Gateway Protocol",
  description:
    "A zero-trust gateway architecture for federating identity across distributed services without relying on centralized bottlenecks or brittle coordination paths.",
  year: "2026",
  type: "system",
  domain: "backend",
  level: "advanced",
  repo_url: "https://github.com/Freeman-md/internal-ops-automation",
  live_url: "https://freemanmadudili.com",
  tech_stack: [
    "TypeScript",
    "Supabase",
    "OpenAI",
    "PostgreSQL",
    "Docker",
    "n8n",
  ],
  details: {
    system_snapshot_title: "Trust boundaries stay explicit under distributed load.",
    system_snapshot_items: [
      "Gateway decision boundary",
      "Policy routing layer",
      "Stateful workflow execution",
      "Retry policy",
      "State ledger",
      "Service adapters",
    ],
    design_focus_items: [
      "Decision routing at the gateway boundary",
      "Explicit retry and state transition handling",
      "Policy-aware orchestration across distributed services",
    ],
    context_text:
      "Most identity systems still centralize trust, state, or verification flow in ways that create operational choke points. The challenge here was to model a gateway that could coordinate authentication and routing decisions without collapsing under service coupling or retry storms.\n\nThe system needed to make failure an expected part of the design. That meant explicit handling for retries, state transitions, event ordering, and degraded execution paths instead of relying on optimistic assumptions.",
    innovation_text:
      "The system is designed as a decision boundary rather than a thin transport layer: requests are classified, routed, retried, and persisted through explicit workflow steps so the architecture remains inspectable under pressure.",
    implementation_text:
      "The implementation combines typed service boundaries, structured workflow orchestration, and persistence layers that make system state observable instead of implicit. The emphasis is reliability and debuggability over magical throughput claims.\n\nEach stage is modeled as a system responsibility rather than a hidden side effect, which keeps operational decisions traceable when the architecture is under pressure.",
    latency_profile_title: "Sub-second",
    latency_profile_content:
      "Operational decision overhead stays low by keeping workflow state explicit and localized.",
    system_focus_title: "High reliability",
    system_focus_content:
      "Built around failure handling, retries, and predictable state transitions rather than optimistic paths.",
    outcomes_text:
      "The result is a system design pattern that can support AI-driven workflows, internal operations, and distributed service coordination without turning complexity into hidden coupling.\n\nFuture iterations would deepen observability, strengthen policy-driven routing, and make the operational state model reusable across more workflow classes.",
    why_this_matters:
      "The project demonstrates how AI-oriented workflows can be designed with production discipline instead of demo-grade assumptions.\n\nIt stays aligned with the broader portfolio direction: designing systems that handle load, failure, retries, and distributed state without turning operational complexity into guesswork.",
  },
}
