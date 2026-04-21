import { CaseStudyHeroSection } from "@/features/case-study-details/components/case-study-hero-section"
import { CaseStudySummarySection } from "@/features/case-study-details/components/case-study-summary-section"
import { CaseStudyBreakdownSection } from "@/features/case-study-details/components/case-study-breakdown-section"
import { CaseStudyImplementationSection } from "@/features/case-study-details/components/case-study-implementation-section"
import { CaseStudyLessonsSection } from "@/features/case-study-details/components/case-study-lessons-section"
import type { CaseStudyDetailsView } from "@/features/case-study-details/types"

export function CaseStudyDetailsPage({ view }: { view: CaseStudyDetailsView }) {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <CaseStudyHeroSection
        title={view.title}
        description={view.description}
        year={view.year}
        repoUrl={view.repoUrl}
        liveUrl={view.liveUrl}
      />
      <CaseStudySummarySection
        problemTitle={view.problemTitle}
        problemDescription={view.problemDescription}
        solutionTitle={view.solutionTitle}
        solutionDescription={view.solutionDescription}
        outcomeTitle={view.outcomeTitle}
        outcomeDescription={view.outcomeDescription}
      />
      <CaseStudyBreakdownSection
        domainLabel={view.domainLabel}
        typeLabel={view.typeLabel}
        levelLabel={view.levelLabel}
        statusLabel={view.statusLabel}
        contextParagraphs={view.contextParagraphs}
        approachParagraphs={view.approachParagraphs}
        techStack={view.techStack}
        evidenceItems={view.evidenceItems}
      />
      <CaseStudyImplementationSection
        implementationParagraphs={view.implementationParagraphs}
      />
      <CaseStudyLessonsSection
        reinforcementParagraphs={view.reinforcementParagraphs}
        nextStepsParagraphs={view.nextStepsParagraphs}
      />
    </main>
  )
}
