import { Search } from "lucide-react"

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
      <p className="text-[0.64rem] font-medium tracking-[0.18em] text-white/72 uppercase">
        {label}
      </p>

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
  return (
    <section className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-14">
      <div className="grid gap-8 bg-[var(--color-surface-container)] px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
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

        <ArchiveFilterGroup
          label="Technology"
          options={technologyFilterOptions}
          selectedValue={selectedTechnology}
          onOptionSelect={onTechnologyChange}
          optionsClassName="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        />
      </div>
    </section>
  )
}
