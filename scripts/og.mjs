/**
 * Renders public/og.png — the 1200×630 card shown when the site is shared
 * on WhatsApp, Telegram, LinkedIn or X. Run it again if the headline or the
 * project list changes: node scripts/og.mjs
 */
import { chromium } from 'playwright'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve(import.meta.dirname, '../public')
const TMP = path.join(OUT, '.og.html')

const projects = [
  ['AssetFlow', '#6E8BFF'],
  ['EthioTractors', '#E09F36'],
  ['Liben', '#3E9C8F'],
  ['HU-IPMS', '#5FB37A'],
  ['FetanSMS', '#A07CF0'],
  ['University Hub', '#E4708A'],
]

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#07090d;color:#eef2f8;
       font-family:Inter,system-ui,sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;top:-260px;left:50%;transform:translateX(-50%);
        width:1100px;height:560px;border-radius:9999px;
        background:rgba(224,159,54,.16);filter:blur(120px)}
  .grid{position:absolute;inset:0;opacity:.5;
        background-image:linear-gradient(to right,#262e3b8c 1px,transparent 1px),
                         linear-gradient(to bottom,#262e3b8c 1px,transparent 1px);
        background-size:64px 64px;
        -webkit-mask-image:radial-gradient(ellipse 60% 55% at 50% 0%,black,transparent)}
  .wrap{position:relative;padding:72px 76px;height:100%;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:14px}
  .mark{width:46px;height:46px;border-radius:12px;background:#e09f36;color:#07090d;
        display:grid;place-items:center;font-weight:700;font-size:24px}
  .name{font-size:22px;font-weight:600;letter-spacing:-.01em}
  h1{margin-top:56px;font-size:70px;line-height:1.04;letter-spacing:-.035em;font-weight:600;max-width:15ch}
  .em{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:400;color:#edb75a}
  p{margin-top:26px;font-size:23px;color:#8994a6;max-width:44ch;line-height:1.5}
  .row{margin-top:auto;display:flex;flex-wrap:wrap;gap:10px}
  .chip{display:flex;align-items:center;gap:9px;border:1px solid #1c222d;border-radius:9999px;
        padding:9px 18px;font-size:16px;color:#8994a6}
  .dot{width:8px;height:8px;border-radius:9999px}
</style></head><body>
<div class="glow"></div><div class="grid"></div>
<div class="wrap">
  <div class="brand"><div class="mark">K</div><div class="name">Kidus</div></div>
  <h1>I build the software <span class="em">companies actually run on.</span></h1>
  <p>Six production systems — each with a live, interactive demo you can click through in the browser.</p>
  <div class="row">
    ${projects
      .map(
        ([n, c]) =>
          `<div class="chip"><span class="dot" style="background:${c}"></span>${n}</div>`,
      )
      .join('')}
  </div>
</div></body></html>`

await mkdir(OUT, { recursive: true })
await writeFile(TMP, html)

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(`file://${TMP}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: path.join(OUT, 'og.png') })
await browser.close()
await rm(TMP)

console.log('✓ public/og.png')
