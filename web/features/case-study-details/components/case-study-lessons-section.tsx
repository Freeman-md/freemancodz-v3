import type { CaseStudyDetailsView } from "@/features/case-study-details/types"

function NarrativeBlock({
  sectionTitle,
  paragraphs,
}: {
  sectionTitle: string
  paragraphs: string[]
}) {
  return (
    <article className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
      <h2 className="max-w-[14ch] text-balance text-3xl font-extrabold leading-tight tracking-[-0.05em] text-white">
        {sectionTitle}
      </h2>
      <div className="mt-5 space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`} className="text-base leading-8 text-white/66">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-base leading-8 text-white/48">
            This section has not been published yet.
          </p>
        )}
      </div>
    </article>
  )
}

export function CaseStudyLessonsSection({
  reinforcementParagraphs,
  nextStepsParagraphs,
}: {
  reinforcementParagraphs: CaseStudyDetailsView["reinforcementParagraphs"]
  nextStepsParagraphs: CaseStudyDetailsView["nextStepsParagraphs"]
}) {
  const reinforcementSectionTitle = "What this case study reinforced"

  return (
    <section className="mx-auto max-w-[90rem] px-6 pb-20 sm:px-10 lg:px-14 lg:pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <NarrativeBlock
          sectionTitle={reinforcementSectionTitle}
          paragraphs={reinforcementParagraphs}
        />
        <NarrativeBlock
          sectionTitle="Next steps"
          paragraphs={nextStepsParagraphs}
        />
      </div>
    </section>
  )
}
