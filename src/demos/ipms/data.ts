/** Demo seed data for HU-IPMS. Students, staff and grades are all fictional. */

export type Role = 'head' | 'advisor' | 'student'

export type Student = {
  id: string
  name: string
  gpa: number
  skills: string[]
}

export type Staff = {
  id: string
  name: string
  title: string
  expertise: string[]
  capacity: number
}

export type Group = {
  id: string
  title: string
  members: string[]
  advisorId: string | null
  examinerIds: string[]
  progress: number
  milestone: string
  status: 'forming' | 'advised' | 'in-progress' | 'defended'
}

export type Milestone = {
  id: string
  groupId: string
  name: string
  submitted: string
  state: 'submitted' | 'reviewed' | 'revise'
  comment: string
}

export type Defence = {
  id: string
  groupId: string
  date: string
  slot: string
  room: string
  chair: string
}

export type Grade = {
  groupId: string
  proposal: number
  progressScore: number
  advisorScore: number
  examinerScore: number
}

export type Published = {
  id: string
  title: string
  year: string
  department: string
  authors: string
  abstract: string
  tags: string[]
}

export const students: Student[] = [
  { id: 's01', name: 'Abel Tariku', gpa: 3.82, skills: ['React', 'Node'] },
  { id: 's02', name: 'Bethlehem Assefa', gpa: 3.45, skills: ['Python', 'ML'] },
  { id: 's03', name: 'Caleb Mengistu', gpa: 2.91, skills: ['Java', 'Android'] },
  { id: 's04', name: 'Dagmawit Solomon', gpa: 3.67, skills: ['UI/UX', 'Flutter'] },
  { id: 's05', name: 'Eyob Girmay', gpa: 3.12, skills: ['Networks', 'Linux'] },
  { id: 's06', name: 'Feven Habtamu', gpa: 3.94, skills: ['ML', 'Data'] },
  { id: 's07', name: 'Getnet Alemu', gpa: 2.74, skills: ['PHP', 'MySQL'] },
  { id: 's08', name: 'Hilina Berhanu', gpa: 3.58, skills: ['React', 'Design'] },
  { id: 's09', name: 'Israel Wondimu', gpa: 3.03, skills: ['IoT', 'C'] },
  { id: 's10', name: 'Jerusalem Tekle', gpa: 3.71, skills: ['Security', 'Go'] },
  { id: 's11', name: 'Kena Diriba', gpa: 2.88, skills: ['Android', 'Kotlin'] },
  { id: 's12', name: 'Liya Hailu', gpa: 3.36, skills: ['Data', 'SQL'] },
]

export const staff: Staff[] = [
  { id: 'f1', name: 'Dr. Tesfaye Kassa', title: 'Associate Professor', expertise: ['Machine Learning', 'Data Mining'], capacity: 5 },
  { id: 'f2', name: 'Mr. Solomon Desta', title: 'Lecturer', expertise: ['Web Systems', 'Databases'], capacity: 6 },
  { id: 'f3', name: 'Dr. Almaz Wondwosen', title: 'Assistant Professor', expertise: ['Networks', 'Security'], capacity: 4 },
  { id: 'f4', name: 'Mrs. Rahel Mekuria', title: 'Lecturer', expertise: ['Mobile Computing', 'HCI'], capacity: 5 },
  { id: 'f5', name: 'Mr. Bekele Tadesse', title: 'Lecturer', expertise: ['Embedded Systems', 'IoT'], capacity: 4 },
]

export const groups: Group[] = [
  {
    id: 'g1',
    title: 'Crop disease detection from leaf images',
    members: ['s06', 's02', 's12'],
    advisorId: 'f1',
    examinerIds: ['f3', 'f2'],
    progress: 78,
    milestone: 'Chapter 4 — Implementation',
    status: 'in-progress',
  },
  {
    id: 'g2',
    title: 'Campus resource booking platform',
    members: ['s01', 's08', 's04'],
    advisorId: 'f2',
    examinerIds: ['f4', 'f1'],
    progress: 64,
    milestone: 'Chapter 3 — Design',
    status: 'in-progress',
  },
  {
    id: 'g3',
    title: 'Network intrusion detection for the campus backbone',
    members: ['s10', 's05'],
    advisorId: 'f3',
    examinerIds: ['f1', 'f5'],
    progress: 85,
    milestone: 'Chapter 5 — Testing',
    status: 'in-progress',
  },
  {
    id: 'g4',
    title: 'Offline-first attendance app for rural schools',
    members: ['s11', 's03', 's09'],
    advisorId: 'f4',
    examinerIds: ['f2', 'f5'],
    progress: 41,
    milestone: 'Chapter 2 — Literature review',
    status: 'in-progress',
  },
  {
    id: 'g5',
    title: 'Low-cost soil moisture telemetry',
    members: ['s07'],
    advisorId: null,
    examinerIds: [],
    progress: 8,
    milestone: 'Proposal',
    status: 'forming',
  },
]

