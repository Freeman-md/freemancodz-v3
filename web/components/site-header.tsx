import Link from "next/link"

const navigationItems = [
  { label: "Projects", href: "#selected-works", isActive: true },
  { label: "Archive", href: "/archive", isActive: false },
  { label: "Research", href: "#technical-inventory", isActive: false },
  { label: "About", href: "#core-protocol", isActive: false },
]

function NavigationLink({
  label,
  href,
  isActive,
}: {
  label: string
  href: string
  isActive: boolean
}) {
  return (
    <a
      href={href}
      className="relative text-[0.72rem] tracking-[0.1em] text-white/78 transition-colors duration-200 hover:text-white"
    >
      {label}
      {isActive ? (
        <span className="absolute inset-x-0 -bottom-3 h-px bg-[var(--color-primary)]" />
      ) : null}
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="text-sm font-extrabold tracking-[-0.03em] text-white"
        >
          ARCHITECT.LOG
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navigationItems.map((navigationItem) => (
            <NavigationLink
              key={navigationItem.label}
              label={navigationItem.label}
              href={navigationItem.href}
              isActive={navigationItem.isActive}
            />
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex min-h-11 items-center justify-center bg-[var(--color-primary)] px-6 text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-on-primary)] uppercase transition-transform duration-200 hover:-translate-y-0.5"
        >
          Connect
        </a>
      </div>
    </header>
  )
}
