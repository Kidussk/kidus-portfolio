import { Code2, Database, Rocket } from 'lucide-react'
import { profile } from '@/data/profile'

const icons = [Code2, Database, Rocket]

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <header className="max-w-2xl" data-reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-4xl">
            One person, the whole path from schema to domain.
          </h2>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {profile.capabilities.map((c, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60 p-6 transition-colors hover:border-ink-600"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brass-500/12 text-brass-400">
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-chalk-50">{c.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-chalk-500">{c.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-ink-800 bg-ink-950 px-2 py-1 text-[11.5px] font-medium text-chalk-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
