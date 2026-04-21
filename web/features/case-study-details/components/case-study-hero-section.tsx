import type { CaseStudyDetailsView } from "@/features/case-study-details/types"

export function CaseStudyHeroSection({
  title,
  description,
  year,
  repoUrl,
  liveUrl,
}: Pick<
  CaseStudyDetailsView,
  "title" | "description" | "year" | "repoUrl" | "liveUrl"
>) {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-18 sm:px-10 lg:px-14 lg:py-22">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)] xl:items-end">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-4 text-[0.66rem] font-medium tracking-[0.18em] text-white/58 uppercase">
            <span>Case Study</span>
            <span className="h-px w-10 bg-white/10" />
            {year ? <span>{year}</span> : null}
          </div>

          <div className="max-w-[56rem] space-y-6">
            <h1 className="max-w-[12ch] text-balance text-5xl font-extrabold leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.75rem]">
              {title}
            </h1>
            <p className="max-w-[44rem] text-lg leading-8 text-white/68">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:max-w-[24rem] sm:grid-cols-2 xl:grid-cols-1">
          {repoUrl ? (
            <a
              href={repoUrl}
              className="inline-flex min-h-14 items-center justify-center bg-[var(--color-primary)] px-8 text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-on-primary)] uppercase transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Repository
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              className="inline-flex min-h-14 items-center justify-center border border-white/8 bg-[var(--color-surface-container)] px-8 text-[0.72rem] font-medium tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
            >
              Live Deployment
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
