import { ProjectDetailsHeroSection } from "@/features/project-details/components/project-details-hero-section"
import { ProjectDetailsOverviewSection } from "@/features/project-details/components/project-details-overview-section"
import { ProjectDetailsImplementationSection } from "@/features/project-details/components/project-details-implementation-section"
import { ProjectDetailsOutcomesSection } from "@/features/project-details/components/project-details-outcomes-section"

export function ProjectDetailsPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <ProjectDetailsHeroSection />
      <ProjectDetailsOverviewSection />
      <ProjectDetailsImplementationSection />
      <ProjectDetailsOutcomesSection />
    </main>
  )
}
