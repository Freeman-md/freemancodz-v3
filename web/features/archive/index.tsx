import { ArchiveFilterBar } from "@/features/archive/components/archive-filter-bar"
import { ArchiveIntroSection } from "@/features/archive/components/archive-intro-section"
import { ArchiveProjectGrid } from "@/features/archive/components/archive-project-grid"

export function ArchivePage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <ArchiveIntroSection />
      <ArchiveFilterBar />
      <ArchiveProjectGrid />
    </main>
  )
}
