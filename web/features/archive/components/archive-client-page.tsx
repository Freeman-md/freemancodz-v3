"use client"

import { ArchiveFilterBar } from "@/features/archive/components/archive-filter-bar"
import { ArchiveProjectGrid } from "@/features/archive/components/archive-project-grid"
import { useArchiveFilters } from "@/features/archive/hooks/use-archive-filters"
import type { ArchivePageState } from "@/features/archive/types"

export function ArchiveClientPage({
  projects,
  errorMessage,
}: ArchivePageState) {
  const archiveFilters = useArchiveFilters(projects)

  return (
    <>
      <ArchiveFilterBar
        domainFilterOptions={archiveFilters.domainFilterOptions}
        technologyFilterOptions={archiveFilters.technologyFilterOptions}
        selectedDomain={archiveFilters.selectedDomain}
        selectedTechnology={archiveFilters.selectedTechnology}
        searchQuery={archiveFilters.searchQuery}
        onDomainChange={archiveFilters.setSelectedDomain}
        onTechnologyChange={archiveFilters.setSelectedTechnology}
        onSearchQueryChange={archiveFilters.setSearchQuery}
      />

      <ArchiveProjectGrid
        projects={archiveFilters.filteredProjects}
        totalProjectCount={projects.length}
        errorMessage={errorMessage}
        hasActiveFilters={archiveFilters.hasActiveFilters}
      />
    </>
  )
}
