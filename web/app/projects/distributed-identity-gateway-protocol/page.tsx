import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ProjectDetailsPage } from "@/features/project-details"

export default function DistributedIdentityGatewayProtocolPage() {
  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <ProjectDetailsPage />
      <SiteFooter />
    </>
  )
}
