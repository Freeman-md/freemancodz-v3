import { ContactSection } from "@/features/landing/components/contact-section"
import { CoreProtocolSection } from "@/features/landing/components/core-protocol-section"
import { HeroSection } from "@/features/landing/components/hero-section"
import { SelectedWorksSection } from "@/features/landing/components/selected-works-section"
import { TechnicalInventorySection } from "@/features/landing/components/technical-inventory-section"

export function LandingPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <HeroSection />
      <CoreProtocolSection />
      <SelectedWorksSection />
      <TechnicalInventorySection />
      <ContactSection />
    </main>
  )
}
