import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ProjectDetailsPage } from "@/features/project-details"
import { getProjectDetailsBySlug } from "@/features/project-details/service"

export default async function ProjectDetailsRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  noStore()

  const { slug } = await params

  const view = await getProjectDetailsBySlug(slug)

  if (!view) {
    notFound()
  }

  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <ProjectDetailsPage view={view} />
      <SiteFooter />
    </>
  )
}
