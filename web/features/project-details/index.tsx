import { ProjectDetailsHeroSection } from "@/features/project-details/components/project-details-hero-section"
import { ProjectDetailsImplementationSection } from "@/features/project-details/components/project-details-implementation-section"
import { ProjectDetailsOutcomesSection } from "@/features/project-details/components/project-details-outcomes-section"
import { ProjectDetailsOverviewSection } from "@/features/project-details/components/project-details-overview-section"
import type { ProjectDetailsView } from "@/features/project-details/types"

export function ProjectDetailsPage({ view }: { view: ProjectDetailsView }) {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <ProjectDetailsHeroSection
        title={view.title}
        description={view.description}
        year={view.year}
        repoUrl={view.repoUrl}
        liveUrl={view.liveUrl}
      />
      <ProjectDetailsOverviewSection
        domainLabel={view.domainLabel}
        typeLabel={view.typeLabel}
        levelLabel={view.levelLabel}
        techStack={view.techStack}
        innovationText={view.innovationText}
        contextParagraphs={view.contextParagraphs}
        systemSnapshotTitle={view.systemSnapshotTitle}
        systemSnapshotItems={view.systemSnapshotItems}
        designFocusItems={view.designFocusItems}
      />
      <ProjectDetailsImplementationSection
        implementationParagraphs={view.implementationParagraphs}
        latencyProfileTitle={view.latencyProfileTitle}
        latencyProfileContent={view.latencyProfileContent}
        systemFocusTitle={view.systemFocusTitle}
        systemFocusContent={view.systemFocusContent}
      />
      <ProjectDetailsOutcomesSection
        outcomesParagraphs={view.outcomesParagraphs}
        whyThisMattersParagraphs={view.whyThisMattersParagraphs}
      />
    </main>
  )
}
