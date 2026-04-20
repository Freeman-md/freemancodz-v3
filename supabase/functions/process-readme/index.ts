import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { callStructured } from "../_shared/openai.ts"

type RequestPayload = { source?: { content?: unknown } }

type ProjectEntry = {
  slug: string
  title: string
  description: string
  type: "project" | "case_study" | "experiment" | "system"
  domain: "ai" | "blockchain" | "backend" | "automation" | "frontend" | "full_stack" | "tooling" | "other"
  status: "draft" | "published" | "archived"
  tech_stack: string[]
  level: "beginner" | "intermediate" | "advanced" | null
  repo_url: string | null
  live_url: string | null
  thumbnail_url: string | null
  featured: boolean
  summary: string | null
  content: string | null
  notes: string | null
}

type CaseStudy = {
  problem: string
  solution: string
  outcome: string | null
  content: string | null
}

type PipelineOutput = {
  project_entry: ProjectEntry
  case_study: CaseStudy | null
}

const jsonHeaders = { "Content-Type": "application/json" }

const ENTRY_TYPES = ["project", "case_study", "experiment", "system"]
const DOMAINS = ["ai", "blockchain", "backend", "automation", "frontend", "full_stack", "tooling", "other"]
const STATUSES = ["draft", "published", "archived"]
const LEVELS = ["beginner", "intermediate", "advanced"]

const extractionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    project_entry: {
      type: "object",
      additionalProperties: false,
      properties: {
        slug: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        type: { type: "string", enum: ENTRY_TYPES },
        domain: { type: "string", enum: DOMAINS },
        status: { type: "string", enum: STATUSES },
        tech_stack: { type: "array", items: { type: "string" } },
        level: { type: ["string", "null"], enum: [...LEVELS, null] },
        repo_url: { type: ["string", "null"] },
        live_url: { type: ["string", "null"] },
        thumbnail_url: { type: ["string", "null"] },
        featured: { type: "boolean" },
        summary: { type: ["string", "null"] },
        content: { type: ["string", "null"] },
        notes: { type: ["string", "null"] },
      },
      required: [
        "slug",
        "title",
        "description",
        "type",
        "domain",
        "status",
        "tech_stack",
        "level",
        "repo_url",
        "live_url",
        "thumbnail_url",
        "featured",
        "summary",
        "content",
        "notes",
      ],
    },
    case_study: {
      type: ["object", "null"],
      additionalProperties: false,
      properties: {
        problem: { type: "string" },
        solution: { type: "string" },
        outcome: { type: ["string", "null"] },
        content: { type: ["string", "null"] },
      },
      required: ["problem", "solution", "outcome", "content"],
    },
  },
  required: ["project_entry", "case_study"],
}

const extractionInstructions = [
  "You extract structured project metadata from a README file.",
  "Decide the entry type (project, case_study, experiment, or system) based on the content.",
  "Populate every project_entry field. Use null for URLs that are not present.",
  "Derive a URL-friendly slug from the title. Keep tech_stack focused on concrete tools and frameworks.",
  "If the entry type is case_study, also populate the case_study object with problem, solution, and outcome drawn from the README.",
  "Otherwise set case_study to null.",
].join(" ")

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  })
}

Deno.serve(async (req) => {
  let payload: unknown

  try {
    payload = await req.json()
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON" }, 400)
  }

  const body = payload as RequestPayload
  const content = typeof body?.source?.content === "string" ? body.source.content.trim() : ""

  if (!content) {
    return jsonResponse(
      { error: "source.content is required and must be a non-empty string" },
      400,
    )
  }

  let pipeline: PipelineOutput

  try {
    pipeline = await callStructured<PipelineOutput>({
      instructions: extractionInstructions,
      input: content,
      schemaName: "project_extraction",
      schema: extractionSchema,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return jsonResponse(
      { error: "Failed to extract project data from README", detail: message },
      502,
    )
  }

  return jsonResponse(
    {
      status: "accepted",
      message: "README content processed successfully",
      source: {
        content_length: content.length,
      },
      pipeline,
    },
    202,
  )
})
