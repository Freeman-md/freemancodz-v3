import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const jsonHeaders = { "Content-Type": "application/json" }

Deno.serve(() => {
  return new Response(
    JSON.stringify({
      error: "process-readme is scaffolded but not implemented yet",
    }),
    {
      status: 501,
      headers: jsonHeaders,
    },
  )
})
