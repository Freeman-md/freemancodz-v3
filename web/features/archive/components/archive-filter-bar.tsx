"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

import type { ArchiveFilterOption } from "@/features/archive/types"

type ArchiveFilterBarProps = {
  domainFilterOptions: ArchiveFilterOption[]
  technologyFilterOptions: ArchiveFilterOption[]
  selectedDomain: string
  selectedTechnology: string
  searchQuery: string
  onDomainChange: (value: string) => void
  onTechnologyChange: (value: string) => void
  onSearchQueryChange: (value: string) => void
}

function ArchiveFilterGroup({
  label,
  options,
  selectedValue,
  onOptionSelect,
  optionsClassName = "flex flex-wrap gap-2",
}: {
  label: string
  options: ArchiveFilterOption[]
  selectedValue: string
  onOptionSelect: (value: string) => void
  optionsClassName?: string
}) {
  return (
    <div className="space-y-4">
      {label ? (
        <p className="text-[0.64rem] font-medium tracking-[0.18em] text-white/72 uppercase">
          {label}
        </p>
      ) : null}

      <div className={optionsClassName}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onOptionSelect(option.value)}
              className={
                isSelected
                  ? "bg-[var(--color-surface-container-highest)] px-4 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-white uppercase"
                  : "bg-[var(--color-surface-low)] px-4 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-white/72 uppercase transition-colors duration-200 hover:text-white"
              }
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ArchiveFilterBar({
  domainFilterOptions,
  technologyFilterOptions,
  selectedDomain,
  selectedTechnology,
  searchQuery,
  onDomainChange,
  onTechnologyChange,
  onSearchQueryChange,
}: ArchiveFilterBarProps) {
  const shouldCollapseTechnologyFilters = technologyFilterOptions.length > 12
  const [isTechnologyExpanded, setIsTechnologyExpanded] = useState(false)
  const showTechnologyFilters =
    !shouldCollapseTechnologyFilters || isTechnologyExpanded

  return (
    <section className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-14">
      <div className="grid gap-8 bg-[var(--color-surface-container)] px-6 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ArchiveFilterGroup
            label="Domain"
            options={domainFilterOptions}
            selectedValue={selectedDomain}
            onOptionSelect={onDomainChange}
          />

          <ArchiveFilterGroup
            label="Technology"
            options={technologyFilterOptions}
            selectedValue={selectedTechnology}
            onOptionSelect={onTechnologyChange}
          />
        </div>

        <div className="flex items-end">
          <label className="flex w-full items-center gap-3 border-b border-white/24 pb-3 text-white/50">
            <Search className="size-4" strokeWidth={1.5} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search archive..."
              className="w-full bg-transparent text-sm tracking-[0.01em] text-white placeholder:text-white/40 focus:outline-none"
            />
          </label>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.64rem] font-medium tracking-[0.18em] text-white/72 uppercase">
              Technology
            </p>

            {shouldCollapseTechnologyFilters ? (
              <button
                type="button"
                onClick={() =>
                  setIsTechnologyExpanded((currentValue) => !currentValue)
                }
                className="inline-flex items-center gap-2 text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase transition-colors duration-200 hover:text-white"
              >
                {isTechnologyExpanded ? "Hide filters" : "Show filters"}
                <ChevronDown
                  className={
                    isTechnologyExpanded
                      ? "size-3.5 rotate-180 transition-transform duration-200"
                      : "size-3.5 transition-transform duration-200"
                  }
                  strokeWidth={1.5}
                />
              </button>
            ) : null}
          </div>

          {showTechnologyFilters ? (
            <ArchiveFilterGroup
              label=""
              options={technologyFilterOptions}
              selectedValue={selectedTechnology}
              onOptionSelect={onTechnologyChange}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
