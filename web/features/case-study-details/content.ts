import type {
  CaseStudyAction,
  CaseStudyMetadataItem,
  CaseStudyNarrativeSection,
  CaseStudySummaryCard,
} from "@/features/case-study-details/types"

export const caseStudyHeroContent = {
  eyebrow: "Case study",
  year: "2026",
  title: "Contract Clause Extractor",
  description:
    "A local-first document analysis workflow designed to reduce repetitive contract review by extracting payment terms and limitation of liability clauses into structured output.",
  repositoryLink: {
    label: "View repository",
    href: "https://github.com/Freeman-md/cst4012-contract-extraction",
  } satisfies CaseStudyAction,
  archiveLink: {
    label: "View archive",
    href: "/archive",
  } satisfies CaseStudyAction,
}

export const caseStudyMetadata: CaseStudyMetadataItem[] = [
  { label: "Domain", value: "Automation" },
  { label: "Type", value: "Case Study" },
  { label: "Level", value: "Intermediate" },
  { label: "Status", value: "Draft" },
]

export const caseStudyTechnologyStack = [
  "Python",
  "OpenAI API",
  "Pandas",
  "pdfplumber",
  "python-docx",
]

export const caseStudySummaryCards: CaseStudySummaryCard[] = [
  {
    label: "Problem",
    title: "Manual clause review wastes time",
    description:
      "Reviewing large batches of contracts for just a few clauses created repetitive reading, inconsistent extraction, and no structured data for comparison.",
  },
  {
    label: "Solution",
    title: "A focused extraction pipeline",
    description:
      "The workflow ingests folders of contract files, extracts raw text, identifies target clauses, and exports normalized CSV rows for downstream review.",
  },
  {
    label: "Outcome",
    title: "Faster review with reusable output",
    description:
      "The result is a working prototype that surfaces the relevant clause data upfront and turns repeated review into a structured process.",
  },
]

export const caseStudyContextSection: CaseStudyNarrativeSection = {
  title: "Why this problem mattered",
  paragraphs: [
    "Manual contract review becomes slow and repetitive when the real need is not full legal analysis, but targeted verification of a small number of high-value clauses across many documents.",
    "In this case, the recurring requirement was to find payment terms and limitation of liability clauses across `.pdf`, `.docx`, and plain text contracts without turning every review pass into the same manual search exercise.",
  ],
}

export const caseStudyApproachSection: CaseStudyNarrativeSection = {
  title: "How the system was structured",
  paragraphs: [
    "The workflow was designed as a four-stage pipeline: ingest files from a target folder, extract raw document text, identify the target clauses, and export the results into a structured CSV for review.",
    "The architecture had to handle messy formatting, inconsistent headings, and phrasing variation across contract templates. That meant the extraction layer had to be both flexible enough for natural language variation and structured enough to produce reliable downstream output.",
  ],
}

export const caseStudyEvidenceItems = [
  "Batch processing across `.pdf`, `.docx`, and plain text files",
  "CSV output containing extracted clause text, confidence, and ambiguity notes",
  "Local-first setup for faster testing and iteration",
]

export const caseStudyImplementationSection: CaseStudyNarrativeSection = {
  title: "Implementation details",
  paragraphs: [
    "The pipeline focuses on turning a narrow but repetitive review task into a structured operational flow. Each document produces a normalized row with the file name, extracted clause text, confidence, and notes when clauses are missing or ambiguous.",
    "The system deliberately optimizes for usefulness over interface complexity. CSV output was chosen because it gave the fastest path to a reviewer-friendly format that can be filtered, compared, and iterated on immediately.",
  ],
}

export const caseStudyLessonsSection: CaseStudyNarrativeSection = {
  title: "What this case study reinforced",
  paragraphs: [
    "Useful automation does not need a giant interface to be valuable. A narrow workflow with clear inputs, a strong extraction step, and structured output can remove a lot of repetitive work.",
    "It also reinforced that AI extraction works best when paired with strong output constraints instead of being treated like a free-form text generator.",
  ],
}

export const caseStudyNextStepsSection: CaseStudyNarrativeSection = {
  title: "Next steps",
  paragraphs: [
    "The next iterations would expand support for more contract clause categories, introduce a lightweight review interface for low-confidence results, and move persistence from CSV into a proper data layer.",
  ],
}
