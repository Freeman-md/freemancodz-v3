import "server-only"

import { mapToProjectDetailsView } from "@/features/project-details/mapper"
import type {
  ProjectDetailsView,
  ProjectEntryDetailsRow,
  ProjectEntryRow,
} from "@/features/project-details/types"
import { createServerSupabaseClient } from "@/lib/supabase/server-client"

const PROJECT_ENTRY_FIELDS =
  "id, slug, title, description, year, type, domain, status, level, tech_stack, repo_url, live_url, thumbnail_url, featured, summary"

const PROJECT_ENTRY_DETAILS_FIELDS =
  "system_snapshot_title, system_snapshot_items, design_focus_items, context_text, innovation_text, implementation_text, latency_profile_title, latency_profile_content, system_focus_title, system_focus_content, outcomes_text, why_this_matters"

export async function getProjectDetailsBySlug(
  slug: string,
): Promise<ProjectDetailsView | null> {
  const supabase = createServerSupabaseClient()

  const { data: entryData, error: entryError } = await supabase
    .from("project_entries")
    .select(PROJECT_ENTRY_FIELDS)
    .eq("slug", slug)
    .single()

  if (entryError) {
    if (entryError.code === "PGRST116") return null
    throw new Error(`Failed to fetch project entry: ${entryError.message}`)
  }

  if (!entryData) return null

  const { data: detailsData, error: detailsError } = await supabase
    .from("project_entry_details")
    .select(PROJECT_ENTRY_DETAILS_FIELDS)
    .eq("project_entry_id", entryData.id)
    .maybeSingle()

  if (detailsError) {
    throw new Error(
      `Failed to fetch project entry details: ${detailsError.message}`,
    )
  }

  const entry = entryData satisfies ProjectEntryRow
  const details = (detailsData satisfies ProjectEntryDetailsRow | null) ?? null

  return mapToProjectDetailsView(entry, details)
}
