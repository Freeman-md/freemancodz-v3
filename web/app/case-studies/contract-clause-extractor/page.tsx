import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CaseStudyDetailsPage } from "@/features/case-study-details"

export default function ContractClauseExtractorCaseStudyPage() {
  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <CaseStudyDetailsPage />
      <SiteFooter />
    </>
  )
}
