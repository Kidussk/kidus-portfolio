/** Demo seed data for the Liben Finishing Technology platform. All fictional. */

export type Phase =
  | 'Survey'
  | 'Design'
  | 'Fabrication'
  | 'Installation'
  | 'Snagging'
  | 'Handover'

export type Status = 'Lead' | 'Quoted' | 'Active' | 'On Hold' | 'Completed' | 'Closed'

export type Project = {
  id: string
  code: string
  name: string
  customer: string
  site: string
  status: Status
  phase: Phase
  supervisor: string
  start: string
  target: string
  budget: number
  spent: number
  /** Square metres of glazing scoped and installed so far. */
  scopeM2: number
  doneM2: number
}

export type Task = {
  id: string
  projectId: string
  title: string
  assignee: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'todo' | 'in-progress' | 'blocked' | 'review' | 'done'
  due: string
}

export type SiteReport = {
  id: string
  projectId: string
  date: string
  supervisor: string
  workforce: number
  weather: 'Clear' | 'Rain' | 'Overcast'
  glassM2: number
  work: string
  delay: string
  approval: 'pending' | 'approved' | 'rejected'
}

export type Purchase = {
  id: string
  projectId: string
  item: string
  qty: string
  supplier: string
  amount: number
  stage: 'Draft' | 'Pending' | 'Approved' | 'Ordered' | 'Received'
  raisedBy: string
  raised: string
}

export type CatalogItem = {
  id: string
  description: string
  unit: string
  price: number
}

export const projects: Project[] = [
  {
    id: 'pr1',
    code: 'LFT-2601',
    name: 'Bole Skyline Tower — Curtain Wall',
    customer: 'Skyline Real Estate PLC',
    site: 'Bole, Addis Ababa',
    status: 'Active',
    phase: 'Installation',
    supervisor: 'Bereket Alemu',
    start: '2026-02-10',
    target: '2026-10-30',
    budget: 18_400_000,
    spent: 11_960_000,
    scopeM2: 4200,
    doneM2: 2730,
  },
  {
    id: 'pr2',
    code: 'LFT-2604',
    name: 'Kazanchis Office Refit — Partitions',
    customer: 'Nile Insurance',
    site: 'Kazanchis, Addis Ababa',
    status: 'Active',
    phase: 'Fabrication',
    supervisor: 'Hiwot Girma',
    start: '2026-05-04',
    target: '2026-09-12',
    budget: 6_250_000,
    spent: 2_810_000,
    scopeM2: 1350,
    doneM2: 420,
  },
  {
    id: 'pr3',
    code: 'LFT-2607',
    name: 'Adama Mall — Shopfronts',
    customer: 'Rift Retail Group',
    site: 'Adama',
    status: 'Active',
    phase: 'Snagging',
    supervisor: 'Samson Tadesse',
    start: '2025-11-18',
    target: '2026-08-29',
    budget: 9_800_000,
    spent: 9_120_000,
    scopeM2: 2100,
    doneM2: 2016,
  },
  {
    id: 'pr4',
    code: 'LFT-2609',
    name: 'Hawassa Lakeview Hotel — Glazing',
    customer: 'Lakeview Hospitality',
    site: 'Hawassa',
    status: 'Quoted',
    phase: 'Design',
    supervisor: 'Hiwot Girma',
    start: '2026-09-01',
    target: '2027-03-15',
    budget: 22_500_000,
    spent: 340_000,
    scopeM2: 5100,
    doneM2: 0,
  },
  {
    id: 'pr5',
    code: 'LFT-2611',
    name: 'Megenagna Residence — Balustrades',
    customer: 'Dawit Construction',
    site: 'Megenagna, Addis Ababa',
    status: 'On Hold',
    phase: 'Survey',
    supervisor: 'Bereket Alemu',
    start: '2026-06-22',
    target: '2026-11-20',
    budget: 3_150_000,
    spent: 190_000,
    scopeM2: 640,
    doneM2: 0,
  },
  {
    id: 'pr6',
    code: 'LFT-2588',
    name: 'Piassa Bank Branch — Facade',
    customer: 'Abay Bank',
    site: 'Piassa, Addis Ababa',
    status: 'Completed',
    phase: 'Handover',
    supervisor: 'Samson Tadesse',
    start: '2025-08-05',
    target: '2026-04-18',
    budget: 7_400_000,
    spent: 7_180_000,
    scopeM2: 1580,
    doneM2: 1580,
  },
  {
    id: 'pr7',
    code: 'LFT-2612',
    name: 'CMC Warehouse — Roof Lights',
    customer: 'Horizon Logistics',
    site: 'CMC, Addis Ababa',
    status: 'Lead',
    phase: 'Survey',
    supervisor: 'Unassigned',
    start: '2026-09-15',
    target: '2027-01-30',
    budget: 4_800_000,
    spent: 0,
    scopeM2: 980,
    doneM2: 0,
  },
]

