import {
  Bot,
  GitBranch,
  Server,
  Workflow,
} from "lucide-react"

import type {
  CapabilityCard,
  ContactLink,
  SelectedWork,
} from "@/features/landing/types"

export const heroContent = {
  eyebrow: "Systems Engineer",
  title: {
    leading: "Designing scalable systems",
    emphasisOne: "across AI, automation,",
    emphasisTwo: "and distributed architecture.",
  },
  description:
    "I design and build production-ready systems: APIs, workflows, automation layers, and distributed components that hold up under real load, real users, and real edge cases.",
  primaryAction: {
    label: "View selected work",
    href: "#selected-works",
  },
  secondaryAction: {
    label: "Read core protocol",
    href: "#core-protocol",
  },
}

export const coreProtocolContent = {
  eyebrow: "Operating Principles",
  title: "Core Protocol.",
  paragraphs: [
    "Most software works in demos. It breaks under real users, real load, and real edge cases. That is where system design matters. I focus on structuring systems properly from the start, handling failure and state cleanly, and building things that do not fall apart in production.",
    "AI has made building faster, but speed without structure creates fragile systems. I use AI as leverage to execute faster, not to replace engineering judgment. The pattern stays the same across domains: understand the problem, design the system, build it, then refine it against reality.",
  ],
}

export const capabilityCards: CapabilityCard[] = [
  {
    title: "Systems Design",
    description:
      "Designing scalable application architecture with clear failure boundaries, retries, and resilient state handling.",
    icon: GitBranch,
  },
  {
    title: "AI Systems",
    description:
      "Shipping AI-powered workflows with structured outputs, processing pipelines, and practical reliability constraints.",
    icon: Bot,
  },
  {
    title: "Automation Workflows",
    description:
      "Building lead capture, follow-up, and internal operations workflows that reduce admin and improve throughput.",
    icon: Workflow,
  },
  {
    title: "Backend Services",
    description:
      "Implementing APIs, processing services, and distributed components that keep operating when the happy path disappears.",
    icon: Server,
  },
]

export const selectedWorks: SelectedWork[] = [
  {
    title: "Contract Clause Extractor",
    description:
      "End-to-end NLP workflow for extracting payment terms and limitation of liability clauses from contract documents into a structured review pipeline.",
    tags: ["Python", "OpenAI API", "Pandas"],
    variant: "wide",
    eyebrow: "Automation system",
    actionLabel: "Inspect repository",
    href: "https://github.com/Freeman-md/cst4012-contract-extraction",
  },
  {
    title: "Internal Ops Automation",
    description:
      "Operational automation surface for routing internal work, standardizing flows, and removing repetitive coordination overhead.",
    tags: ["TypeScript", "Automation"],
    variant: "stacked",
    eyebrow: "Workflow platform",
    actionLabel: "Open project log",
    href: "https://github.com/Freeman-md/internal-ops-automation",
  },
]

export const technicalInventory = [
  "TypeScript",
  "Python",
  "Solidity",
  "Next.js",
  "Supabase",
  "OpenAI",
  "n8n",
  "PostgreSQL",
  "Docker",
  "Azure",
]

export const contactContent = {
  eyebrow: "Contact",
  title: "Initialize Communication.",
  description:
    "Open to software engineering roles, AI and systems-focused opportunities, and building real-world systems that drive measurable outcomes.",
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email Direct",
    href: "mailto:freemanmadudili@gmail.com",
  },
  {
    label: "GitHub Log",
    href: "https://github.com/Freeman-md",
  },
  {
    label: "Website",
    href: "https://freemanmadudili.com",
  },
]
