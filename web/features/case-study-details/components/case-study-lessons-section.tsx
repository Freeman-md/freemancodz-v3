import {
  caseStudyLessonsSection,
  caseStudyNextStepsSection,
} from "@/features/case-study-details/content"

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
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-white/66">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

export function CaseStudyLessonsSection() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 pb-20 sm:px-10 lg:px-14 lg:pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <NarrativeBlock
          sectionTitle={caseStudyLessonsSection.title}
          paragraphs={caseStudyLessonsSection.paragraphs}
        />
        <NarrativeBlock
          sectionTitle={caseStudyNextStepsSection.title}
          paragraphs={caseStudyNextStepsSection.paragraphs}
        />
      </div>
    </section>
  )
}
