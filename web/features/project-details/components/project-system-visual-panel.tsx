import { projectDetailsRecord } from "@/features/project-details/content"

export function ProjectSystemVisualPanel() {
  const projectEntryDetails = projectDetailsRecord.details
  const systemSnapshotItems = projectEntryDetails?.system_snapshot_items ?? []
  const designFocusItems = projectEntryDetails?.design_focus_items ?? []

  return (
    <div className="border border-white/8 bg-[linear-gradient(160deg,rgba(195,192,255,0.18),rgba(10,10,11,0.16)_38%,rgba(10,10,11,0.96)_100%)] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3">
          <p className="text-[0.62rem] font-medium tracking-[0.2em] text-white/50 uppercase">
            System snapshot
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl font-extrabold leading-tight tracking-[-0.05em] text-white sm:text-[2.5rem]">
            {projectEntryDetails?.system_snapshot_title}
          </h2>
        </div>
        <div className="hidden h-16 w-16 border border-white/10 bg-white/4 xl:block" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <div className="grid min-h-[23rem] gap-4 bg-[rgba(8,8,10,0.48)] p-4 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] sm:p-5">
          <div className="flex min-h-[10rem] items-end border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
            <p className="max-w-[12ch] text-[0.72rem] font-medium tracking-[0.16em] text-white/68 uppercase">
              {systemSnapshotItems[0]}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex min-h-[7.5rem] items-end border border-white/8 bg-[rgba(255,255,255,0.04)] p-4">
              <p className="max-w-[14ch] text-[0.68rem] font-medium tracking-[0.16em] text-white/62 uppercase">
                {systemSnapshotItems[1]}
              </p>
            </div>
            <div className="flex min-h-[7.5rem] items-end border border-white/8 bg-[rgba(255,255,255,0.025)] p-4">
              <p className="max-w-[12ch] text-[0.68rem] font-medium tracking-[0.16em] text-white/62 uppercase">
                {systemSnapshotItems[2]}
              </p>
            </div>
          </div>
          <div className="sm:col-span-2 grid gap-4 sm:grid-cols-3">
            <div className="flex min-h-[6rem] items-end border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
              <p className="text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase">
                {systemSnapshotItems[3]}
              </p>
            </div>
            <div className="flex min-h-[6rem] items-end border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
              <p className="text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase">
                {systemSnapshotItems[4]}
              </p>
            </div>
            <div className="flex min-h-[6rem] items-end border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
              <p className="text-[0.64rem] font-medium tracking-[0.16em] text-white/58 uppercase">
                {systemSnapshotItems[5]}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-white/8 bg-[rgba(8,8,10,0.54)] p-6">
          <p className="text-[0.62rem] font-medium tracking-[0.2em] text-white/44 uppercase">
            Design focus
          </p>
          <ul className="mt-6 space-y-5">
            {designFocusItems.map((designFocusItem) => (
              <li
                key={designFocusItem}
                className="border-t border-white/8 pt-5 text-sm leading-7 text-white/70 first:border-t-0 first:pt-0"
              >
                {designFocusItem}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
