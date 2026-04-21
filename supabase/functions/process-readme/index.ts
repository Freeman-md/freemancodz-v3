import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { callStructured } from "../_shared/openai.ts"
import { extractionInstructions } from "./config.ts"
import { pipelineSchema, type PipelineOutput } from "./schema.ts"

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
    pipeline = await callStructured({
      instructions: extractionInstructions,
      input: content,
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
