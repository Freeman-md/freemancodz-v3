import { Search } from "lucide-react"

import { archiveFilterGroups } from "@/features/archive/content"

export function ArchiveFilterBar() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-14">
      <div className="grid gap-10 bg-[var(--color-surface-container)] px-6 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {archiveFilterGroups.map((filterGroup) => (
            <div key={filterGroup.label} className="space-y-4">
              <p className="text-[0.64rem] font-medium tracking-[0.18em] text-white/72 uppercase">
                {filterGroup.label}
              </p>

              <div className="flex flex-wrap gap-2">
                {filterGroup.options.map((optionLabel, optionIndex) => {
                  const isActiveOption = optionIndex === 0

                  return (
                    <button
                      key={optionLabel}
                      type="button"
                      className={
                        isActiveOption
                          ? "bg-[var(--color-surface-container-highest)] px-4 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-white uppercase"
                          : "bg-[var(--color-surface-low)] px-4 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-white/72 uppercase transition-colors duration-200 hover:text-white"
                      }
                    >
                      {optionLabel}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end">
          <div className="flex w-full items-center gap-3 border-b border-white/24 pb-3 text-white/50">
            <Search className="size-4" strokeWidth={1.5} />
            <span className="text-sm tracking-[0.01em]">
              Search archive...
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
