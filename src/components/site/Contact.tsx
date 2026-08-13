import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TelegramIcon } from '@/components/icons'
import { profile } from '@/data/profile'

export function Contact() {
  const rows = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
    },
    { icon: GithubIcon, label: 'GitHub', value: 'github.com/Kidussk', href: profile.github },
    profile.linkedin && {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: profile.linkedin.replace(/^https?:\/\//, ''),
      href: profile.linkedin,
    },
    profile.telegram && {
      icon: TelegramIcon,
      label: 'Telegram',
      value: profile.telegram.replace(/^https?:\/\//, ''),
      href: profile.telegram,
    },
  ].filter(Boolean) as { icon: (p: { size?: number }) => React.ReactElement; label: string; value: string; href: string }[]

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-96 w-[54rem] -translate-x-1/2 rounded-full bg-brass-500/10 blur-[120px]" />
      </div>

      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-5xl">
            Have a system that should exist?{' '}
            <span className="font-display font-normal text-brass-400 italic">Describe it.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-chalk-500">
            Tell me the workflow you are trying to replace and who has to use it. I will come back
            with a scope, a realistic timeline and a fixed price for the first milestone — no
            obligation on either side.
          </p>

          <a
            href={`mailto:${profile.email}?subject=Project%20enquiry`}
            className="mt-9 inline-flex h-13 items-center gap-2.5 rounded-xl bg-brass-500 px-7 py-3.5 text-[15px] font-semibold text-ink-950 transition-[filter] hover:brightness-110"
          >
            <Mail size={17} />
            {profile.email}
          </a>
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal data-reveal-delay="120">
          <ul className="divide-y divide-ink-800 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60">
            {rows.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink-850"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-800 text-chalk-400 transition-colors group-hover:bg-brass-500/12 group-hover:text-brass-400">
                    <r.icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                      {r.label}
                    </span>
                    <span className="block truncate text-[14px] font-medium text-chalk-100">
                      {r.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-chalk-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk-300"
                  />
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 px-1 text-[13px] leading-relaxed text-chalk-600">
            Based in {profile.location} — comfortable working remotely across time zones, and happy
            to meet on site for discovery when the project is local.
          </p>
        </div>
      </div>
    </section>
  )
}
