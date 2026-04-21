import {
  capabilityCards,
  coreProtocolContent,
} from "@/features/landing/content"
import { SectionEyebrow } from "@/features/landing/components/section-eyebrow"

export function CoreProtocolSection() {
  return (
    <section
      id="core-protocol"
      className="bg-[var(--color-surface-low)] py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 px-6 sm:px-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-14">
        <SectionEyebrow
          label={coreProtocolContent.eyebrow}
          title={coreProtocolContent.title}
        />

        <div className="space-y-12">
          <div className="max-w-[48rem] space-y-8 text-lg leading-8 text-white/72">
            {coreProtocolContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {capabilityCards.map((capabilityCard) => (
              <article
                key={capabilityCard.title}
                className="bg-[var(--color-surface-container)] p-8 transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
              >
                <capabilityCard.icon
                  className="mb-8 size-4 text-[var(--color-primary)]"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-bold tracking-[-0.03em] text-white">
                  {capabilityCard.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {capabilityCard.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
