import "server-only"

import { createClient } from "@supabase/supabase-js"

import { getServerSupabaseConfiguration } from "@/lib/supabase/environment"

export function createServerSupabaseClient() {
  const { url, serviceRoleKey } = getServerSupabaseConfiguration()

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
