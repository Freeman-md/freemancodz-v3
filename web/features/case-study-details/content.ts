import type { CaseStudyRecord } from "@/features/case-study-details/types"

export const caseStudyRecord: CaseStudyRecord = {
  title: "Contract Clause Extractor",
  description:
    "A local-first document analysis workflow designed to reduce repetitive contract review by extracting payment terms and limitation of liability clauses into structured output.",
  year: "2026",
  domain: "automation",
  type: "case_study",
  level: "intermediate",
  status: "draft",
  repo_url: "https://github.com/Freeman-md/cst4012-contract-extraction",
  live_url: null,
  tech_stack: [
    "Python",
    "OpenAI API",
    "Pandas",
    "pdfplumber",
    "python-docx",
  ],
  problem_title: "Manual clause review wastes time",
  problem_description:
    "Reviewing large batches of contracts for just a few clauses created repetitive reading, inconsistent extraction, and no structured data for comparison.",
  solution_title: "A focused extraction pipeline",
  solution_description:
    "The workflow ingests folders of contract files, extracts raw text, identifies target clauses, and exports normalized CSV rows for downstream review.",
  outcome_title: "Faster review with reusable output",
  outcome_description:
    "The result is a working prototype that surfaces the relevant clause data upfront and turns repeated review into a structured process.",
  context_body:
    "Manual contract review becomes slow and repetitive when the real need is not full legal analysis, but targeted verification of a small number of high-value clauses across many documents.\n\nIn this case, the recurring requirement was to find payment terms and limitation of liability clauses across `.pdf`, `.docx`, and plain text contracts without turning every review pass into the same manual search exercise.",
  approach_body:
    "The workflow was designed as a four-stage pipeline: ingest files from a target folder, extract raw document text, identify the target clauses, and export the results into a structured CSV for review.\n\nThe architecture had to handle messy formatting, inconsistent headings, and phrasing variation across contract templates. That meant the extraction layer had to be both flexible enough for natural language variation and structured enough to produce reliable downstream output.",
  evidence_items: [
    "Batch processing across `.pdf`, `.docx`, and plain text files",
    "CSV output containing extracted clause text, confidence, and ambiguity notes",
    "Local-first setup for faster testing and iteration",
  ],
  implementation_details:
    "The pipeline focuses on turning a narrow but repetitive review task into a structured operational flow. Each document produces a normalized row with the file name, extracted clause text, confidence, and notes when clauses are missing or ambiguous.\n\nThe system deliberately optimizes for usefulness over interface complexity. CSV output was chosen because it gave the fastest path to a reviewer-friendly format that can be filtered, compared, and iterated on immediately.",
  reinforcement_text:
    "Useful automation does not need a giant interface to be valuable. A narrow workflow with clear inputs, a strong extraction step, and structured output can remove a lot of repetitive work.\n\nIt also reinforced that AI extraction works best when paired with strong output constraints instead of being treated like a free-form text generator.",
  next_steps:
    "The next iterations would expand support for more contract clause categories, introduce a lightweight review interface for low-confidence results, and move persistence from CSV into a proper data layer.",
}
