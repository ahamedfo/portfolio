import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="mt-section border-t border-hairline">
      <div className="mx-auto flex max-w-frame flex-wrap items-baseline justify-between gap-x-8 gap-y-4 px-6 py-12">
        <p className="max-w-prose text-caption leading-relaxed text-ink-subtle">
          &copy; 2026 Ahamed Fofana. Employers and universities are named as on my resume.
          Nothing here implies their endorsement. Clients are described by sector.
        </p>
        <div className="flex gap-5">
          {[
            [`mailto:${profile.email}`, 'Email'],
            [profile.linkedin, 'LinkedIn'],
            [profile.github, 'GitHub'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-caption text-ink-subtle transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
