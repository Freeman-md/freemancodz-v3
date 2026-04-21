import type { SupabaseClient } from "npm:@supabase/supabase-js@2"
import type {
  CaseStudy,
  PipelineOutput,
  ProjectEntry,
  ProjectEntryDetails,
} from "./schema.ts"

type SavedProjectEntryRow = Omit<ProjectEntry, "details"> & {
  id: string
  case_study_id: string | null
  updated_at: string
}

type SavedProjectEntryDetails = ProjectEntryDetails & {
  id: string
  project_entry_id: string
  updated_at: string
}

type SavedCaseStudy = CaseStudy & {
  id: string
  project_entry_id: string
  updated_at: string
}

export type SavedExtractionResult = {
  project_entry: SavedProjectEntryRow
  project_entry_details: SavedProjectEntryDetails | null
  case_study: SavedCaseStudy | null
}

type ProjectEntryWritePayload = Omit<
  SavedProjectEntryRow,
  "id" | "case_study_id"
>
type ProjectEntryDetailsWritePayload = Omit<
  SavedProjectEntryDetails,
  "id" | "project_entry_id"
>
type CaseStudyWritePayload = Omit<SavedCaseStudy, "id">

export async function saveExtractedProjectData(
  databaseClient: SupabaseClient,
  extractedData: PipelineOutput,
): Promise<SavedExtractionResult> {
  const extractedProjectEntry = extractedData.project_entry
  const extractedCaseStudy = extractedData.case_study

  const existingProjectEntry = await fetchProjectEntryBySlug(
    databaseClient,
    extractedProjectEntry.slug,
  )

  const shouldSaveCaseStudy =
    extractedProjectEntry.type === "case_study" && extractedCaseStudy !== null

  if (existingProjectEntry && !shouldSaveCaseStudy) {
    await removeLinkedCaseStudyIfPresent(
      databaseClient,
      existingProjectEntry.case_study_id,
    )
  }

  const savedProjectEntry = await saveProjectEntryRecord(
    databaseClient,
    existingProjectEntry,
    extractedProjectEntry,
  )

  const savedProjectEntryDetails = await syncProjectEntryDetailsRecord(
    databaseClient,
    savedProjectEntry.id,
    extractedProjectEntry.details,
  )

  if (!shouldSaveCaseStudy || extractedCaseStudy === null) {
    return {
      project_entry: savedProjectEntry,
      project_entry_details: savedProjectEntryDetails,
      case_study: null,
    }
  }

  const savedCaseStudy = await saveCaseStudyRecord(
    databaseClient,
    savedProjectEntry.id,
    extractedCaseStudy,
  )

  const linkedProjectEntry = savedProjectEntry.case_study_id === savedCaseStudy.id
    ? savedProjectEntry
    : await updateProjectEntryCaseStudyLink(
      databaseClient,
      savedProjectEntry.id,
      savedCaseStudy.id,
    )

  return {
    project_entry: linkedProjectEntry,
    project_entry_details: savedProjectEntryDetails,
    case_study: savedCaseStudy,
  }
}

async function fetchProjectEntryBySlug(
  databaseClient: SupabaseClient,
  projectSlug: string,
): Promise<SavedProjectEntryRow | null> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .select("*")
    .eq("slug", projectSlug)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch project entry by slug: ${error.message}`)
  }

  return data as SavedProjectEntryRow | null
}

async function saveProjectEntryRecord(
  databaseClient: SupabaseClient,
  existingProjectEntry: SavedProjectEntryRow | null,
  extractedProjectEntry: ProjectEntry,
): Promise<SavedProjectEntryRow> {
  const projectEntryWritePayload = createProjectEntryWritePayload(
    extractedProjectEntry,
  )

  if (!existingProjectEntry) {
    return insertProjectEntry(databaseClient, projectEntryWritePayload)
  }

  return updateProjectEntry(
    databaseClient,
    existingProjectEntry.id,
    projectEntryWritePayload,
  )
}

function createProjectEntryWritePayload(
  extractedProjectEntry: ProjectEntry,
): ProjectEntryWritePayload {
  return {
    slug: extractedProjectEntry.slug,
    title: extractedProjectEntry.title,
    description: extractedProjectEntry.description,
    year: extractedProjectEntry.year,
    type: extractedProjectEntry.type,
    domain: extractedProjectEntry.domain,
    status: extractedProjectEntry.status,
    tech_stack: extractedProjectEntry.tech_stack,
    level: extractedProjectEntry.level,
    repo_url: extractedProjectEntry.repo_url,
    live_url: extractedProjectEntry.live_url,
    thumbnail_url: extractedProjectEntry.thumbnail_url,
    featured: extractedProjectEntry.featured,
    summary: extractedProjectEntry.summary,
    updated_at: createTimestamp(),
  }
}

async function insertProjectEntry(
  databaseClient: SupabaseClient,
  projectEntryWritePayload: ProjectEntryWritePayload,
): Promise<SavedProjectEntryRow> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .insert(projectEntryWritePayload)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to insert project entry: ${error.message}`)
  }

  return data as SavedProjectEntryRow
}

