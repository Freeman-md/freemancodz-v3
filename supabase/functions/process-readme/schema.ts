import { z } from "npm:zod@3.23.8"

const entryType = z.enum(["project", "case_study", "experiment", "system"])
const domain = z.enum([
  "ai",
  "blockchain",
  "backend",
  "automation",
  "frontend",
  "full_stack",
  "tooling",
  "other",
])
const status = z.enum(["draft", "published", "archived"])
const level = z.enum(["beginner", "intermediate", "advanced"])

const projectEntryDetailsSchema = z.object({
  system_snapshot_title: z.string().nullable(),
  system_snapshot_items: z.array(z.string()),
  design_focus_items: z.array(z.string()),
  context_text: z.string().nullable(),
  innovation_text: z.string().nullable(),
  implementation_text: z.string().nullable(),
  latency_profile_title: z.string().nullable(),
  latency_profile_content: z.string().nullable(),
  system_focus_title: z.string().nullable(),
  system_focus_content: z.string().nullable(),
  outcomes_text: z.string().nullable(),
  why_this_matters: z.string().nullable(),
}).strict()

const projectEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  year: z.string().nullable(),
  type: entryType,
  domain: domain,
  status: status,
  tech_stack: z.array(z.string()),
  level: level.nullable(),
  repo_url: z.string().nullable(),
  live_url: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  featured: z.boolean(),
  summary: z.string().nullable(),
  details: projectEntryDetailsSchema.nullable(),
}).strict()

const caseStudySchema = z.object({
  problem_title: z.string(),
  problem_description: z.string(),
  solution_title: z.string(),
  solution_description: z.string(),
  outcome_title: z.string().nullable(),
  outcome_description: z.string().nullable(),
  context_body: z.string().nullable(),
  approach_body: z.string().nullable(),
  evidence_items: z.array(z.string()),
  implementation_details: z.string().nullable(),
  reinforcement_text: z.string().nullable(),
  next_steps: z.string().nullable(),
}).strict()

export const pipelineSchema = z.object({
  project_entry: projectEntrySchema,
  case_study: caseStudySchema.nullable(),
}).strict()

export type ProjectEntry = z.infer<typeof projectEntrySchema>
export type ProjectEntryDetails = z.infer<typeof projectEntryDetailsSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type PipelineOutput = z.infer<typeof pipelineSchema>
