import { useState, type ReactNode } from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cx, ToastHost, Avatar } from './kit'

export type NavItem = {
  key: string
  label: string
  icon: ReactNode
  /** Optional count pill on the right of the nav row. */
  badge?: string | number
}

export type DemoProps = { project: Project }

/**
 * The application frame every demo renders inside: brand rail, navigation,
 * top bar and a scrolling content pane. Consumers own the routing state so
 * each demo can decide what a "screen" means.
 */
export function DemoShell({
  project,
  nav,
  active,
  onNavigate,
  title,
  subtitle,
  actions,
  user,
  children,
}: {
  project: Project
  nav: NavItem[]
  active: string
  onNavigate: (key: string) => void
  title: string
  subtitle?: string
  actions?: ReactNode
  user?: { name: string; role: string }
  children: ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const who = user ?? { name: 'Demo User', role: 'Administrator' }

  return (
    <div
      data-demo-root
      className="relative flex h-full min-h-0 overflow-hidden bg-ink-900 text-chalk-100"
      style={
        {
          '--accent': project.accent,
          '--accent-soft': project.accentSoft,
        } as React.CSSProperties
      }
    >
      <ToastHost>
        {/* ---- Side navigation -------------------------------------- */}
        <nav
          className={cx(
            'absolute inset-y-0 left-0 z-30 flex w-60 shrink-0 flex-col border-r border-ink-700 bg-ink-950 transition-transform duration-300 md:relative md:translate-x-0',
            mobileNavOpen ? 'translate-x-0 shadow-2xl shadow-black/60' : '-translate-x-full',
          )}
          aria-label={`${project.name} navigation`}
        >
          <div className="flex h-14 items-center gap-2.5 border-b border-ink-800 px-4">
            <span
              className="grid size-7 shrink-0 place-items-center rounded-md text-[13px] font-bold text-ink-950"
              style={{ background: project.accent }}
            >
              {project.name[0]}
            </span>
            <span className="truncate text-[13px] font-semibold tracking-tight text-chalk-50">
              {project.name}
            </span>
          </div>

          <div className="scroll-slim flex-1 space-y-0.5 overflow-y-auto p-2.5">
            {nav.map((item) => {
              const on = item.key === active
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key)
                    setMobileNavOpen(false)
                  }}
                  aria-current={on ? 'page' : undefined}
                  className={cx(
                    'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
                    on
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'text-chalk-500 hover:bg-ink-850 hover:text-chalk-100',
                  )}
                >
                  <span className="shrink-0 opacity-90">{item.icon}</span>
                  <span className="flex-1 truncate text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={cx(
                        'tabular rounded-full px-1.5 py-px text-[10px] font-semibold',
                        on ? 'bg-[var(--accent)] text-ink-950' : 'bg-ink-700 text-chalk-500',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2.5 border-t border-ink-800 px-3 py-3">
            <Avatar name={who.name} size={30} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-chalk-100">{who.name}</p>
              <p className="truncate text-[11px] text-chalk-600">{who.role}</p>
            </div>
          </div>
        </nav>

        {mobileNavOpen && (
          <button
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
            className="animate-fade absolute inset-0 z-20 bg-ink-950/60 md:hidden"
          />
        )}

        {/* ---- Main column ------------------------------------------ */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-ink-700 bg-ink-850/60 px-3 backdrop-blur sm:px-5">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg p-1.5 text-chalk-500 hover:bg-ink-700 hover:text-chalk-100 md:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-chalk-50">{title}</h2>
              {subtitle && <p className="truncate text-[11px] text-chalk-600">{subtitle}</p>}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {actions}
              <span className="hidden items-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-2.5 py-1.5 text-[12px] text-chalk-600 lg:flex">
                <Search size={13} />
                Search
                <kbd className="rounded border border-ink-600 bg-ink-800 px-1 font-sans text-[10px]">
                  ⌘K
                </kbd>
              </span>
              <button
                className="relative rounded-lg p-1.5 text-chalk-500 hover:bg-ink-700 hover:text-chalk-100"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
                  style={{ background: project.accent }}
                />
              </button>
            </div>
          </header>

          <main className="scroll-slim min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
            <div key={active} className="animate-fade">
              {children}
            </div>
          </main>
        </div>
      </ToastHost>
    </div>
  )
}
