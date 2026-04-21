import { archiveProjects } from "@/features/archive/content"
import { ArchiveProjectCard } from "@/features/archive/components/archive-project-card"

export function ArchiveProjectGrid() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-2">
        {archiveProjects.map((projectCard) => (
          <ArchiveProjectCard
            key={projectCard.id}
            projectCard={projectCard}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          className="bg-[var(--color-surface-container)] px-10 py-5 text-[0.72rem] font-medium tracking-[0.16em] text-white uppercase transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
        >
          Load remaining
        </button>
      </div>
    </section>
  )
}
