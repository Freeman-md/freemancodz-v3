import "jsr:@supabase/functions-js/edge-runtime.d.ts"

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

  const content = typeof (payload as { source?: { content?: unknown } })?.source?.content === "string"
    ? (payload as { source?: { content?: string } }).source?.content?.trim()
    : ""

  if (!content) {
    return jsonResponse(
      { error: "source.content is required and must be a non-empty string" },
      400,
    )
  }

  return jsonResponse(
    {
      status: "accepted",
      message: "README content accepted for processing",
      source: {
        content_length: content.length,
      },
    },
    202,
  )
})
