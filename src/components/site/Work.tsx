import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import { projects, type Project } from '@/data/projects'

export function Work() {
  return (
    // overflow-x-clip contains the preview cards' bleed glow on narrow screens
    <section id="work" className="relative scroll-mt-20 overflow-x-clip py-20 sm:py-28">
      <div className="wrap">
        <header className="max-w-3xl" data-reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance text-chalk-50 sm:text-5xl">
            Six systems.{' '}
            <span className="font-display font-normal text-brass-400 italic">
              Every one of them opens.
            </span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-chalk-500">
            These are real systems built for real operations. Each card below opens a working
            front-end demo, seeded with representative data — click through the screens, filter the
            tables, move a work order, generate an invoice. Nothing is a video and nothing is a
            mockup.
          </p>
        </header>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({
  project,
  index,
  flip,
}: {
  project: Project
  index: number
  flip: boolean
}) {
  return (
    <article
      id={project.slug}
      className="scroll-mt-24"
      data-reveal
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---- copy ---- */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
          <div className="flex items-center gap-3 text-[12px]">
            <span
              className="tabular font-mono font-semibold"
              style={{ color: project.accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-6" style={{ background: project.accent, opacity: 0.5 }} />
            <span className="font-medium tracking-wide text-chalk-500 uppercase">
              {project.sector}
            </span>
            <span className="text-chalk-600">· {project.year}</span>
          </div>

          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-chalk-50 sm:text-4xl">
            {project.name}
          </h3>
          <p
            className="font-display mt-2.5 text-[17px] leading-snug italic"
            style={{ color: project.accent }}
          >
            {project.tagline}
          </p>

          <p className="mt-5 leading-relaxed text-chalk-500">{project.summary}</p>

          <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ink-800 bg-ink-800">
            {project.facts.map((f) => (
              <div key={f.label} className="bg-ink-950 px-3 py-3.5">
                <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                  {f.label}
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-chalk-100">{f.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-ink-800 bg-ink-900 px-2.5 py-1 text-[11.5px] font-medium text-chalk-500"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/demo/${project.slug}`}
              className="group inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-ink-950 transition-[filter] hover:brightness-110"
              style={{ background: project.accent }}
            >
              <Play size={15} fill="currentColor" />
              Open live demo
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-ink-700 px-4 text-sm font-medium text-chalk-400 transition-colors hover:border-ink-600 hover:text-chalk-100"
              >
                <ExternalLink size={15} />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ---- preview ---- */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : ''}`}>
          <Preview project={project} />
        </div>
      </div>
    </article>
  )
}

function Preview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)

  return (
    <Link
      to={`/demo/${project.slug}`}
      className="group block"
      aria-label={`Open the ${project.name} demo`}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background: `radial-gradient(ellipse at center, ${project.accent}40, transparent 70%)`,
          }}
        />

        <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-1">
          {/* window chrome */}
          <div className="flex h-9 items-center gap-3 border-b border-ink-800 bg-ink-850 px-3.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-ink-600" />
              <span className="size-2.5 rounded-full bg-ink-600" />
              <span className="size-2.5 rounded-full bg-ink-600" />
            </div>
            <div className="flex h-5 flex-1 items-center gap-1.5 truncate rounded-md bg-ink-900 px-2.5 text-[10.5px] text-chalk-600">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: project.accent }}
              />
              {project.domain}
            </div>
          </div>

          {/* shot — 9/5 matches the 1440×800 capture in scripts/shots.mjs */}
          <div className="relative aspect-[9/5] bg-ink-900">
            {!failed ? (
              <img
                src={`/shots/${project.slug}.png`}
                alt={`${project.name} interface`}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
                className="size-full object-cover object-left-top"
              />
            ) : (
              <div
                className="grid size-full place-items-center"
                style={{
                  background: `linear-gradient(140deg, ${project.accent}22, transparent 60%)`,
                }}
              >
                <span className="text-sm font-medium text-chalk-500">{project.name}</span>
              </div>
            )}

            {/* hover call to action */}
            <div className="absolute inset-0 grid place-items-center bg-ink-950/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink-950"
                style={{ background: project.accent }}
              >
                <Play size={14} fill="currentColor" />
                Open live demo
              </span>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] text-chalk-600">
        <li className="font-semibold tracking-wider text-chalk-500 uppercase">Screens</li>
        {project.demoScreens.map((s) => (
          <li key={s} className="rounded-full border border-ink-800 px-2.5 py-0.5">
            {s}
          </li>
        ))}
      </ul>
    </Link>
  )
}
