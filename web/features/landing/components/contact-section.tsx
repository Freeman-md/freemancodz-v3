import {
  contactContent,
  contactLinks,
} from "@/features/landing/content"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center px-6 text-center sm:px-10 lg:px-14">
        <div className="max-w-[48rem] space-y-5">
          <p className="text-[0.64rem] font-medium tracking-[0.18em] text-[var(--color-primary)] uppercase">
            {contactContent.eyebrow}
          </p>
          <h2 className="text-balance text-5xl font-extrabold tracking-[-0.06em] text-white sm:text-6xl">
            {contactContent.title}
          </h2>
          <p className="text-lg leading-8 text-white/68">
            {contactContent.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[0.7rem] font-medium tracking-[0.16em] text-white/78 uppercase">
          {contactLinks.map((contactLink) => (
            <a
              key={contactLink.label}
              href={contactLink.href}
              target={contactLink.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={contactLink.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="hover:text-white"
            >
              {contactLink.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
