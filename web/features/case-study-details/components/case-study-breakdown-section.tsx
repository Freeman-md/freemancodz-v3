function SectionKicker({ label }: { label: string }) {
  return (
    <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
      {label}
    </p>
  )
}

export function CaseStudyBreakdownSection({
  domainLabel,
  typeLabel,
  levelLabel,
  statusLabel,
  contextParagraphs,
  approachParagraphs,
  techStack,
  evidenceItems,
}: {
  domainLabel: string
  typeLabel: string
  levelLabel: string
  statusLabel: string
  contextParagraphs: string[]
  approachParagraphs: string[]
  techStack: string[]
  evidenceItems: string[]
}) {
  const metadataItems = [
    { label: "Domain", value: domainLabel },
    { label: "Type", value: typeLabel },
    { label: "Level", value: levelLabel },
    { label: "Status", value: statusLabel },
  ]

  return (
    <section className="border-y border-white/6 bg-[var(--color-surface-low)]">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-18 sm:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.82fr)] lg:px-14 lg:py-22">
        <div className="space-y-12">
          <div className="space-y-8">
            <SectionKicker label="Context" />
            <div className="max-w-[44rem] space-y-5">
              <h2 className="max-w-[12ch] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem]">
                Why this problem mattered
              </h2>
              {contextParagraphs.length > 0 ? (
                contextParagraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`} className="text-lg leading-8 text-white/68">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg leading-8 text-white/48">
                  This case study does not include context details yet.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <SectionKicker label="Approach" />
            <div className="max-w-[44rem] space-y-5">
              <h2 className="max-w-[12ch] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem]">
                How the system was structured
              </h2>
              {approachParagraphs.length > 0 ? (
                approachParagraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`} className="text-lg leading-8 text-white/68">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg leading-8 text-white/48">
                  This case study does not include approach details yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Case Study Details
            </p>
            <dl className="mt-6 space-y-5">
              {metadataItems.map((metadataItem) => (
                <div
                  key={metadataItem.label}
                  className="border-t border-white/8 pt-5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[0.6rem] font-medium tracking-[0.18em] text-white/42 uppercase">
                    {metadataItem.label}
                  </dt>
                  <dd className="mt-2 text-sm text-white">{metadataItem.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Technology Stack
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.length > 0 ? (
                techStack.map((technologyLabel) => (
                  <span
                    key={technologyLabel}
                    className="bg-[var(--color-surface-container-highest)] px-3 py-2 text-[0.62rem] font-medium tracking-[0.16em] text-white/78 uppercase"
                  >
                    {technologyLabel}
                  </span>
                ))
              ) : (
                <span className="text-sm text-white/48">
                  No technology stack listed yet.
                </span>
              )}
            </div>
          </div>

          <div className="border border-[var(--color-primary)]/24 bg-[rgba(195,192,255,0.08)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
              Evidence
            </p>
            {evidenceItems.length > 0 ? (
              <ul className="mt-5 space-y-4 text-sm leading-7 text-white/72">
                {evidenceItems.map((evidenceItem, index) => (
                  <li
                    key={`${index}-${evidenceItem}`}
                    className="border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                  >
                    {evidenceItem}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm leading-7 text-white/48">
                No evidence items have been added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
