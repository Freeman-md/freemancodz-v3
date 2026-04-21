import { unstable_noStore as noStore } from "next/cache"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ArchivePage } from "@/features/archive"
import { getArchiveProjects } from "@/features/archive/service"

export default async function ArchiveRoutePage() {
  noStore()

  const archiveProjectsResult = await getArchiveProjects()

  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <ArchivePage
        projects={archiveProjectsResult.projects}
        errorMessage={archiveProjectsResult.errorMessage}
      />
      <SiteFooter />
    </>
  )
}
