import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CaseStudyDetailsPage } from "@/features/case-study-details"
import { getCaseStudyDetailsBySlug } from "@/features/case-study-details/service"

export default async function CaseStudyDetailsRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  noStore()

  const { slug } = await params

  const view = await getCaseStudyDetailsBySlug(slug)

  if (!view) {
    notFound()
  }

  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <CaseStudyDetailsPage view={view} />
      <SiteFooter />
    </>
  )
}
