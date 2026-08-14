import { personalInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="mt-28 flex items-baseline justify-between border-t border-line py-7">
      <span className="font-mono text-[0.8125rem] text-ink-3">
        &copy; 2026 Ahamed Fofana
      </span>
      <a
        href={`mailto:${personalInfo.email}`}
        className="font-mono text-[0.8125rem] text-ink-3 underline decoration-line underline-offset-4 transition-colors hover:text-ink-1"
      >
        Email
      </a>
    </footer>
  )
}
