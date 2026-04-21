import { selectedWorks } from "@/features/landing/content"
import { WorkPreviewPanel } from "@/features/landing/components/work-preview-panel"

export function SelectedWorksSection() {
  return (
    <section id="selected-works" className="py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-14">
        <div className="space-y-3">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Built systems
          </p>
          <h2 className="text-4xl font-extrabold tracking-[-0.05em] text-white sm:text-5xl">
            Selected Works.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
          {selectedWorks.map((selectedWork) => (
            <WorkPreviewPanel
              key={selectedWork.title}
              selectedWork={selectedWork}
            />
          ))}
        </div>

        <div className="mt-10 flex">
          <a
            href="/archive"
            className="inline-flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] text-white/68 uppercase transition-colors duration-200 hover:text-white"
          >
            <span>View Archive</span>
            <span className="h-px w-10 bg-[var(--color-primary)]" />
          </a>
        </div>
      </div>
    </section>
  )
}
