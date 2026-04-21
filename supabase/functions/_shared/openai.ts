import { z } from "npm:zod@3.23.8"
import { zodToJsonSchema } from "npm:zod-to-json-schema@3.23.2"

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
const DEFAULT_MODEL = "gpt-5.4-nano"
export type StructuredRequest<T extends z.ZodTypeAny> = {
  instructions: string
  input: string
  schemaName: string
  schema: T
  model?: string
}

type ResponseContentItem = {
  type?: string
  text?: string
  refusal?: string
}

type ResponseOutputItem = {
  type?: string
  content?: ResponseContentItem[]
}

type ResponsesApiPayload = {
  output_text?: string
  output?: ResponseOutputItem[]
}

function extractOutputText(data: ResponsesApiPayload): string {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text
  }

  const messages = Array.isArray(data.output) ? data.output : []
  const textParts: string[] = []

  for (const message of messages) {
    const contentItems = Array.isArray(message.content) ? message.content : []

    for (const item of contentItems) {
      if (item.type === "refusal") {
        throw new Error(item.refusal || "OpenAI refused the request")
      }

      if (item.type === "output_text" && typeof item.text === "string") {
        textParts.push(item.text)
      }
    }
  }

  const text = textParts.join("").trim()

  if (!text) {
    throw new Error("OpenAI response did not contain structured output text")
  }

  return text
}

export async function callStructured<T extends z.ZodTypeAny>(
  request: StructuredRequest<T>,
): Promise<z.infer<T>> {
  const apiKey = Deno.env.get("OPENAI_API_KEY")

  if (!apiKey) {
    throw new Error("Missing required environment variable: OPENAI_API_KEY")
  }

  const jsonSchema = zodToJsonSchema(request.schema, {
    $refStrategy: "none",
  }) as Record<string, unknown>
  delete jsonSchema.$schema

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
          schema: jsonSchema,
          strict: true,
        },
      },
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenAI request failed: ${response.status} ${detail}`)
  }

  const data = await response.json() as ResponsesApiPayload
  const outputText = extractOutputText(data)

  let parsed: unknown
  try {
    parsed = JSON.parse(outputText)
  } catch {
    throw new Error("OpenAI response was not valid JSON")
  }

  const result = request.schema.safeParse(parsed)
  if (!result.success) {
    throw new Error(`OpenAI response did not match schema: ${result.error.message}`)
  }

  return result.data
}
