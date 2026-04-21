import "server-only"

import type { ArchivePageState, ProjectEntryArchiveRow } from "@/features/archive/types"
import { mapProjectEntryToArchiveProjectCard } from "@/features/archive/mapper"
import { getErrorMessage } from "@/lib/errors"
import { createServerSupabaseClient } from "@/lib/supabase/server-client"

export async function getArchiveProjects(): Promise<ArchivePageState> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("project_entries")
      .select(
        "id, slug, title, description, year, type, domain, level, tech_stack, featured, updated_at",
      )
      .order("featured", { ascending: false })
      .order("year", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch archive projects: ${error.message}`)
    }

    const archiveProjects = (data satisfies ProjectEntryArchiveRow[]).map(
      mapProjectEntryToArchiveProjectCard,
    )

    return {
      projects: archiveProjects,
      errorMessage: null,
    }
  } catch (error) {
    return {
      projects: [],
      errorMessage: getErrorMessage(error),
    }
  }
}