export const tasks: Task[] = [
  { id: 't1', projectId: 'pr1', title: 'Install curtain wall panels — floors 9 to 12', assignee: 'Bereket Alemu', priority: 'High', status: 'in-progress', due: '2026-08-22' },
  { id: 't2', projectId: 'pr1', title: 'Silicone weather sealing — north elevation', assignee: 'Tewodros Assefa', priority: 'Medium', status: 'todo', due: '2026-08-29' },
  { id: 't3', projectId: 'pr1', title: 'Structural glazing test certificate', assignee: 'Hiwot Girma', priority: 'High', status: 'review', due: '2026-08-18' },
  { id: 't4', projectId: 'pr1', title: 'Hoist permit renewal', assignee: 'Bereket Alemu', priority: 'Medium', status: 'blocked', due: '2026-08-16' },
  { id: 't5', projectId: 'pr1', title: 'Shop drawings — floors 13 to 16', assignee: 'Meklit Haile', priority: 'Medium', status: 'done', due: '2026-08-06' },
  { id: 't6', projectId: 'pr2', title: 'Cut and assemble partition frames', assignee: 'Yared Kebede', priority: 'High', status: 'in-progress', due: '2026-08-25' },
  { id: 't7', projectId: 'pr2', title: 'Client sign-off on glass finish sample', assignee: 'Hiwot Girma', priority: 'High', status: 'review', due: '2026-08-19' },
  { id: 't8', projectId: 'pr2', title: 'Order acoustic seals', assignee: 'Selam Worku', priority: 'Low', status: 'todo', due: '2026-09-02' },
  { id: 't9', projectId: 'pr3', title: 'Snag list walkthrough with client', assignee: 'Samson Tadesse', priority: 'High', status: 'in-progress', due: '2026-08-20' },
  { id: 't10', projectId: 'pr3', title: 'Replace scratched panel — unit G12', assignee: 'Tewodros Assefa', priority: 'Medium', status: 'todo', due: '2026-08-24' },
  { id: 't11', projectId: 'pr3', title: 'Compile handover documentation', assignee: 'Meklit Haile', priority: 'Medium', status: 'todo', due: '2026-08-27' },
  { id: 't12', projectId: 'pr4', title: 'Facade design package for approval', assignee: 'Meklit Haile', priority: 'High', status: 'in-progress', due: '2026-08-28' },
]

export const siteReports: SiteReport[] = [
  { id: 'SR-0912', projectId: 'pr1', date: '2026-08-12', supervisor: 'Bereket Alemu', workforce: 18, weather: 'Clear', glassM2: 96, work: 'Panels installed on floor 11 east and south elevations. Two hoist runs completed.', delay: '', approval: 'pending' },
  { id: 'SR-0911', projectId: 'pr1', date: '2026-08-11', supervisor: 'Bereket Alemu', workforce: 16, weather: 'Rain', glassM2: 42, work: 'Wet weather stopped external work at 11:00. Internal sealing continued on floor 10.', delay: 'Rain — half day lost', approval: 'approved' },
  { id: 'SR-0910', projectId: 'pr2', date: '2026-08-11', supervisor: 'Hiwot Girma', workforce: 9, weather: 'Clear', glassM2: 34, work: 'Workshop fabrication of partition frames, batch 3 of 7 completed.', delay: '', approval: 'approved' },
  { id: 'SR-0909', projectId: 'pr3', date: '2026-08-10', supervisor: 'Samson Tadesse', workforce: 6, weather: 'Overcast', glassM2: 18, work: 'Snagging on shopfront units 4 to 9. Three items raised for rework.', delay: '', approval: 'pending' },
  { id: 'SR-0908', projectId: 'pr1', date: '2026-08-10', supervisor: 'Bereket Alemu', workforce: 17, weather: 'Clear', glassM2: 88, work: 'Floor 10 completed and signed off. Materials staged for floor 11.', delay: '', approval: 'approved' },
  { id: 'SR-0907', projectId: 'pr2', date: '2026-08-08', supervisor: 'Hiwot Girma', workforce: 8, weather: 'Clear', glassM2: 28, work: 'Aluminium profile delivery received and checked against the order.', delay: 'Delivery arrived 2 days late', approval: 'approved' },
]

