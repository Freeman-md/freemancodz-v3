import "server-only"

import { createClient } from "@supabase/supabase-js"

import { getServerSupabaseConfiguration } from "@/lib/supabase/environment"

export function createServerSupabaseClient() {
  const { url, publishableKey } = getServerSupabaseConfiguration()

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
