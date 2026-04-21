export function SectionEyebrow({
  label,
  title,
}: {
  label: string
  title: string
}) {
  return (
    <div className="space-y-4">
      <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
        {label}
      </p>
      <h2 className="max-w-[18rem] text-balance text-4xl font-extrabold tracking-[-0.05em] text-white sm:text-5xl">
        {title}
      </h2>
    </div>
  )
}
