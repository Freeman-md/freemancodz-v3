import { projectDetailsRecord } from "@/features/project-details/content"
import { ProjectSystemVisualPanel } from "@/features/project-details/components/project-system-visual-panel"

function splitTextIntoParagraphs(text: string | null): string[] {
  if (!text) {
    return []
  }

  return text
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function formatDisplayLabel(value: string | null): string {
  if (!value) {
    return "Unavailable"
  }

  return value
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

export function ProjectDetailsOverviewSection() {
  const projectEntryDetails = projectDetailsRecord.details
  const contextParagraphs = splitTextIntoParagraphs(projectEntryDetails?.context_text ?? null)
  const projectParameters = [
    { label: "Domain", value: formatDisplayLabel(projectDetailsRecord.domain) },
    { label: "Type", value: formatDisplayLabel(projectDetailsRecord.type) },
    {
      label: "Complexity Level",
      value: formatDisplayLabel(projectDetailsRecord.level),
    },
  ]

  return (
    <section className="mx-auto max-w-[90rem] space-y-14 px-6 pb-18 sm:px-10 lg:px-14 lg:pb-24">
      <ProjectSystemVisualPanel />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)]">
        <div className="space-y-8">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            Context
          </p>
          <div className="max-w-[48rem] space-y-5">
            <h2 className="max-w-[14ch] text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.05em] text-white sm:text-[4.2rem]">
              The Architectural Challenge
            </h2>
            {contextParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-white/68">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Project parameters
            </p>
            <dl className="mt-6 space-y-5">
              {projectParameters.map((projectParameter) => (
                <div
                  key={projectParameter.label}
                  className="border-t border-white/8 pt-5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[0.6rem] font-medium tracking-[0.18em] text-white/42 uppercase">
                    {projectParameter.label}
                  </dt>
                  <dd className="mt-2 text-sm text-white">{projectParameter.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-white/8 bg-[var(--color-surface-container)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-white/44 uppercase">
              Technology stack
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {projectDetailsRecord.tech_stack.map((technologyLabel) => (
                <span
                  key={technologyLabel}
                  className="bg-[var(--color-surface-container-highest)] px-3 py-2 text-[0.62rem] font-medium tracking-[0.16em] text-white/78 uppercase"
                >
                  {technologyLabel}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-[var(--color-primary)]/24 bg-[rgba(195,192,255,0.08)] p-6 sm:p-7">
            <p className="text-[0.62rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
              Core Innovation
            </p>
            <p className="mt-4 text-base leading-8 text-white/74">
              {projectEntryDetails?.innovation_text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
