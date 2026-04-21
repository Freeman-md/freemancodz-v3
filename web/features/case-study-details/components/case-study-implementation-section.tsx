import type { CaseStudyDetailsView } from "@/features/case-study-details/types"

export function CaseStudyImplementationSection({
  implementationParagraphs,
}: {
  implementationParagraphs: CaseStudyDetailsView["implementationParagraphs"]
}) {
  const hasImplementationDetails = implementationParagraphs.length > 0

  return (
    <section className="mx-auto max-w-[90rem] px-6 py-18 sm:px-10 lg:px-14 lg:py-22">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1.05fr)] lg:items-start">
        <div className="space-y-8">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Delivery
          </p>
          <div className="max-w-[22rem] space-y-4">
            <h2 className="text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem]">
              Implementation Details
            </h2>
          </div>
        </div>

        <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-8">
          <div className="space-y-5">
            {hasImplementationDetails ? (
              implementationParagraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph}`} className="text-lg leading-8 text-white/68">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg leading-8 text-white/48">
                No implementation details have been added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
