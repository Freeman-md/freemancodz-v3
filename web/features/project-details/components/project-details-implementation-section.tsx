export function ProjectDetailsImplementationSection({
  implementationParagraphs,
  latencyProfileTitle,
  latencyProfileContent,
  systemFocusTitle,
  systemFocusContent,
}: {
  implementationParagraphs: string[]
  latencyProfileTitle: string | null
  latencyProfileContent: string | null
  systemFocusTitle: string | null
  systemFocusContent: string | null
}) {
  const implementationMetrics = [
    {
      label: "Latency profile",
      value: latencyProfileTitle,
      description: latencyProfileContent,
    },
    {
      label: "System focus",
      value: systemFocusTitle,
      description: systemFocusContent,
    },
  ].filter(({ value, description }) => value !== null || description !== null)

  return (
    <section className="border-y border-white/6 bg-[var(--color-surface-low)]">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-18 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-14 lg:py-22">
        <div className="space-y-8">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Implementation
          </p>
          <div className="max-w-[42rem] space-y-5">
            <h2 className="max-w-[12ch] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem]">
              Implementation Details
            </h2>
            {implementationParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-white/68">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {implementationMetrics.length > 0 ? (
          <div className="grid gap-4">
            {implementationMetrics.map((projectMetric) => (
              <article
                key={projectMetric.label}
                className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7"
              >
                <p className="text-[0.6rem] font-medium tracking-[0.18em] text-white/42 uppercase">
                  {projectMetric.label}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-white">
                  {projectMetric.value}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  {projectMetric.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
