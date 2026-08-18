import { Suspense, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  RotateCcw,
  X,
} from 'lucide-react'
import { projectBySlug, projects } from '@/data/projects'
import { demoRegistry } from '@/demos/registry'

export default function DemoPage() {
  const { slug = '' } = useParams()
  const project = projectBySlug(slug)
  const Demo = demoRegistry[slug]

  const [info, setInfo] = useState(false)
  /** Bumping this remounts the demo, throwing away any state you changed. */
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.name} — live demo`
    return () => {
      document.title = 'Kidus — Software Engineer & Systems Builder'
    }
  }, [project])

  if (!project || !Demo) return <Navigate to="/" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden bg-ink-950"
      style={
        { '--accent': project.accent, '--accent-soft': project.accentSoft } as React.CSSProperties
      }
    >
      {/* ---- return bar ------------------------------------------------ */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-ink-800 px-3 sm:px-5">
        <Link
          to={`/#${project.slug}`}
          className="inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-3 py-1.5 text-[13px] font-medium text-chalk-300 transition-colors hover:border-ink-600 hover:text-chalk-50"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            className="hidden size-2 shrink-0 rounded-full sm:block"
            style={{ background: project.accent }}
          />
          <span className="truncate text-sm font-semibold text-chalk-50">{project.name}</span>
          <span className="hidden truncate text-[12px] text-chalk-600 lg:inline">
            {project.sector}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => setInfo((v) => !v)}
            aria-expanded={info}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              info
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-ink-700 bg-ink-900 text-chalk-300 hover:border-ink-600 hover:text-chalk-50'
            }`}
          >
            <Info size={14} />
            <span className="hidden sm:inline">About this system</span>
          </button>
          <button
            onClick={() => setRunId((n) => n + 1)}
            title="Reset the demo data"
            className="rounded-lg border border-ink-700 bg-ink-900 p-2 text-chalk-400 transition-colors hover:border-ink-600 hover:text-chalk-50"
          >
            <RotateCcw size={14} />
          </button>
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              title={link.label}
              className="rounded-lg border border-ink-700 bg-ink-900 p-2 text-chalk-400 transition-colors hover:border-ink-600 hover:text-chalk-50"
            >
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </header>

      {/* ---- context panel --------------------------------------------- */}
      {info && <InfoPanel slug={slug} onClose={() => setInfo(false)} />}

      {/* ---- the application ------------------------------------------- */}
      <div className="min-h-0 flex-1">
        <Suspense fallback={<Loading name={project.name} />}>
          <Demo key={runId} project={project} />
        </Suspense>
      </div>

      {/* ---- footer bar ------------------------------------------------ */}
      <footer className="flex h-11 shrink-0 items-center justify-between gap-3 border-t border-ink-800 px-3 text-[12px] text-chalk-600 sm:px-5">
        <p className="truncate">
          Front-end demo · all data is fictional and held in the browser
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            to={`/demo/${prev.slug}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-ink-850 hover:text-chalk-200"
          >
            <ChevronLeft size={13} />
            <span className="hidden sm:inline">{prev.name}</span>
          </Link>
          <Link
            to={`/demo/${next.slug}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-ink-850 hover:text-chalk-200"
          >
            <span className="hidden sm:inline">{next.name}</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </footer>
    </div>
  )
}

function InfoPanel({ slug, onClose }: { slug: string; onClose: () => void }) {
  const project = projectBySlug(slug)!
  return (
    <div className="animate-fade max-h-[46vh] shrink-0 overflow-y-auto border-b border-ink-800 bg-ink-900">
      <div className="wrap grid gap-8 py-7 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">The problem</p>
              <p className="mt-3 leading-relaxed text-chalk-300">{project.problem}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-chalk-600 hover:bg-ink-800 hover:text-chalk-100 lg:hidden"
            >
              <X size={16} />
            </button>
          </div>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-ink-700 bg-ink-950 px-2 py-1 text-[11.5px] font-medium text-chalk-500"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex items-start justify-between gap-3">
            <p className="eyebrow">What the system does</p>
            <button
              onClick={onClose}
              aria-label="Close"
              className="hidden rounded-lg p-1.5 text-chalk-600 hover:bg-ink-800 hover:text-chalk-100 lg:block"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13.5px] leading-relaxed text-chalk-400">
                <span
                  className="mt-[7px] size-1.5 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Loading({ name }: { name: string }) {
  return (
    <div className="grid h-full place-items-center bg-ink-900">
      <div className="text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-2 border-ink-600 border-t-[var(--accent)]" />
        <p className="mt-4 text-sm text-chalk-600">Loading {name}…</p>
      </div>
    </div>
  )
}
