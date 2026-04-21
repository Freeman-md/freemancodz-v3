import type { SupabaseClient } from "npm:@supabase/supabase-js@2"
import type { PipelineOutput } from "./schema.ts"

type ExtractedProjectEntry = PipelineOutput["project_entry"]
type ExtractedCaseStudy = NonNullable<PipelineOutput["case_study"]>

export type SavedProjectEntry = ExtractedProjectEntry & {
  id: string
  case_study_id: string | null
  updated_at: string
}

export type SavedCaseStudy = ExtractedCaseStudy & {
  id: string
  project_entry_id: string
  updated_at: string
}

export type SavedExtractionResult = {
  project_entry: SavedProjectEntry
  case_study: SavedCaseStudy | null
}

type ProjectEntryWritePayload = Omit<SavedProjectEntry, "id" | "case_study_id">
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
    await removeLinkedCaseStudyIfPresent(databaseClient, existingProjectEntry.case_study_id)
  }

  const savedProjectEntry = await saveProjectEntry(
    databaseClient,
    existingProjectEntry,
    extractedProjectEntry,
  )

  if (!shouldSaveCaseStudy || extractedCaseStudy === null) {
    return {
      project_entry: savedProjectEntry,
      case_study: null,
    }
  }

  const savedCaseStudy = await saveCaseStudy(
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
    case_study: savedCaseStudy,
  }
}

async function fetchProjectEntryBySlug(
  databaseClient: SupabaseClient,
  slug: string,
): Promise<SavedProjectEntry | null> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch project entry by slug: ${error.message}`)
  }

  return data as SavedProjectEntry | null
}

async function saveProjectEntry(
  databaseClient: SupabaseClient,
  existingProjectEntry: SavedProjectEntry | null,
  extractedProjectEntry: ExtractedProjectEntry,
): Promise<SavedProjectEntry> {
  const projectEntryWritePayload = createProjectEntryWritePayload(extractedProjectEntry)

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
  extractedProjectEntry: ExtractedProjectEntry,
): ProjectEntryWritePayload {
  return {
    slug: extractedProjectEntry.slug,
    title: extractedProjectEntry.title,
    description: extractedProjectEntry.description,
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
    content: extractedProjectEntry.content,
    notes: extractedProjectEntry.notes,
    updated_at: createTimestamp(),
  }
}

async function insertProjectEntry(
  databaseClient: SupabaseClient,
  projectEntryWritePayload: ProjectEntryWritePayload,
): Promise<SavedProjectEntry> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .insert(projectEntryWritePayload)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to insert project entry: ${error.message}`)
  }

  return data as SavedProjectEntry
}

async function updateProjectEntry(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  projectEntryWritePayload: ProjectEntryWritePayload,
): Promise<SavedProjectEntry> {
  const { data, error } = await databaseClient
    .from("project_entries")
    .update(projectEntryWritePayload)
    .eq("id", projectEntryId)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update project entry: ${error.message}`)
  }

  return data as SavedProjectEntry
}

async function saveCaseStudy(
  databaseClient: SupabaseClient,
  projectEntryId: string,
  extractedCaseStudy: ExtractedCaseStudy,
): Promise<SavedCaseStudy> {
  const existingCaseStudy = await fetchCaseStudyByProjectEntryId(databaseClient, projectEntryId)
  const caseStudyWritePayload = createCaseStudyWritePayload(projectEntryId, extractedCaseStudy)

  if (!existingCaseStudy) {
    return insertCaseStudy(databaseClient, caseStudyWritePayload)
  }

  return updateCaseStudy(databaseClient, existingCaseStudy.id, caseStudyWritePayload)
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
  extractedCaseStudy: ExtractedCaseStudy,
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
): Promise<SavedProjectEntry> {
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

  return data as SavedProjectEntry
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
