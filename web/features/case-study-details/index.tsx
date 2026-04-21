import { CaseStudyHeroSection } from "@/features/case-study-details/components/case-study-hero-section"
import { CaseStudySummarySection } from "@/features/case-study-details/components/case-study-summary-section"
import { CaseStudyBreakdownSection } from "@/features/case-study-details/components/case-study-breakdown-section"
import { CaseStudyImplementationSection } from "@/features/case-study-details/components/case-study-implementation-section"
import { CaseStudyLessonsSection } from "@/features/case-study-details/components/case-study-lessons-section"

export function CaseStudyDetailsPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <CaseStudyHeroSection />
      <CaseStudySummarySection />
      <CaseStudyBreakdownSection />
      <CaseStudyImplementationSection />
      <CaseStudyLessonsSection />
    </main>
  )
}
