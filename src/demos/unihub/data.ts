/** Demo seed data for the University Hub admin console. All fictional. */

export type Node = {
  id: string
  name: string
  kind: 'college' | 'department' | 'programme' | 'batch' | 'section'
  meta?: string
  children?: Node[]
}

export type Slot = {
  id: string
  day: number // 0 = Monday
  start: number // hour, 24h
  length: number // hours
  course: string
  code: string
  instructor: string
  room: string
  section: string
}

export type Exam = {
  id: string
  course: string
  code: string
  date: string
  time: string
  venue: string
  capacity: number
  registered: number
  invigilators: string[]
}

export type Announcement = {
  id: string
  title: string
  body: string
  author: string
  posted: string
  audience: string
  pinned: boolean
}

export type ImportRow = {
  line: number
  id: string
  name: string
  programme: string
  batch: string
  issue: string | null
}

export const structure: Node[] = [
  {
    id: 'c1',
    name: 'College of Engineering & Technology',
    kind: 'college',
    meta: '4 departments · 2,840 students',
    children: [
      {
        id: 'd1',
        name: 'Computer Science',
        kind: 'department',
        meta: 'Head: Dr. Almaz Wondwosen',
        children: [
          {
            id: 'p1',
            name: 'BSc Computer Science',
            kind: 'programme',
            meta: '4 years · regular',
            children: [
              {
                id: 'b1',
                name: 'Batch 2023 — Year 4',
                kind: 'batch',
                meta: '184 students',
                children: [
                  { id: 'se1', name: 'Section A', kind: 'section', meta: '62 students · Block B 204' },
                  { id: 'se2', name: 'Section B', kind: 'section', meta: '61 students · Block B 206' },
                  { id: 'se3', name: 'Section C', kind: 'section', meta: '61 students · Block B 208' },
                ],
              },
              {
                id: 'b2',
                name: 'Batch 2024 — Year 3',
                kind: 'batch',
                meta: '210 students',
                children: [
                  { id: 'se4', name: 'Section A', kind: 'section', meta: '70 students · Block A 101' },
                  { id: 'se5', name: 'Section B', kind: 'section', meta: '70 students · Block A 103' },
                  { id: 'se6', name: 'Section C', kind: 'section', meta: '70 students · Block A 105' },
                ],
              },
            ],
          },
          {
            id: 'p2',
            name: 'MSc Software Engineering',
            kind: 'programme',
            meta: '2 years · evening',
            children: [
              {
                id: 'b3',
                name: 'Batch 2025 — Year 2',
                kind: 'batch',
                meta: '38 students',
                children: [{ id: 'se7', name: 'Section A', kind: 'section', meta: '38 students · Block C 302' }],
              },
            ],
          },
        ],
      },
      {
        id: 'd2',
        name: 'Electrical & Computer Engineering',
        kind: 'department',
        meta: 'Head: Dr. Yohannes Bekele',
        children: [
          {
            id: 'p3',
            name: 'BSc Electrical Engineering',
            kind: 'programme',
            meta: '5 years · regular',
            children: [
              {
                id: 'b4',
                name: 'Batch 2022 — Year 5',
                kind: 'batch',
                meta: '146 students',
                children: [
                  { id: 'se8', name: 'Section A', kind: 'section', meta: '73 students · Block D 201' },
                  { id: 'se9', name: 'Section B', kind: 'section', meta: '73 students · Block D 203' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'd3',
        name: 'Civil Engineering',
        kind: 'department',
        meta: 'Head: Dr. Meseret Girma',
        children: [
          {
            id: 'p4',
            name: 'BSc Civil Engineering',
            kind: 'programme',
            meta: '5 years · regular',
            children: [
              {
                id: 'b5',
                name: 'Batch 2023 — Year 4',
                kind: 'batch',
                meta: '198 students',
                children: [
                  { id: 'se10', name: 'Section A', kind: 'section', meta: '99 students · Block E 101' },
                  { id: 'se11', name: 'Section B', kind: 'section', meta: '99 students · Block E 103' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    name: 'College of Business & Economics',
    kind: 'college',
    meta: '3 departments · 1,960 students',
    children: [
      {
        id: 'd4',
        name: 'Accounting & Finance',
        kind: 'department',
        meta: 'Head: Mr. Dawit Ayele',
        children: [
          {
            id: 'p5',
            name: 'BA Accounting',
            kind: 'programme',
            meta: '3 years · regular',
            children: [
              {
                id: 'b6',
                name: 'Batch 2024 — Year 2',
                kind: 'batch',
                meta: '240 students',
                children: [
                  { id: 'se12', name: 'Section A', kind: 'section', meta: '80 students · Hall 1' },
                  { id: 'se13', name: 'Section B', kind: 'section', meta: '80 students · Hall 2' },
                  { id: 'se14', name: 'Section C', kind: 'section', meta: '80 students · Hall 3' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16]

export const slots: Slot[] = [
  { id: 'sl1', day: 0, start: 8, length: 2, course: 'Software Engineering', code: 'CoSc4051', instructor: 'Mr. Solomon Desta', room: 'B-204', section: 'CS Y4 A' },
  { id: 'sl2', day: 0, start: 10, length: 2, course: 'Compiler Design', code: 'CoSc4061', instructor: 'Dr. Tesfaye Kassa', room: 'B-204', section: 'CS Y4 A' },
  { id: 'sl3', day: 0, start: 14, length: 3, course: 'Project I — Lab', code: 'CoSc4091', instructor: 'Mrs. Rahel Mekuria', room: 'Lab 2', section: 'CS Y4 A' },
  { id: 'sl4', day: 1, start: 8, length: 2, course: 'Computer Networks', code: 'CoSc4041', instructor: 'Dr. Almaz Wondwosen', room: 'B-206', section: 'CS Y4 A' },
  { id: 'sl5', day: 1, start: 11, length: 2, course: 'Machine Learning', code: 'CoSc4071', instructor: 'Dr. Tesfaye Kassa', room: 'B-204', section: 'CS Y4 A' },
  { id: 'sl6', day: 2, start: 9, length: 2, course: 'Software Engineering', code: 'CoSc4051', instructor: 'Mr. Solomon Desta', room: 'B-204', section: 'CS Y4 A' },
  { id: 'sl7', day: 2, start: 13, length: 2, course: 'Embedded Systems', code: 'CoSc4081', instructor: 'Mr. Bekele Tadesse', room: 'Lab 1', section: 'CS Y4 A' },
  { id: 'sl8', day: 3, start: 8, length: 2, course: 'Machine Learning', code: 'CoSc4071', instructor: 'Dr. Tesfaye Kassa', room: 'B-208', section: 'CS Y4 A' },
  // Deliberate clash with sl8: same instructor, same hour, different room.
  { id: 'sl9', day: 3, start: 8, length: 2, course: 'Data Mining', code: 'CoSc4072', instructor: 'Dr. Tesfaye Kassa', room: 'B-204', section: 'CS Y4 B' },
  { id: 'sl10', day: 3, start: 11, length: 2, course: 'Computer Networks', code: 'CoSc4041', instructor: 'Dr. Almaz Wondwosen', room: 'B-206', section: 'CS Y4 A' },
  { id: 'sl11', day: 4, start: 9, length: 3, course: 'Project I — Supervision', code: 'CoSc4091', instructor: 'Mrs. Rahel Mekuria', room: 'B-210', section: 'CS Y4 A' },
  { id: 'sl12', day: 4, start: 14, length: 2, course: 'Compiler Design — Lab', code: 'CoSc4061', instructor: 'Dr. Tesfaye Kassa', room: 'Lab 3', section: 'CS Y4 A' },
]

export const exams: Exam[] = [
  { id: 'ex1', course: 'Software Engineering', code: 'CoSc4051', date: '2026-09-14', time: '09:00 – 12:00', venue: 'Main Hall', capacity: 220, registered: 184, invigilators: ['Mr. Solomon Desta', 'Mrs. Rahel Mekuria'] },
  { id: 'ex2', course: 'Computer Networks', code: 'CoSc4041', date: '2026-09-16', time: '09:00 – 12:00', venue: 'Block B — 204', capacity: 70, registered: 184, invigilators: ['Dr. Almaz Wondwosen'] },
  { id: 'ex3', course: 'Machine Learning', code: 'CoSc4071', date: '2026-09-18', time: '14:00 – 17:00', venue: 'Main Hall', capacity: 220, registered: 184, invigilators: ['Dr. Tesfaye Kassa', 'Mr. Bekele Tadesse'] },
  { id: 'ex4', course: 'Compiler Design', code: 'CoSc4061', date: '2026-09-21', time: '09:00 – 12:00', venue: 'Main Hall', capacity: 220, registered: 184, invigilators: ['Dr. Tesfaye Kassa', 'Mr. Solomon Desta'] },
  { id: 'ex5', course: 'Embedded Systems', code: 'CoSc4081', date: '2026-09-23', time: '09:00 – 12:00', venue: 'Block D — 201', capacity: 200, registered: 146, invigilators: ['Mr. Bekele Tadesse'] },
]

export const announcements: Announcement[] = [
  {
    id: 'an1',
    title: 'Final examination timetable published',
    body: 'The September examination timetable is now final. Students must carry their identification card to every session. Any clash must be reported to the registrar before 5 September.',
    author: 'Registrar',
    posted: '2026-08-12',
    audience: 'All colleges',
    pinned: true,
  },
  {
    id: 'an2',
    title: 'Project I defence dates — Computer Science',
    body: 'Defence sessions run from 8 to 12 September in Block B. Group leaders should confirm attendance with their advisor by 30 August.',
    author: 'Dr. Almaz Wondwosen',
    posted: '2026-08-11',
    audience: 'CS · Batch 2023',
    pinned: false,
  },
  {
    id: 'an3',
    title: 'Library extended hours during examinations',
    body: 'The main library will open from 07:00 to 23:00 from 7 September until the end of the examination period.',
    author: 'Library Services',
    posted: '2026-08-09',
    audience: 'All colleges',
    pinned: false,
  },
  {
    id: 'an4',
    title: 'Laboratory maintenance — Lab 2 closed Thursday',
    body: 'Lab 2 is closed on Thursday 20 August for equipment maintenance. Affected sessions move to Lab 3.',
    author: 'Mr. Bekele Tadesse',
    posted: '2026-08-07',
    audience: 'CS · Batch 2023 · Section A',
    pinned: false,
  },
]

export const importPreview: ImportRow[] = [
  { line: 2, id: 'ETS0412/16', name: 'Abel Tariku', programme: 'BSc Computer Science', batch: '2023', issue: null },
  { line: 3, id: 'ETS0418/16', name: 'Bethlehem Assefa', programme: 'BSc Computer Science', batch: '2023', issue: null },
  { line: 4, id: 'ETS0421/16', name: 'Caleb Mengistu', programme: 'BSc Computer Science', batch: '2023', issue: null },
  { line: 5, id: 'ETS0418/16', name: 'Bethlehem A.', programme: 'BSc Computer Science', batch: '2023', issue: 'Duplicate university ID — already on line 3' },
  { line: 6, id: 'ETS0433/16', name: 'Dagmawit Solomon', programme: 'BSc Comp Science', batch: '2023', issue: 'Programme not recognised — did you mean “BSc Computer Science”?' },
  { line: 7, id: 'ETS0440/16', name: 'Eyob Girmay', programme: 'BSc Computer Science', batch: '2023', issue: null },
  { line: 8, id: '', name: 'Feven Habtamu', programme: 'BSc Computer Science', batch: '2023', issue: 'University ID is required' },
  { line: 9, id: 'ETS0451/16', name: 'Getnet Alemu', programme: 'BSc Computer Science', batch: '2019', issue: 'Batch 2019 is closed for intake' },
  { line: 10, id: 'ETS0455/16', name: 'Hilina Berhanu', programme: 'BSc Computer Science', batch: '2023', issue: null },
]

/** Two sessions clash when they share an instructor or a room at the same hour. */
export function conflictsIn(list: Slot[]) {
  const found: { a: Slot; b: Slot; reason: string }[] = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i]
      const b = list[j]
      if (a.day !== b.day) continue
      const overlap = a.start < b.start + b.length && b.start < a.start + a.length
      if (!overlap) continue
      if (a.instructor === b.instructor)
        found.push({ a, b, reason: `${a.instructor} is booked twice` })
      else if (a.room === b.room) found.push({ a, b, reason: `Room ${a.room} is double-booked` })
    }
  }
  return found
}
