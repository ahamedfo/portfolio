import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-line py-7">
      <span className="font-mono text-[0.8125rem] text-ink-3">
        &copy; 2026 Ahamed Fofana. Employers and universities are named as on my resume. Nothing
        here implies their endorsement.
      </span>
      <a
        href={`mailto:${profile.email}`}
        className="font-mono text-[0.8125rem] text-ink-3 underline decoration-line underline-offset-4 transition-colors hover:text-ink-1"
      >
        Email
      </a>
    </footer>
  )
}
