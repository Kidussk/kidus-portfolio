import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 py-12">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-brass-500 text-[15px] font-bold text-ink-950">
                {profile.initials}
              </span>
              <span className="text-sm font-semibold text-chalk-50">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-chalk-600">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav className="md:col-span-4" aria-label="Demos">
            <h2 className="text-[11px] font-semibold tracking-wider text-chalk-500 uppercase">
              Demos
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/demo/${p.slug}`}
                    className="text-[13px] text-chalk-500 transition-colors hover:text-chalk-100"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label="Sections">
            <h2 className="text-[11px] font-semibold tracking-wider text-chalk-500 uppercase">
              Site
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                ['#work', 'Work'],
                ['#about', 'About'],
                ['#capabilities', 'Capabilities'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[13px] text-chalk-500 transition-colors hover:text-chalk-100"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-800 pt-6 text-[12px] text-chalk-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>
            All demo data on this site is fictional and generated for illustration. No client data
            is included.
          </p>
        </div>
      </div>
    </footer>
  )
}
