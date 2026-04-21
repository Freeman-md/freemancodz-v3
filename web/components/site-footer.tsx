const footerNavigationItems = [
  { label: "Terminal", href: "#" },
  { label: "Repository", href: "#" },
  { label: "Network", href: "#" },
  { label: "Intelligence", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[var(--color-surface-low)]">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-6 py-8 text-[0.62rem] tracking-[0.18em] text-white/34 uppercase sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
        <p>© 2026 Engineer_Identity. Built for precision.</p>

        <nav className="flex flex-wrap gap-5">
          {footerNavigationItems.map((footerNavigationItem) => (
            <a
              key={footerNavigationItem.label}
              href={footerNavigationItem.href}
              className="transition-colors duration-200 hover:text-white/65"
            >
              {footerNavigationItem.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
