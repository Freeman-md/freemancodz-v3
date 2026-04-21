import type { ArchivePageState } from "@/features/archive/types"

import { ArchiveClientPage } from "@/features/archive/components/archive-client-page"
import { ArchiveIntroSection } from "@/features/archive/components/archive-intro-section"

type ArchivePageProps = ArchivePageState

export function ArchivePage({ projects, errorMessage }: ArchivePageProps) {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <ArchiveIntroSection />
      <ArchiveClientPage projects={projects} errorMessage={errorMessage} />
    </main>
  )
}