export const milestones: Milestone[] = [
  { id: 'm1', groupId: 'g1', name: 'Chapter 4 — Implementation', submitted: '2026-08-11', state: 'submitted', comment: '' },
  { id: 'm2', groupId: 'g2', name: 'Chapter 3 — Design', submitted: '2026-08-10', state: 'submitted', comment: '' },
  { id: 'm3', groupId: 'g3', name: 'Chapter 5 — Testing', submitted: '2026-08-08', state: 'reviewed', comment: 'Good coverage. Add the false-positive analysis before the defence.' },
  { id: 'm4', groupId: 'g4', name: 'Chapter 2 — Literature review', submitted: '2026-08-05', state: 'revise', comment: 'Thirteen of the twenty-two sources are older than 2015. Refresh the survey.' },
  { id: 'm5', groupId: 'g1', name: 'Chapter 3 — Design', submitted: '2026-07-22', state: 'reviewed', comment: 'Architecture accepted. Proceed to implementation.' },
]

export const defences: Defence[] = [
  { id: 'd1', groupId: 'g3', date: '2026-09-08', slot: '09:00 – 10:00', room: 'Block B — 204', chair: 'Dr. Tesfaye Kassa' },
  { id: 'd2', groupId: 'g1', date: '2026-09-08', slot: '10:30 – 11:30', room: 'Block B — 204', chair: 'Dr. Almaz Wondwosen' },
  { id: 'd3', groupId: 'g2', date: '2026-09-09', slot: '09:00 – 10:00', room: 'Block A — 101', chair: 'Mrs. Rahel Mekuria' },
  { id: 'd4', groupId: 'g4', date: '2026-09-09', slot: '13:00 – 14:00', room: 'Block A — 101', chair: 'Mr. Solomon Desta' },
]

export const grades: Grade[] = [
  { groupId: 'g1', proposal: 88, progressScore: 84, advisorScore: 86, examinerScore: 81 },
  { groupId: 'g2', proposal: 79, progressScore: 76, advisorScore: 80, examinerScore: 74 },
  { groupId: 'g3', proposal: 91, progressScore: 89, advisorScore: 93, examinerScore: 88 },
  { groupId: 'g4', proposal: 68, progressScore: 62, advisorScore: 66, examinerScore: 61 },
]

export const published: Published[] = [
  {
    id: 'pb1',
    title: 'Amharic named-entity recognition with a transformer baseline',
    year: '2025',
    department: 'Computer Science',
    authors: 'Mekdes Fikru, Robel Ayele, Sena Tilahun',
    abstract:
      'A labelled corpus of 18,400 Amharic sentences and a fine-tuned transformer that reaches 0.87 F1 on person and location entities.',
    tags: ['NLP', 'Amharic', 'Deep learning'],
  },
  {
    id: 'pb2',
    title: 'Solar-powered cold storage monitoring for smallholder farms',
    year: '2025',
    department: 'Electrical Engineering',
    authors: 'Nahom Tsegaye, Rediet Mulugeta',
    abstract:
      'A low-power sensor node and dashboard that cut post-harvest loss by 22% across three pilot sites over one season.',
    tags: ['IoT', 'Agriculture', 'Embedded'],
  },
  {
    id: 'pb3',
    title: 'A queue-aware triage system for outpatient departments',
    year: '2024',
    department: 'Information Systems',
    authors: 'Selam Girma, Tamirat Bekele, Yeabsira Alem',
    abstract:
      'Simulation and a deployed prototype reducing average outpatient waiting time from 94 to 61 minutes at a referral hospital.',
    tags: ['Healthcare', 'Simulation', 'Web'],
  },
  {
    id: 'pb4',
    title: 'Offline map tiles for field data collection in low-connectivity areas',
    year: '2024',
    department: 'Computer Science',
    authors: 'Betselot Kebede, Hanna Zeleke',
    abstract:
      'A tile-packing scheme and Android client that keeps a 40 MB regional basemap usable without any network connection.',
    tags: ['Mobile', 'GIS', 'Offline'],
  },
]

export const studentById = (id: string) => students.find((s) => s.id === id)!
export const staffById = (id: string | null) => (id ? staff.find((s) => s.id === id) ?? null : null)

export const groupGpa = (g: Group) =>
  g.members.reduce((s, id) => s + studentById(id).gpa, 0) / Math.max(1, g.members.length)

/** Weighted final mark: proposal 15%, progress 25%, advisor 30%, examiner 30%. */
export const finalMark = (g: Grade) =>
  g.proposal * 0.15 + g.progressScore * 0.25 + g.advisorScore * 0.3 + g.examinerScore * 0.3

export const letter = (mark: number) =>
  mark >= 90 ? 'A+' : mark >= 85 ? 'A' : mark >= 80 ? 'A−' : mark >= 75 ? 'B+' : mark >= 70 ? 'B' : mark >= 65 ? 'B−' : mark >= 60 ? 'C+' : 'C'
