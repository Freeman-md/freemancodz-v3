import "server-only"

export type ServerSupabaseConfiguration = {
  url: string
  publishableKey: string
}

function requireEnvironmentVariable(variableName: string): string {
  const variableValue = process.env[variableName]

  console.log(variableValue)

  if (!variableValue) {
    throw new Error(`Missing required environment variable: ${variableName}`)
  }

  return variableValue
}

export function getServerSupabaseConfiguration(): ServerSupabaseConfiguration {
  return {
    url:
      requireEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: requireEnvironmentVariable(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ),
  }
}
