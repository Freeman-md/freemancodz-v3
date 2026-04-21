import "server-only"

import { mapProjectEntryToFeaturedWorkPanel } from "@/features/landing/mapper"
import type {
  FeaturedWorksState,
  ProjectEntryFeaturedRow,
} from "@/features/landing/types"
import { getErrorMessage } from "@/lib/errors"
import { createServerSupabaseClient } from "@/lib/supabase/server-client"

const FEATURED_WORKS_LIMIT = 2

export async function getFeaturedWorks(): Promise<FeaturedWorksState> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("project_entries")
      .select("id, slug, title, description, type, domain, tech_stack")
      .eq("featured", true)
      .order("year", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false })
      .limit(FEATURED_WORKS_LIMIT)

    if (error) {
      throw new Error(`Failed to fetch featured works: ${error.message}`)
    }

    const featuredWorks = (data satisfies ProjectEntryFeaturedRow[]).map(
      mapProjectEntryToFeaturedWorkPanel,
    )

    return {
      works: featuredWorks,
      errorMessage: null,
    }
  } catch (error) {
    return {
      works: [],
      errorMessage: getErrorMessage(error),
    }
  }
}
