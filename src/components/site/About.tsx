import { profile } from '@/data/profile'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-y border-ink-800 bg-ink-900/40 py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-4xl">
            The unglamorous software,{' '}
            <span className="font-display font-normal text-brass-400 italic">done properly.</span>
          </h2>
        </div>

        <div className="space-y-6 lg:col-span-7 lg:col-start-6" data-reveal data-reveal-delay="120">
          {profile.about.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-[19px] leading-relaxed text-chalk-100'
                  : 'leading-relaxed text-chalk-500'
              }
            >
              {p}
            </p>
          ))}

          <blockquote className="mt-10 border-l-2 border-brass-500 pl-6">
            <p className="font-display text-xl leading-snug text-chalk-100 italic">
              “The bar is not whether the system works. It is whether the storekeeper opens it on a
              Tuesday afternoon instead of reaching for the notebook.”
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
