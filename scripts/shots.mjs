/**
 * Captures the preview image shown on each portfolio card.
 *
 *   npm run shots                    # against a running dev server
 *   node scripts/shots.mjs <baseUrl> # against anything else
 *
 * Writes public/shots/<slug>.png. Re-run after changing a demo's default
 * screen so the card preview keeps matching what the demo actually shows.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const BASE = process.argv[2] ?? 'http://127.0.0.1:5180'
const OUT = path.resolve(import.meta.dirname, '../public/shots')

/** slug → the nav button to click before the shutter (null = default screen). */
const targets = [
  ['assetflow', null],
  ['ethiotractors', 'Catalogue'],
  ['liben', 'Proforma'],
  ['ipms', 'Groups'],
  ['fetansms', null],
  ['unihub', 'Timetable'],
]

const browser = await chromium.launch({
  // Playwright's bundled build is not always present in CI images.
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
})

await mkdir(OUT, { recursive: true })

for (const [slug, nav] of targets) {
  try {
    await page.goto(`${BASE}/demo/${slug}`, { waitUntil: 'networkidle', timeout: 45_000 })
    await page.waitForTimeout(700)

    if (nav) {
      await page.getByRole('button', { name: nav, exact: false }).first().click()
    }
    // Let charts and QR codes finish rendering before the shutter.
    await page.waitForTimeout(1800)

    await page
      .locator('[data-demo-root]')
      .screenshot({ path: path.join(OUT, `${slug}.png`) })
    console.log(`✓ ${slug}`)
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`)
    process.exitCode = 1
  }
}

await browser.close()
