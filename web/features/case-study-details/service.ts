import "server-only"

import { mapCaseStudyDetailsToView } from "@/features/case-study-details/mapper"
import type {
  CaseStudyDetailsView,
  CaseStudyProjectEntryRow,
  CaseStudyRow,
} from "@/features/case-study-details/types"
import { getErrorMessage } from "@/lib/errors"
import { createServerSupabaseClient } from "@/lib/supabase/server-client"

const PROJECT_ENTRY_FIELDS =
  "id, slug, title, description, year, type, domain, status, level, tech_stack, repo_url, live_url, thumbnail_url, featured, summary, case_study_id"

const CASE_STUDY_FIELDS =
  "project_entry_id, problem_title, problem_description, solution_title, solution_description, outcome_title, outcome_description, context_body, approach_body, evidence_items, implementation_details, reinforcement_text, next_steps"

export async function getCaseStudyDetailsBySlug(
  slug: string,
): Promise<CaseStudyDetailsView | null> {
  try {
    const supabase = createServerSupabaseClient()

    const { data: entryData, error: entryError } = await supabase
      .from("project_entries")
      .select(PROJECT_ENTRY_FIELDS)
      .eq("slug", slug)
      .maybeSingle()

    if (entryError) {
      throw new Error(`Failed to fetch case study entry`)
    }

    if (!entryData) {
      return null
    }

    const entry = entryData satisfies CaseStudyProjectEntryRow

    if (entry.type !== "case_study" || !entry.case_study_id) {
      return null
    }

    const { data: caseStudyData, error: caseStudyError } = await supabase
      .from("case_studies")
      .select(CASE_STUDY_FIELDS)
      .eq("project_entry_id", entry.id)
      .maybeSingle()

    if (caseStudyError) {
      throw new Error(
        `Failed to fetch case study details: ${caseStudyError.message}`,
      )
    }

    const caseStudy =
      (caseStudyData satisfies CaseStudyRow | null) ?? null

    return mapCaseStudyDetailsToView(entry, caseStudy)
  } catch (error) {
    throw new Error(
      `Failed to load case study details: ${getErrorMessage(error)}`,
    )
  }
}
