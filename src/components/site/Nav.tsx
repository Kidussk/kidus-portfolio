import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
]

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-ink-800 bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid size-8 place-items-center rounded-lg bg-brass-500 text-[15px] font-bold text-ink-950">
            {profile.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight text-chalk-50">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-chalk-500 transition-colors hover:text-chalk-50"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-chalk-50 px-3.5 py-2 text-[13px] font-semibold text-ink-950 transition-colors hover:bg-white"
          >
            Get in touch
            <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-chalk-300 hover:bg-ink-800 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="animate-fade border-t border-ink-800 bg-ink-950/95 backdrop-blur-xl md:hidden">
          <nav className="wrap flex flex-col py-2" aria-label="Mobile">
            {[...links, { href: '#contact', label: 'Get in touch' }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-800 py-3 text-sm font-medium text-chalk-300 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
