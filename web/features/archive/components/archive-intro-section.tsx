import { archiveIntroContent } from "@/features/archive/content"

export function ArchiveIntroSection() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
      <div className="max-w-[54rem] space-y-8">
        <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
          {archiveIntroContent.eyebrow}
        </p>

        <div className="space-y-6">
          <h1 className="max-w-[12ch] text-balance text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5rem]">
            {archiveIntroContent.title}
          </h1>
          <p className="max-w-[44rem] text-lg leading-8 text-white/68">
            {archiveIntroContent.description}
          </p>
        </div>
      </div>
    </section>
  )
}
