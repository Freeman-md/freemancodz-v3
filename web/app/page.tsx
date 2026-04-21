import { LandingPage } from "@/features/landing"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <LandingPage />
      <SiteFooter />
    </>
  )
}
