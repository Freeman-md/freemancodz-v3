import { unstable_noStore as noStore } from "next/cache"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { LandingPage } from "@/features/landing"
import { getFeaturedWorks } from "@/features/landing/service"

export default async function HomePage() {
  noStore()

  const featuredWorksResult = await getFeaturedWorks()

  return (
    <>
      <SiteHeader activeNavigationItem="about" />
      <LandingPage
        featuredWorks={featuredWorksResult.works}
        featuredWorksErrorMessage={featuredWorksResult.errorMessage}
      />
      <SiteFooter />
    </>
  )
}
