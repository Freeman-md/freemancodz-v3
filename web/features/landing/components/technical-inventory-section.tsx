import { technicalInventory } from "@/features/landing/content"

export function TechnicalInventorySection() {
  return (
    <section
      id="technical-inventory"
      className="bg-[var(--color-surface-low)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-14">
        <div className="space-y-3">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Toolchain
          </p>
          <h2 className="text-4xl font-extrabold tracking-[-0.05em] text-white sm:text-5xl">
            Technical Inventory.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {technicalInventory.map((technologyName) => (
            <span
              key={technologyName}
              className="bg-[var(--color-surface-container-highest)] px-4 py-3 text-[0.62rem] font-medium tracking-[0.18em] text-white/74 uppercase"
            >
              {technologyName}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