async function updateProjectEntry(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  projectEntryWritePayload: ProjectEntryWritePayload,
): Promise<SavedProjectEntryRow> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .update(projectEntryWritePayload)
    .eq("id", projectEntryId)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update project entry: ${error.message}`)
  }

  return data as SavedProjectEntryRow
}

async function syncProjectEntryDetailsRecord(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  extractedProjectEntryDetails: ProjectEntryDetails | null,
): Promise<SavedProjectEntryDetails | null> {
  const existingProjectEntryDetails = await fetchProjectEntryDetailsByProjectEntryId(
    databaseClient,
    projectEntryId,
  )

  if (!extractedProjectEntryDetails) {
    if (existingProjectEntryDetails) {
      await deleteProjectEntryDetails(databaseClient, existingProjectEntryDetails.id)
    }

    return null
  }

  const projectEntryDetailsWritePayload = createProjectEntryDetailsWritePayload(
    extractedProjectEntryDetails,
  )

  if (!existingProjectEntryDetails) {
    return insertProjectEntryDetails(
      databaseClient,
      projectEntryId,
      projectEntryDetailsWritePayload,
    )
  }

  return updateProjectEntryDetails(
    databaseClient,
    existingProjectEntryDetails.id,
    projectEntryDetailsWritePayload,
  )
}

async function fetchProjectEntryDetailsByProjectEntryId(
  databaseClient: SupabaseClient,
  projectEntryId: string,
): Promise<SavedProjectEntryDetails | null> {
  const { data, error } = await databaseClient
    .from("project_entry_details")
    .select("*")
    .eq("project_entry_id", projectEntryId)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Failed to fetch project entry details by project entry id: ${error.message}`,
    )
  }

  return data as SavedProjectEntryDetails | null
}

function createProjectEntryDetailsWritePayload(
  extractedProjectEntryDetails: ProjectEntryDetails,
): ProjectEntryDetailsWritePayload {
  return {
    system_snapshot_title: extractedProjectEntryDetails.system_snapshot_title,
    system_snapshot_items: extractedProjectEntryDetails.system_snapshot_items,
    design_focus_items: extractedProjectEntryDetails.design_focus_items,
    context_text: extractedProjectEntryDetails.context_text,
    innovation_text: extractedProjectEntryDetails.innovation_text,
    implementation_text: extractedProjectEntryDetails.implementation_text,
    latency_profile_title: extractedProjectEntryDetails.latency_profile_title,
    latency_profile_content: extractedProjectEntryDetails.latency_profile_content,
    system_focus_title: extractedProjectEntryDetails.system_focus_title,
    system_focus_content: extractedProjectEntryDetails.system_focus_content,
    outcomes_text: extractedProjectEntryDetails.outcomes_text,
    why_this_matters: extractedProjectEntryDetails.why_this_matters,
    updated_at: createTimestamp(),
  }
}

