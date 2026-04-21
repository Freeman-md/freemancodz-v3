import { caseStudySummaryCards } from "@/features/case-study-details/content"

export function CaseStudySummarySection() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 pb-18 sm:px-10 lg:px-14 lg:pb-24">
      <div className="grid gap-6 lg:grid-cols-3">
        {caseStudySummaryCards.map((summaryCard) => (
          <article
            key={summaryCard.label}
            className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7"
          >
            <p className="text-[0.6rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
              {summaryCard.label}
            </p>
            <h2 className="mt-4 max-w-[12ch] text-balance text-3xl font-extrabold leading-tight tracking-[-0.05em] text-white">
              {summaryCard.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/66">
              {summaryCard.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
