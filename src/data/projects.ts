export type Project = {
  slug: string
  name: string
  /** Short label used in the demo chrome address bar. */
  domain: string
  sector: string
  year: string
  tagline: string
  /** One paragraph for the project card. */
  summary: string
  /** The business problem, shown in the demo intro panel. */
  problem: string
  /** What the system does — 4 to 6 crisp bullets. */
  highlights: string[]
  stack: string[]
  /** Named metrics shown as a small strip on the detail panel. */
  facts: { label: string; value: string }[]
  repo: string
  /** Drives the per-demo colour theme. */
  accent: string
  accentSoft: string
  /** Screens the demo exposes, used for the card's "what you'll see" list. */
  demoScreens: string[]
}

export const projects: Project[] = [
  {
    slug: 'assetflow',
    name: 'AssetFlow',
    domain: 'assetflow.app',
    sector: 'Facilities & Asset Management',
    year: '2025',
    tagline: 'Every asset, every room, every branch — and who is accountable for it.',
    summary:
      'A multi-branch asset register that tracks physical and digital property from procurement through depreciation to disposal. Assets live in rooms, rooms sit inside floors and buildings, every room has a responsible staff member — so "where is it and who signed for it" is always one click away.',
    problem:
      'A company with several branches had its equipment recorded across a dozen spreadsheets. Nobody could say what a branch owned, what it was still worth, or who had signed for it — and audits meant walking the building with a printout.',
    highlights: [
      'Branch → building → floor → room → asset hierarchy with a responsible officer at every level',
      'Full lifecycle: procurement, registration, assignment, transfer, maintenance, disposal',
      'Straight-line depreciation with book value recalculated on every view',
      'Check-in / check-out with an immutable movement history per asset',
      'Consumable inventory with reorder levels and stock movements',
      'Preventive maintenance schedules and work orders with downtime tracking',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'shadcn/ui', 'React Query'],
    facts: [
      { label: 'Asset classes', value: '9' },
      { label: 'Location depth', value: '4 levels' },
      { label: 'Screens', value: '22' },
    ],
    repo: 'https://github.com/Kidussk/asset-flow-weave',
    accent: '#6E8BFF',
    accentSoft: 'rgba(110, 139, 255, 0.14)',
    demoScreens: ['Dashboard', 'Asset register', 'Locations', 'Maintenance'],
  },
  {
    slug: 'ethiotractors',
    name: 'EthioTractors',
    domain: 'ethiotractors.com',
    sector: 'Heavy Machinery Import & Distribution',
    year: '2025',
    tagline: 'A machinery catalogue that turns browsers into quote requests.',
    summary:
      'A public site and staff back office for an importer of agricultural, construction and mining equipment. The catalogue is filterable by sector and searchable by name, every product carries a specification table, and a quote request pre-fills itself with the machine the visitor was looking at.',
    problem:
      'The importer represents three manufacturers across four sectors, but had no way for a farmer in Bahir Dar to see the range or ask for a price. Enquiries arrived as phone calls with no record of what was asked or whether anyone followed up.',
    highlights: [
      'Sector-filtered, searchable catalogue driven entirely from the admin panel',
      'Quote button on each machine pre-fills the enquiry form with that product',
      'Staff back office for products, specifications, images and site settings',
      'Enquiry inbox — every submission captured, attributed and answerable',
      'Anonymous engagement counters showing which machines get quote clicks',
      'Hardened forms: CSRF tokens, honeypot field, per-connection rate limiting',
    ],
    stack: ['PHP', 'MySQL', 'PDO', 'Vanilla JS', 'CSS'],
    facts: [
      { label: 'Brands represented', value: '3' },
      { label: 'Sectors', value: '4' },
      { label: 'Build step', value: 'None' },
    ],
    repo: 'https://github.com/Kidussk/ethiotractors',
    accent: '#E09F36',
    accentSoft: 'rgba(224, 159, 54, 0.16)',
    demoScreens: ['Public site', 'Catalogue', 'Quote request', 'Admin inbox'],
  },
  {
    slug: 'liben',
    name: 'Liben Finishing Technology',
    domain: 'liben.systems',
    sector: 'Glass & Aluminium Contracting',
    year: '2025',
    tagline: 'Lead to handover, plus a proforma invoice with a scannable QR.',
    summary:
      'A project management platform for a glass and aluminium contractor. Projects move through six phases with a per-project command centre for tasks, site logs, procurement and closeout — and finance keeps a branded proforma generator that prints to A4 with a QR code a customer can scan to verify the document.',
    problem:
      'Fabrication, installation and sales each kept their own records. Site supervisors reported progress by phone, procurement approvals happened in person, and proforma invoices were retyped in Word every time — with no way for a customer to check whether one was genuine.',
    highlights: [
      'Projects on a board or a list, six phases from survey to handover',
      'Per-project command centre: tasks, financials, site logs, procurement, closeout',
      'Daily site reports submitted by supervisors and approved by a project manager',
      'Procurement requests with a five-stage approval chain and printable sheets',
      'Capability matrix driving 14 roles — every nav item and button derives from it',
      'Proforma generator with VAT, amount in words, QR verification and A4 print',
    ],
    stack: ['Vanilla JS', 'PHP', 'MySQL', 'SQLite', 'CSS'],
    facts: [
      { label: 'Roles', value: '14' },
      { label: 'Project phases', value: '6' },
      { label: 'Reports', value: '6' },
    ],
    repo: 'https://github.com/Kidussk/liben-proforma',
    accent: '#3E9C8F',
    accentSoft: 'rgba(62, 156, 143, 0.16)',
    demoScreens: ['Project board', 'Command centre', 'Site reports', 'Proforma generator'],
  },
  {
    slug: 'ipms',
    name: 'HU-IPMS',
    domain: 'ipms.edu',
    sector: 'Higher Education',
    year: '2025',
    tagline: 'Final-year projects, from group formation to defence grading.',
    summary:
      'An institutional project management system covering the full final-year lifecycle: students form groups, an advisor is matched, progress is submitted and reviewed, examiners are assigned, defences are scheduled, and grades roll up — with an optional local AI assist for group balancing and scheduling that degrades to deterministic heuristics when it is unavailable.',
    problem:
      'Departments coordinated hundreds of student projects over email and printed forms. Advisor loads were uneven, defence timetables collided, and finished work vanished into a drawer instead of a searchable repository.',
    highlights: [
      'Six role dashboards: student, advisor, examiner, supervisor, department head, admin',
      'GPA-aware group generation with advisor matching by expertise and capacity',
      'Milestone submissions with advisor review, comments and progress rollup',
      'Automatic defence scheduling that respects examiner availability and room conflicts',
      'Weighted grading across advisor and examiner scores with a published transcript',
      'Public repository of completed projects, searchable by year, department and topic',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'JWT'],
    facts: [
      { label: 'Role dashboards', value: '6' },
      { label: 'AI fallback', value: 'Deterministic' },
      { label: 'Auth', value: 'JWT + bcrypt' },
    ],
    repo: 'https://github.com/Kidussk/hu-ipms',
    accent: '#5FB37A',
    accentSoft: 'rgba(95, 179, 122, 0.16)',
    demoScreens: ['Head dashboard', 'Groups & advisors', 'Defence schedule', 'Grading'],
  },
  {
    slug: 'fetansms',
    name: 'FetanSMS',
    domain: 'fetantech.com.et',
    sector: 'Messaging Infrastructure',
    year: '2025',
    tagline: 'Bulk SMS delivered through Android handsets, billed by subscription.',
    summary:
      'A messaging platform in three parts: an Android application that acts as the sending gateway, a PHP API that queues and tracks every message, and a web admin panel for campaigns, contact lists, delivery reporting, subscription plans and bank-transfer payment approval.',
    problem:
      'Small businesses needed to reach customers by SMS without an operator contract or per-message aggregator pricing. The answer was to send through ordinary handsets — which meant building the queue, the retry logic and the billing around them.',
    highlights: [
      'Campaign composer with merge fields, segment targeting and a live cost estimate',
      'Delivery pipeline — queued, sent, delivered, failed — with per-campaign breakdowns',
      'Contact lists with import, deduplication and opt-out handling',
      'Subscription plans with message quotas and usage metering',
      'Bank transfer payments with receipt upload and admin approval',
      'Android gateway app paired to the account, reporting status back to the API',
    ],
    stack: ['Android', 'PHP', 'MySQL', 'Vanilla JS', 'Tailwind'],
    facts: [
      { label: 'Components', value: '3' },
      { label: 'Billing', value: 'Plan + quota' },
      { label: 'Status', value: 'Production' },
    ],
    repo: 'https://github.com/Kidussk/fetansms',
    accent: '#A07CF0',
    accentSoft: 'rgba(160, 124, 240, 0.16)',
    demoScreens: ['Overview', 'Campaigns', 'Contacts', 'Billing'],
  },
  {
    slug: 'unihub',
    name: 'University Hub',
    domain: 'hub.university',
    sector: 'Higher Education',
    year: '2026',
    tagline: 'The academic backbone: structure, timetables, exams, announcements.',
    summary:
      'An administrative console for the parts of a university that everything else depends on — colleges, departments, programmes, batches and sections; the weekly timetable; the exam calendar; and the announcement feed. Built on TanStack Start with file-based routing and a bulk import path for registrar spreadsheets.',
    problem:
      'Registrars maintained the academic structure in spreadsheets that other systems copied by hand. A renamed department or a moved exam propagated slowly, incorrectly, or not at all.',
    highlights: [
      'Academic structure tree: college → department → programme → batch → section',
      'Weekly timetable grid with instructor and room conflict detection',
      'Exam calendar with invigilator assignment and venue capacity checks',
      'Announcement feed targeted by department, batch or section',
      'Bulk import from registrar spreadsheets with a validation preview before commit',
      'Admin management with scoped permissions per college',
    ],
    stack: ['React 19', 'TanStack Start', 'TanStack Router', 'Tailwind v4', 'Cloudflare'],
    facts: [
      { label: 'Structure depth', value: '5 levels' },
      { label: 'Routing', value: 'File-based' },
      { label: 'Edge', value: 'Cloudflare' },
    ],
    repo: 'https://github.com/Kidussk/university-hub-admin',
    accent: '#E4708A',
    accentSoft: 'rgba(228, 112, 138, 0.16)',
    demoScreens: ['Structure', 'Timetable', 'Exams', 'Announcements'],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