async function insertProjectEntryDetails(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  projectEntryDetailsWritePayload: ProjectEntryDetailsWritePayload,
): Promise<SavedProjectEntryDetails> {
  const { data, error } = await databaseClient
    .from("project_entry_details")
    .insert({
      project_entry_id: projectEntryId,
      ...projectEntryDetailsWritePayload,
    })
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to insert project entry details: ${error.message}`)
  }

  return data as SavedProjectEntryDetails
}

async function updateProjectEntryDetails(
  databaseClient: SupabaseClient,
  projectEntryDetailsId: string,
  projectEntryDetailsWritePayload: ProjectEntryDetailsWritePayload,
): Promise<SavedProjectEntryDetails> {
  const { data, error } = await databaseClient
    .from("project_entry_details")
    .update(projectEntryDetailsWritePayload)
    .eq("id", projectEntryDetailsId)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update project entry details: ${error.message}`)
  }

  return data as SavedProjectEntryDetails
}

async function deleteProjectEntryDetails(
  databaseClient: SupabaseClient,
  projectEntryDetailsId: string,
): Promise<void> {
  const { error } = await databaseClient
    .from("project_entry_details")
    .delete()
    .eq("id", projectEntryDetailsId)

  if (error) {
    throw new Error(`Failed to delete project entry details: ${error.message}`)
  }
}

async function saveCaseStudyRecord(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  extractedCaseStudy: CaseStudy,
): Promise<SavedCaseStudy> {
  const existingCaseStudy = await fetchCaseStudyByProjectEntryId(
    databaseClient,
    projectEntryId,
  )
  const caseStudyWritePayload = createCaseStudyWritePayload(
    projectEntryId,
    extractedCaseStudy,
  )

  if (!existingCaseStudy) {
    return insertCaseStudy(databaseClient, caseStudyWritePayload)
  }

  return updateCaseStudy(
    databaseClient,
    existingCaseStudy.id,
    caseStudyWritePayload,
  )
}

async function fetchCaseStudyByProjectEntryId(
  databaseClient: SupabaseClient,
  projectEntryId: string,
): Promise<SavedCaseStudy | null> {
  const { data, error } = await databaseClient
    .from("case_studies")
    .select("*")
    .eq("project_entry_id", projectEntryId)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch case study by project entry id: ${error.message}`)
  }

  return data as SavedCaseStudy | null
}

function createCaseStudyWritePayload(
  projectEntryId: string,
  extractedCaseStudy: CaseStudy,
): CaseStudyWritePayload {
  return {
    project_entry_id: projectEntryId,
    problem: extractedCaseStudy.problem,
    solution: extractedCaseStudy.solution,
    outcome: extractedCaseStudy.outcome,
    content: extractedCaseStudy.content,
    updated_at: createTimestamp(),
  }
}

async function insertCaseStudy(
  databaseClient: SupabaseClient,
  caseStudyWritePayload: CaseStudyWritePayload,
): Promise<SavedCaseStudy> {
  const { data, error } = await databaseClient
    .from("case_studies")
    .insert(caseStudyWritePayload)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to insert case study: ${error.message}`)
  }

  return data as SavedCaseStudy
}

async function updateCaseStudy(
  databaseClient: SupabaseClient,
  caseStudyId: string,
  caseStudyWritePayload: CaseStudyWritePayload,
): Promise<SavedCaseStudy> {
  const { data, error } = await databaseClient
    .from("case_studies")
    .update(caseStudyWritePayload)
    .eq("id", caseStudyId)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update case study: ${error.message}`)
  }

  return data as SavedCaseStudy
}

async function updateProjectEntryCaseStudyLink(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  caseStudyId: string,
): Promise<SavedProjectEntryRow> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .update({
      case_study_id: caseStudyId,
      updated_at: createTimestamp(),
    })
    .eq("id", projectEntryId)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update project entry case study link: ${error.message}`)
  }

  return data as SavedProjectEntryRow
}

async function removeLinkedCaseStudyIfPresent(
  databaseClient: SupabaseClient,
  caseStudyId: string | null,
): Promise<void> {
  if (!caseStudyId) {
    return
  }

  const { error } = await databaseClient
    .from("case_studies")
    .delete()
    .eq("id", caseStudyId)

  if (error) {
    throw new Error(`Failed to remove linked case study: ${error.message}`)
  }
}

function createTimestamp(): string {
  return new Date().toISOString()
}
