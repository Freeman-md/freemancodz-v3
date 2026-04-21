import { ArchiveProjectCard } from "@/features/archive/components/archive-project-card"
import type { ArchiveProjectCard as ArchiveProjectCardType } from "@/features/archive/types"

type ArchiveProjectGridProps = {
  projects: ArchiveProjectCardType[]
  totalProjectCount: number
  errorMessage: string | null
  hasActiveFilters: boolean
}

export function ArchiveProjectGrid({
  projects,
  totalProjectCount,
  errorMessage,
  hasActiveFilters,
}: ArchiveProjectGridProps) {
  const showEmptyState = projects.length === 0 && !errorMessage

  return (
    <section className="mx-auto max-w-[90rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      {errorMessage ? (
        <div className="mb-8 border border-white/10 bg-[var(--color-surface-container)] px-6 py-5 text-sm leading-7 text-white/72">
          Failed to load the live archive. {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((projectCard) => (
          <ArchiveProjectCard
            key={projectCard.id}
            projectCard={projectCard}
          />
        ))}
      </div>

      {showEmptyState ? (
        <div className="mt-12 border border-white/10 bg-[var(--color-surface-container)] px-6 py-10 text-center">
          <p className="text-lg font-medium text-white">
            No archive entries matched the current filters.
          </p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            {hasActiveFilters
              ? "Adjust the search query or active filters to broaden the result set."
              : "The archive is wired correctly, but there are no project entries available yet."}
          </p>
        </div>
      ) : null}

      {!errorMessage && totalProjectCount > 0 ? (
        <div className="mt-10 flex justify-end">
          <p className="text-[0.7rem] tracking-[0.18em] text-white/42 uppercase">
            Showing {projects.length} of {totalProjectCount}
          </p>
        </div>
      ) : null}
    </section>
  )
}
