import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { FeaturedWorkPanel } from "@/features/landing/types"

export function WorkPreviewPanel({
  featuredWork,
}: {
  featuredWork: FeaturedWorkPanel
}) {
  const visibleTags = featuredWork.tags.slice(0, 10)

  if (featuredWork.variant === "stacked") {
    return (
      <article className="flex min-h-[18rem] flex-col justify-between bg-[linear-gradient(180deg,#272042_0%,#1a1a2a_100%)] p-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase">
              {featuredWork.eyebrow}
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tagLabel) => (
                <span
                  key={tagLabel}
                  className="bg-black/18 px-3 py-1 text-[0.6rem] font-medium tracking-[0.16em] text-white/82 uppercase"
                >
                  {tagLabel}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold tracking-[-0.05em] text-white">
              {featuredWork.title}
            </h3>
            <p className="max-w-[18rem] text-sm leading-7 text-white/68">
              {featuredWork.description}
            </p>
          </div>
        </div>

        <Link
          href={featuredWork.href}
          className="inline-flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.16em] text-white uppercase"
        >
          {featuredWork.actionLabel}
          <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </Link>
      </article>
    )
  }

  return (
    <article className="grid min-h-[18rem] overflow-hidden bg-[var(--color-surface-container)] md:grid-cols-[1.35fr_minmax(0,1fr)]">
      <div className="relative min-h-[18rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_36%),linear-gradient(180deg,#1c1d1e_0%,#111112_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-52 border border-white/8 bg-[radial-gradient(circle,var(--color-surface-container-highest)_0%,transparent_68%)]" />
        </div>
      </div>

      <div className="flex flex-col justify-between p-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase">
              {featuredWork.eyebrow}
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tagLabel) => (
                <span
                  key={tagLabel}
                  className="bg-[var(--color-surface-container-highest)] px-3 py-1 text-[0.6rem] font-medium tracking-[0.16em] text-white/78 uppercase"
                >
                  {tagLabel}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold tracking-[-0.05em] text-white">
              {featuredWork.title}
            </h3>
            <p className="max-w-[22rem] text-sm leading-7 text-white/68">
              {featuredWork.description}
            </p>
          </div>
        </div>

        <Link
          href={featuredWork.href}
          className="inline-flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.16em] text-white uppercase"
        >
          {featuredWork.actionLabel}
          <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  )
}
