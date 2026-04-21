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

const projectEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
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
  content: z.string().nullable(),
  notes: z.string().nullable(),
}).strict()

const caseStudySchema = z.object({
  problem: z.string(),
  solution: z.string(),
  outcome: z.string().nullable(),
  content: z.string().nullable(),
}).strict()

export const pipelineSchema = z.object({
  project_entry: projectEntrySchema,
  case_study: caseStudySchema.nullable(),
}).strict()

export type PipelineOutput = z.infer<typeof pipelineSchema>
