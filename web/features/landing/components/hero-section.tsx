import { heroContent } from "@/features/landing/content"

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-[90rem] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[minmax(0,46rem)_1fr] lg:px-14 lg:py-24">
      <div className="space-y-8">
        <p className="text-[0.64rem] font-medium tracking-[0.18em] text-white/66 uppercase">
          {heroContent.eyebrow}
        </p>

        <div className="max-w-[54rem] space-y-6">
          <h1 className="max-w-[14ch] text-balance text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5rem]">
            {heroContent.title.leading}{" "}
            <span className="text-[var(--color-primary)]">
              {heroContent.title.emphasisOne}
            </span>{" "}
            <span className="text-[var(--color-primary)]">
              {heroContent.title.emphasisTwo}
            </span>
          </h1>

          <p className="max-w-[38rem] text-lg leading-8 text-white/70">
            {heroContent.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={heroContent.primaryAction.href}
            className="inline-flex min-h-14 items-center justify-center bg-[var(--color-primary)] px-8 text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-on-primary)] uppercase transition-transform duration-200 hover:-translate-y-0.5"
          >
            {heroContent.primaryAction.label}
          </a>
          <a
            href={heroContent.secondaryAction.href}
            className="inline-flex min-h-14 items-center justify-center bg-[var(--color-surface-container)] px-8 text-[0.72rem] font-medium tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
          >
            {heroContent.secondaryAction.label}
          </a>
        </div>
      </div>

      <div className="hidden lg:block" />
    </section>
  )
}
