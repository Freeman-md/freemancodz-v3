import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createAdminClient } from "../_shared/database.ts"
import { callStructured } from "../_shared/openai.ts"
import { extractionInstructions } from "./config.ts"
import { pipelineSchema, type PipelineOutput } from "./schema.ts"
import { saveExtractedProjectData, type SavedExtractionResult } from "./persistence.ts"

type RequestPayload = { source?: { content?: unknown } }

const jsonHeaders = { "Content-Type": "application/json" }

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

  const requestBody = payload as RequestPayload
  const readmeContent = typeof requestBody?.source?.content === "string"
    ? requestBody.source.content.trim()
    : ""

  if (!readmeContent) {
    return jsonResponse(
      { error: "source.content is required and must be a non-empty string" },
      400,
    )
  }

  let pipeline: PipelineOutput

  try {
    pipeline = await callStructured({
      instructions: extractionInstructions,
      input: readmeContent,
      schemaName: "project_extraction",
      schema: pipelineSchema,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return jsonResponse(
      { error: "Failed to extract project data from README", detail: message },
      502,
    )
  }

  let database: SavedExtractionResult

  try {
    const adminClient = createAdminClient()
    database = await saveExtractedProjectData(adminClient, pipeline)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return jsonResponse(
      { error: "Failed to save extracted project data", detail: message },
      500,
    )
  }

  return jsonResponse(
    {
      status: "accepted",
      message: "README content processed successfully",
      source: {
        content_length: readmeContent.length,
      },
      pipeline,
      database,
    },
    202,
  )
})
