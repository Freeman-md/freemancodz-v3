import { outcomesSection } from "@/features/project-details/content"

export function ProjectDetailsOutcomesSection() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-18 sm:px-10 lg:px-14 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <div className="space-y-8">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Outcomes
          </p>
          <div className="max-w-[46rem] space-y-5">
            <h2 className="max-w-[13ch] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem]">
              {outcomesSection.title}
            </h2>
            {outcomesSection.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-white/68">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
          <p className="text-[0.62rem] font-medium tracking-[0.18em] text-white/44 uppercase">
            Why this matters
          </p>
          <div className="mt-6 space-y-5 text-sm leading-7 text-white/68">
            <p>
              The project demonstrates how AI-oriented workflows can be designed
              with production discipline instead of demo-grade assumptions.
            </p>
            <p>
              It stays aligned with the broader portfolio direction: designing
              systems that handle load, failure, retries, and distributed state
              without turning operational complexity into guesswork.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
