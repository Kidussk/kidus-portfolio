import { profile } from '@/data/profile'

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-ink-800 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="wrap">
        <header className="max-w-2xl" data-reveal>
          <p className="eyebrow">How a project runs</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-4xl">
            Four steps, and you own the repository from the first one.
          </h2>
        </header>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800 md:grid-cols-2 xl:grid-cols-4">
          {profile.process.map((s, i) => (
            <li
              key={s.step}
              className="bg-ink-950 p-6"
              data-reveal
              data-reveal-delay={i * 90}
            >
              <span className="font-display text-3xl text-brass-500/70 italic">{s.step}</span>
              <h3 className="mt-4 text-[17px] font-semibold text-chalk-50">{s.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-chalk-500">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
