type SummaryCard = {
  label: "Problem" | "Solution" | "Outcome"
  title: string | null
  description: string | null
}

export function CaseStudySummarySection({
  problemTitle,
  problemDescription,
  solutionTitle,
  solutionDescription,
  outcomeTitle,
  outcomeDescription,
}: {
  problemTitle: string | null
  problemDescription: string | null
  solutionTitle: string | null
  solutionDescription: string | null
  outcomeTitle: string | null
  outcomeDescription: string | null
}) {
  const summaryCards: SummaryCard[] = [
    {
      label: "Problem",
      title: problemTitle,
      description: problemDescription,
    },
    {
      label: "Solution",
      title: solutionTitle,
      description: solutionDescription,
    },
    {
      label: "Outcome",
      title: outcomeTitle,
      description: outcomeDescription,
    },
  ]

  return (
    <section className="mx-auto max-w-[90rem] px-6 pb-18 sm:px-10 lg:px-14 lg:pb-24">
      <div className="grid gap-6 lg:grid-cols-3">
        {summaryCards.map((summaryCard) => (
          <article
            key={summaryCard.label}
            className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7"
          >
            <p className="text-[0.6rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
              {summaryCard.label}
            </p>
            <h2 className="mt-4 max-w-[12ch] text-balance text-3xl font-extrabold leading-tight tracking-[-0.05em] text-white">
              {summaryCard.title ?? `${summaryCard.label} details unavailable`}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/66">
              {summaryCard.description ??
                "This section has not been published yet."}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
