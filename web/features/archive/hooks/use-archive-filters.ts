"use client"

import { useDeferredValue, useState } from "react"

import type { ArchiveFilterOption, ArchiveProjectCard } from "@/features/archive/types"

const allFilterValue = "all"

function buildFilterOptions(optionLabels: string[]): ArchiveFilterOption[] {
  const uniqueOptionLabels = [...new Set(optionLabels)].sort((left, right) =>
    left.localeCompare(right),
  )

  return [
    {
      label: "All",
      value: allFilterValue,
    },
    ...uniqueOptionLabels.map((optionLabel) => ({
      label: optionLabel,
      value: optionLabel,
    })),
  ]
}

function matchesSearchQuery(
  archiveProject: ArchiveProjectCard,
  normalizedSearchQuery: string,
): boolean {
  if (!normalizedSearchQuery) {
    return true
  }

  const searchableValues = [
    archiveProject.title,
    archiveProject.description,
    archiveProject.typeLabel,
    archiveProject.domainLabel,
    archiveProject.levelLabel,
    ...archiveProject.technologyLabels,
  ]

  return searchableValues.some((searchableValue) =>
    searchableValue.toLowerCase().includes(normalizedSearchQuery),
  )
}

function filterProjects({
  projects,
  selectedDomain,
  selectedTechnology,
  searchQuery,
}: {
  projects: ArchiveProjectCard[]
  selectedDomain: string
  selectedTechnology: string
  searchQuery: string
}): ArchiveProjectCard[] {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  return projects.filter((archiveProject) => {
    const matchesSelectedDomain =
      selectedDomain === allFilterValue ||
      archiveProject.domainLabel === selectedDomain

    const matchesSelectedTechnology =
      selectedTechnology === allFilterValue ||
      archiveProject.technologyLabels.includes(selectedTechnology)

    return (
      matchesSelectedDomain &&
      matchesSelectedTechnology &&
      matchesSearchQuery(archiveProject, normalizedSearchQuery)
    )
  })
}

export function useArchiveFilters(projects: ArchiveProjectCard[]) {
  const [selectedDomain, setSelectedDomain] = useState(allFilterValue)
  const [selectedTechnology, setSelectedTechnology] = useState(allFilterValue)
  const [searchQuery, setSearchQuery] = useState("")
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const domainFilterOptions = buildFilterOptions(
    projects.map((project) => project.domainLabel),
  )
  const technologyFilterOptions = buildFilterOptions(
    projects.flatMap((project) => project.technologyLabels),
  )
  const filteredProjects = filterProjects({
    projects,
    selectedDomain,
    selectedTechnology,
    searchQuery: deferredSearchQuery,
  })

  return {
    filteredProjects,
    domainFilterOptions,
    technologyFilterOptions,
    selectedDomain,
    selectedTechnology,
    searchQuery,
    setSelectedDomain,
    setSelectedTechnology,
    setSearchQuery,
    hasActiveFilters:
      selectedDomain !== allFilterValue ||
      selectedTechnology !== allFilterValue ||
      Boolean(searchQuery.trim()),
  }
}
