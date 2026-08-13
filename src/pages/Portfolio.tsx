import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Work } from '@/components/site/Work'
import { About } from '@/components/site/About'
import { Capabilities } from '@/components/site/Capabilities'
import { Process } from '@/components/site/Process'
import { Contact } from '@/components/site/Contact'
import { Footer } from '@/components/site/Footer'
import { useReveal } from '@/lib/useReveal'

export default function Portfolio() {
  useReveal()
  const { hash } = useLocation()

  /** Coming back from a demo restores the project you were looking at. */
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brass-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to the work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Capabilities />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
