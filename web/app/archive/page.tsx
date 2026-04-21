import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ArchivePage } from "@/features/archive"

export default function ArchiveRoutePage() {
  return (
    <>
      <SiteHeader activeNavigationItem="projects" />
      <ArchivePage />
      <SiteFooter />
    </>
  )
}