export const purchases: Purchase[] = [
  { id: 'PR-3320', projectId: 'pr1', item: '12 mm toughened glass — clear', qty: '340 m²', supplier: 'Addis Glass Industry', amount: 1_870_000, stage: 'Pending', raisedBy: 'Bereket Alemu', raised: '2026-08-12' },
  { id: 'PR-3319', projectId: 'pr2', item: 'Acoustic seal gasket', qty: '600 m', supplier: 'Seal Trading PLC', amount: 96_000, stage: 'Draft', raisedBy: 'Selam Worku', raised: '2026-08-11' },
  { id: 'PR-3318', projectId: 'pr1', item: 'Structural silicone — 600 ml', qty: '480 tubes', supplier: 'BuildChem Ethiopia', amount: 288_000, stage: 'Approved', raisedBy: 'Bereket Alemu', raised: '2026-08-09' },
  { id: 'PR-3317', projectId: 'pr3', item: 'Replacement shopfront panel', qty: '2 units', supplier: 'Addis Glass Industry', amount: 74_000, stage: 'Ordered', raisedBy: 'Samson Tadesse', raised: '2026-08-07' },
  { id: 'PR-3316', projectId: 'pr2', item: 'Aluminium profile 6063-T6', qty: '2.4 t', supplier: 'Metal Works Import', amount: 1_320_000, stage: 'Received', raisedBy: 'Yared Kebede', raised: '2026-08-01' },
  { id: 'PR-3315', projectId: 'pr1', item: 'Anchor bolts M12 — stainless', qty: '1,800 pcs', supplier: 'Fastener House', amount: 162_000, stage: 'Received', raisedBy: 'Tewodros Assefa', raised: '2026-07-28' },
]

export const catalog: CatalogItem[] = [
  { id: 'c1', description: 'Curtain wall system — unitised, 6 mm + 12A + 6 mm DGU', unit: 'm²', price: 8_900 },
  { id: 'c2', description: 'Aluminium sliding window — 2 track, powder coated', unit: 'm²', price: 4_250 },
  { id: 'c3', description: 'Frameless glass partition — 10 mm toughened', unit: 'm²', price: 5_600 },
  { id: 'c4', description: 'Glass balustrade with stainless handrail', unit: 'm', price: 7_800 },
  { id: 'c5', description: 'Automatic sliding entrance door', unit: 'set', price: 186_000 },
  { id: 'c6', description: 'Aluminium composite panel cladding', unit: 'm²', price: 3_400 },
  { id: 'c7', description: 'Shopfront glazing — 12 mm toughened', unit: 'm²', price: 6_100 },
  { id: 'c8', description: 'Site survey, shop drawings and engineering', unit: 'lot', price: 145_000 },
  { id: 'c9', description: 'Installation, sealing and commissioning', unit: 'lot', price: 320_000 },
]

export const staff = [
  { name: 'Bereket Alemu', role: 'Site Supervisor' },
  { name: 'Hiwot Girma', role: 'Project Manager' },
  { name: 'Samson Tadesse', role: 'Site Supervisor' },
  { name: 'Meklit Haile', role: 'Designer / Draftsman' },
  { name: 'Yared Kebede', role: 'Workshop Supervisor' },
  { name: 'Tewodros Assefa', role: 'Installation Team Leader' },
  { name: 'Selam Worku', role: 'Procurement Officer' },
]

export const phases: Phase[] = [
  'Survey',
  'Design',
  'Fabrication',
  'Installation',
  'Snagging',
  'Handover',
]

export const statusTone: Record<Status, string> = {
  Lead: 'neutral',
  Quoted: 'info',
  Active: 'good',
  'On Hold': 'warn',
  Completed: 'accent',
  Closed: 'neutral',
}

export const VAT_RATE = 0.15

/** Amount in words, as printed on the proforma. */
export function amountInWords(value: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
    'nineteen']
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

  const under1000 = (n: number): string => {
    if (n === 0) return ''
    if (n < 20) return ones[n]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '')
    return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + under1000(n % 100) : '')
  }

  const whole = Math.floor(value)
  const cents = Math.round((value - whole) * 100)
  if (whole === 0) return `zero birr and ${cents}/100`

  const groups: [number, string][] = [
    [1_000_000_000, 'billion'],
    [1_000_000, 'million'],
    [1_000, 'thousand'],
  ]

  let rest = whole
  const parts: string[] = []
  for (const [size, label] of groups) {
    if (rest >= size) {
      parts.push(`${under1000(Math.floor(rest / size))} ${label}`)
      rest %= size
    }
  }
  if (rest) parts.push(under1000(rest))

  const words = parts.join(' ').trim()
  return `${words} birr and ${String(cents).padStart(2, '0')}/100`
}
