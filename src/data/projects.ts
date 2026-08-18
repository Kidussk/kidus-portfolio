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
      'A multi-branch asset register that tracks physical and digital property from procurement through depreciation to disposal. Assets live in rooms, rooms sit inside floors and buildings, every room has a responsible officer — so "where is it and who signed for it" is always one click away.',
    problem:
      'A company with several branches had its equipment recorded across a dozen spreadsheets. Nobody could say what a branch owned, what it was still worth, or who had signed for it — and audits meant walking the building with a printout.',
    highlights: [
      'Branch → building → floor → room → asset hierarchy with a responsible officer at every level',
      'Full lifecycle: procurement, registration, assignment, transfer, maintenance, disposal',
      'Straight-line depreciation with book value recalculated on every view',
      'Purchase order approval workflow: request → manager → finance → PO → delivery → inspection',
      'Barcode generation for every registered asset',
      'Preventive maintenance schedules and work orders with downtime tracking',
    ],
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'shadcn/ui', 'Recharts', 'React Hook Form', 'Zod'],
    facts: [
      { label: 'Asset categories', value: '8' },
      { label: 'Roles', value: '8' },
      { label: 'Screens', value: '20' },
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
      'A public site and staff back office for an importer of agricultural, construction and power equipment. The catalogue is filterable by sector and searchable by name, every product carries a specification table, and a quote request pre-fills itself with the machine the visitor was looking at.',
    problem:
      'The importer represents three manufacturers across three sectors, but had no way for a farmer in Bahir Dar to see the range or ask for a price. Enquiries arrived as phone calls with no record of what was asked or whether anyone followed up.',
    highlights: [
      'Sector-filtered, searchable catalogue driven entirely from the admin panel',
      'Quote button on each machine pre-fills the enquiry form with that product',
      'Staff back office for products, specifications, images and site settings',
      'Enquiry inbox — every submission captured, attributed and answerable',
      'Catalog versioning with auto-seed for new product lines',
      'Hardened forms: CSRF tokens, honeypot field, per-connection rate limiting',
    ],
    stack: ['PHP 8', 'MySQL', 'PDO', 'Vanilla JS', 'CSS'],
    facts: [
      { label: 'Brands represented', value: '3' },
      { label: 'Sectors', value: '3' },
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
      'Proforma generator with VAT, amount in words, QR verification and A4 print',
      'Telegram bot integration for real-time notifications',
    ],
    stack: ['Vanilla JS', 'PHP 8', 'MySQL', 'CSS'],
    facts: [
      { label: 'Roles', value: '4' },
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
      'An institutional project management system covering the full final-year lifecycle: students form groups, titles are submitted with AI similarity scoring, an advisor is matched, progress is submitted and reviewed, examiners are assigned, defences are scheduled, and grades roll up with weighted scoring across advisor and examiner evaluations.',
    problem:
      'Departments coordinated hundreds of student projects over email and printed forms. Advisor loads were uneven, defence timetables collided, and finished work vanished into a drawer instead of a searchable repository.',
    highlights: [
      'Seven role dashboards: student, advisor, examiner, supervisor, department head, faculty head, admin',
      'Title submission with AI-powered similarity scoring to detect duplicate topics',
      'Milestone submissions with advisor review, comments and progress rollup',
      'Automatic defence scheduling that respects examiner availability and room conflicts',
      'Weighted grading across advisor and examiner scores with a published transcript',
      'CSV import for students and staff, group chat, and DOCX export',
    ],
    stack: ['React 18', 'TypeScript', 'shadcn/ui', 'Tailwind', 'Node.js', 'Express', 'MySQL', 'JWT'],
    facts: [
      { label: 'Role dashboards', value: '7' },
      { label: 'AI scoring', value: 'Title similarity' },
      { label: 'Auth', value: 'JWT + bcrypt' },
    ],
    repo: 'https://github.com/Kidussk/HU-IPMS',
    accent: '#5FB37A',
    accentSoft: 'rgba(95, 179, 122, 0.16)',
    demoScreens: ['Head dashboard', 'Groups & advisors', 'Defence schedule', 'Grading'],
  },
  {
    slug: 'fetansms',
    name: 'FetanSMS',
    domain: 'fetantech.com.et',
    sector: 'Business SMS Monitoring',
    year: '2025',
    tagline: 'Intercept incoming SMS, forward to Telegram, manage branches.',
    summary:
      'An Android application that intercepts incoming SMS messages and forwards them to Telegram channels for real-time business monitoring. Built for companies that need every sales notification, payment alert or customer message captured, attributed to a branch and sales person, and delivered to the right Telegram group — with subscription billing and multi-language support.',
    problem:
      'Small businesses relied on checking each handset manually for incoming SMS notifications — payment confirmations, delivery alerts, customer enquiries. Messages were missed, not attributed to the right branch, and there was no searchable record of what came in.',
    highlights: [
      'SMS interception engine that captures and forwards incoming messages to Telegram',
      'Corporate multi-branch management with sales person assignment per branch',
      'Telegram bot integration with per-branch channel routing',
      'Subscription plans with payment submission and admin approval workflow',
      'Exception number filtering to skip personal or irrelevant messages',
      'Multi-language support: English, Amharic and Oromo',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Retrofit', 'PHP'],
    facts: [
      { label: 'Version', value: '1.3.0' },
      { label: 'DB migrations', value: '14' },
      { label: 'Languages', value: '3' },
    ],
    repo: 'https://github.com/Kidussk/FetanSMS',
    accent: '#A07CF0',
    accentSoft: 'rgba(160, 124, 240, 0.16)',
    demoScreens: ['Home', 'Branches', 'Telegram setup', 'Subscription'],
  },
  {
    slug: 'unihub',
    name: 'University Hub',
    domain: 'hub.university',
    sector: 'Higher Education',
    year: '2025',
    tagline: 'The academic backbone: departments, timetables, exams, announcements.',
    summary:
      'An administrative console for the parts of a university that everything else depends on — departments, batches and sections; the weekly timetable; the exam calendar; and the announcement feed. Built on TanStack Start with file-based routing and deployed to Cloudflare Workers.',
    problem:
      'Registrars maintained the academic structure in spreadsheets that other systems copied by hand. A renamed department or a moved exam propagated slowly, incorrectly, or not at all.',
    highlights: [
      'Academic structure tree: department → batch → section with student counts',
      'Weekly timetable grid with instructor and room conflict detection',
      'Exam calendar with invigilator assignment and venue capacity checks',
      'Announcement feed targeted by department, batch or section',
      'Bulk import from registrar spreadsheets with a validation preview before commit',
      'Role-scoped admin management: super admin and department admin',
    ],
    stack: ['React 19', 'TanStack Start', 'TanStack Router', 'shadcn/ui', 'Tailwind v4', 'Recharts', 'Cloudflare Workers'],
    facts: [
      { label: 'Structure depth', value: '3 levels' },
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
