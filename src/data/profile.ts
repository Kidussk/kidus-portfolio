/**
 * Single source of truth for everything personal on the site.
 *
 * ─── EDIT BEFORE SHARING ────────────────────────────────────────────────
 * The fields marked `[edit]` are placeholders or guesses. Everything else
 * was taken from your GitHub account.
 * ────────────────────────────────────────────────────────────────────────
 */

type ProfileShape = {
  name: string
  initials: string
  role: string
  location: string
  phone: string
  email: string
  github: string
  linkedin: string
  telegram: string
  availability: string | null
  headline: string
  intro: string
  about: string[]
  stats: { value: string; label: string }[]
  capabilities: { title: string; body: string; items: string[] }[]
  process: { step: string; title: string; body: string }[]
}

export const profile: ProfileShape = {
  /** [edit] Add your surname here if you want the full name on the hero. */
  name: 'Kidus',
  initials: 'K',

  role: 'Software Engineer · Business Systems',

  /** [edit] Inferred from the EthioTractors site. */
  location: 'Addis Ababa, Ethiopia',

  /** [edit] Leave blank to hide the phone row in the contact section. */
  phone: '',

  email: 'kidussnap@gmail.com',
  github: 'https://github.com/Kidussk',

  /** [edit] Leave blank to hide the link. */
  linkedin: '',
  telegram: '',

  /** Availability pill under the hero. Set to null to hide it. */
  availability: 'Available for new projects',

  headline: 'I build the software companies actually run on.',

  intro:
    'Asset registries, project management platforms, invoicing systems, messaging infrastructure — the unglamorous software that keeps a business moving. Six of those systems are below, and every one of them opens as a working demo you can click through right here.',

  /** Shown in the About section as short prose paragraphs. */
  about: [
    'I work end to end: database schema, API, front end, deployment, and the handover documentation the team actually reads. Most of what I build replaces a spreadsheet, a WhatsApp group, or a paper file — so the bar is not "does it work", it is "will the person on site use it on a Tuesday".',
    'That means fast pages on slow connections, forms that survive being half-filled, role-based access that matches how the company is really organised, and printable output — because invoices, work orders and reports still get printed.',
    'I have shipped in React and TypeScript, in plain PHP and MySQL, and in vanilla JavaScript when a client needed something that runs from a folder with no build step. The stack follows the constraint, not the fashion.',
  ],

  /** Numbers on the hero band. Keep these honest and easy to defend. */
  stats: [
    { value: '6', label: 'Systems shipped' },
    { value: '30+', label: 'Distinct user roles modelled' },
    { value: '5', label: 'Industries served' },
    { value: '100%', label: 'Built end to end' },
  ],

  /** Grouped for the capability section. */
  capabilities: [
    {
      title: 'Product & front end',
      body: 'React, TypeScript, Tailwind, TanStack Router & Query, shadcn/ui, Recharts. Interfaces that stay legible when the table has ten thousand rows.',
      items: ['React 19', 'TypeScript', 'Tailwind CSS', 'TanStack', 'Vite', 'Recharts'],
    },
    {
      title: 'Back end & data',
      body: 'Node and Express, PHP with PDO, MySQL and SQLite. Normalised schemas, migrations that run themselves, JWT and session auth, role-based access enforced on the server.',
      items: ['Node.js', 'Express', 'PHP', 'MySQL', 'SQLite', 'JWT'],
    },
    {
      title: 'Delivery',
      body: 'From an empty repository to a domain with TLS, backups and a written update guide. Shared hosting, Plesk and cPanel included — not every client is on a cloud platform.',
      items: ['Vercel', 'Cloudflare', 'Plesk / cPanel', 'GitHub Actions', 'Android', 'Docs'],
    },
  ],

  /** How an engagement runs, shown as a numbered strip. */
  process: [
    {
      step: '01',
      title: 'Map the real workflow',
      body: 'Before any schema, I sit with the paper form, the spreadsheet and the person who fills it in. Most requirements documents describe the wish, not the work.',
    },
    {
      step: '02',
      title: 'Model the data',
      body: 'Locations, roles, lifecycle states and approvals get designed first. Getting this wrong is the one mistake you cannot refactor your way out of cheaply.',
    },
    {
      step: '03',
      title: 'Ship a usable slice',
      body: 'A narrow but complete path — create, approve, report, print — in front of real users early, so the feedback is about the work and not about a mockup.',
    },
    {
      step: '04',
      title: 'Deploy and hand over',
      body: 'Live on your domain with a deployment guide, an admin account, seed data and a walkthrough. You own the repository from day one.',
    },
  ],
}

export type Profile = ProfileShape
