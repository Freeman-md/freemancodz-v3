import type {
  ArchiveFilterGroup,
  ArchiveProjectCard,
} from "@/features/archive/types"

export const archiveIntroContent = {
  eyebrow: "Index",
  title: "Projects Archive",
  description:
    "A comprehensive catalog of systems, automation workflows, AI-enabled tools, and backend platforms. This archive traces the technical direction behind the work, the tooling involved, and the operational constraints each system was designed to handle.",
}

export const archiveFilterGroups: ArchiveFilterGroup[] = [
  {
    label: "Domain",
    options: ["All", "AI", "Automation", "Backend", "Systems"],
  },
  {
    label: "Technology",
    options: ["All", "TypeScript", "Python", "Supabase", "OpenAI"],
  },
]

export const archiveProjects: ArchiveProjectCard[] = [
  {
    id: "001",
    year: "2026",
    title: "Contract Clause Extractor",
    description:
      "End-to-end NLP extraction pipeline for contract documents, focused on payment terms and limitation of liability clauses with structured downstream output.",
    type: "AI workflow",
    domain: "AI",
    level: "Prototype",
    tags: ["Python", "OpenAI", "Pandas"],
    variant: "half",
  },
  {
    id: "002",
    year: "2026",
    title: "LinkedIn Profile Snapshot",
    description:
      "Browser-side capture workflow for extracting visible LinkedIn profile details and normalizing the output into a reusable snapshot.",
    type: "Automation Tool",
    domain: "Automation",
    level: "Production",
    tags: ["TypeScript", "Chrome Extension"],
    variant: "half",
  },
  {
    id: "003",
    year: "2026",
    title: "n8n Job Search Engine",
    description:
      "State-driven job-search automation pipeline with scoring, enrichment, routing, and downstream tailoring workflows.",
    type: "Automation System",
    domain: "Automation",
    level: "Beta",
    tags: ["Python", "n8n", "Workflow Orchestration"],
    variant: "full",
  },
  {
    id: "004",
    year: "2026",
    title: "Internal Ops Automation",
    description:
      "Operational automation system for structuring internal processes, routing work, and reducing coordination overhead.",
    type: "Internal Platform",
    domain: "Systems",
    level: "Active",
    tags: ["TypeScript", "Automation", "Ops"],
    variant: "half",
  },
  {
    id: "005",
    year: "2026",
    title: "OpSense",
    description:
      "Typed operations surface for internal process visibility, system structure, and execution-oriented workflow management.",
    type: "Backend Product",
    domain: "Backend",
    level: "Production",
    tags: ["TypeScript", "Next.js", "Supabase"],
    variant: "half",
  },
]
