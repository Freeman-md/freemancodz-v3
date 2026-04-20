const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
const DEFAULT_MODEL = "gpt-5.4-nano"

export type StructuredRequest = {
  instructions: string
  input: string
  schemaName: string
  schema: Record<string, unknown>
  model?: string
}

export async function callStructured<T>(request: StructuredRequest): Promise<T> {
  const apiKey = Deno.env.get("OPENAI_API_KEY")

  if (!apiKey) {
    throw new Error("Missing required environment variable: OPENAI_API_KEY")
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: request.model ?? DEFAULT_MODEL,
      instructions: request.instructions,
      input: request.input,
      text: {
        format: {
          type: "json_schema",
          name: request.schemaName,
          schema: request.schema,
          strict: true,
        },
      },
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenAI request failed: ${response.status} ${detail}`)
  }

  const data = await response.json() as { output_text?: string }

  if (!data.output_text) {
    throw new Error("OpenAI response did not contain output_text")
  }

  try {
    return JSON.parse(data.output_text) as T
  } catch {
    throw new Error("OpenAI response was not valid JSON")
  }
}
