import { ArrowDown, Mail, MapPin } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-veil absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full bg-brass-500/12 blur-[120px]" />
        <div className="absolute top-24 -right-32 h-80 w-80 rounded-full bg-[#6E8BFF]/10 blur-[100px]" />
      </div>

      <div className="wrap">
        {profile.availability && (
          <p className="animate-rise mb-7 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/80 py-1.5 pr-4 pl-2.5 text-[12px] font-medium text-chalk-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </p>
        )}

        <h1
          className="animate-rise max-w-4xl text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-6xl lg:text-[4.4rem]"
          style={{ animationDelay: '60ms' }}
        >
          I build the software
          <br className="hidden sm:block" />{' '}
          <span className="font-display font-normal text-brass-400 italic">
            companies actually run on.
          </span>
        </h1>

        <p
          className="animate-rise mt-7 max-w-2xl text-[17px] leading-relaxed text-chalk-500"
          style={{ animationDelay: '140ms' }}
        >
          {profile.intro}
        </p>

        <div
          className="animate-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '220ms' }}
        >
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-brass-500 px-6 text-sm font-semibold text-ink-950 transition-[filter] hover:brightness-110"
          >
            Explore the demos
            <ArrowDown size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-ink-600 bg-ink-900 px-6 text-sm font-semibold text-chalk-100 transition-colors hover:border-ink-500 hover:bg-ink-800"
          >
            <Mail size={16} />
            Email me
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-chalk-500 transition-colors hover:text-chalk-100"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>

        <p
          className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-chalk-600"
          style={{ animationDelay: '280ms' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} />
            {profile.location}
          </span>
          <span className="hidden sm:inline">·</span>
          <span>{profile.role}</span>
        </p>

        {/* stats band */}
        <dl
          className="animate-rise mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800 sm:grid-cols-4"
          style={{ animationDelay: '340ms' }}
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-ink-950 px-5 py-6">
              <dt className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                {s.label}
              </dt>
              <dd className="tabular mt-2 text-3xl font-semibold tracking-tight text-chalk-50">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul
          className="animate-rise mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] text-chalk-600"
          style={{ animationDelay: '400ms' }}
          aria-label="Systems on this site"
        >
          <li className="pr-1 font-semibold tracking-wider text-chalk-500 uppercase">On this page</li>
          {projects.map((p) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-800 px-2.5 py-1 transition-colors hover:border-ink-600 hover:text-chalk-300"
              >
                <span className="size-1.5 rounded-full" style={{ background: p.accent }} />
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
