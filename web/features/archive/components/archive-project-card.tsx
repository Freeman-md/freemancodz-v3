import Link from "next/link"

import type { ArchiveProjectCard as ArchiveProjectCardType } from "@/features/archive/types"

export function ArchiveProjectCard({
  projectCard,
}: {
  projectCard: ArchiveProjectCardType
}) {
  const cardLayoutClassName =
    projectCard.variant === "full" ? "lg:col-span-2" : ""

  return (
    <article
      className={`bg-[var(--color-surface-container)] px-6 py-8 sm:px-8 ${cardLayoutClassName}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.78rem] font-medium tracking-[0.12em] text-white uppercase">
          {projectCard.sequenceLabel}
        </p>
        <p className="text-[0.72rem] tracking-[0.14em] text-white/56 uppercase">
          {projectCard.year ?? "Undated"}
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <h2 className="max-w-[18ch] text-balance text-4xl font-extrabold tracking-[-0.05em] text-white">
          {projectCard.title}
        </h2>
        <p className="max-w-[36rem] text-base leading-8 text-white/66">
          {projectCard.description}
        </p>
      </div>

      <div className="mt-10 border-t border-white/8 pt-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-[0.6rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Type
            </p>
            <p className="text-sm text-white">{projectCard.typeLabel}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[0.6rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Domain
            </p>
            <p className="text-sm text-white">{projectCard.domainLabel}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[0.6rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Level
            </p>
            <p className="text-sm text-white">{projectCard.levelLabel}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {projectCard.technologyLabels.map((tagLabel) => (
            <span
              key={tagLabel}
              className="bg-[var(--color-surface-container-highest)] px-3 py-1 text-[0.6rem] font-medium tracking-[0.16em] text-white/78 uppercase"
            >
              {tagLabel}
            </span>
          ))}
        </div>

        <div className="mt-8 flex">
          <Link
            href={projectCard.href}
            className="inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.18em] text-white/68 uppercase transition-colors duration-200 hover:text-white"
          >
            <span>{projectCard.actionLabel}</span>
            <span className="h-px w-10 bg-[var(--color-primary)]" />
          </Link>
        </div>
      </div>
    </article>
  )
}
