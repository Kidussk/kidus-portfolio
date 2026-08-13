import { useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronRight,
  FileSpreadsheet,
  Megaphone,
  Network,
  Pin,
  TriangleAlert,
  Users,
  Check,
  X,
  Building2,
  GraduationCap,
  Layers,
} from 'lucide-react'
import { DemoShell, type DemoProps, type NavItem } from '../DemoShell'
import {
  Badge,
  Btn,
  Empty,
  Panel,
  PanelHead,
  Progress,
  Row,
  Segmented,
  Stat,
  StatRow,
  Table,
  TableWrap,
  TD,
  TH,
  cx,
  shortDate,
  useToast,
  type Tone,
} from '../kit'
import {
  announcements as seedAnnouncements,
  conflictsIn,
  days,
  exams,
  hours,
  importPreview,
  slots as seedSlots,
  structure,
  type Announcement,
  type Node,
  type Slot,
} from './data'

const nav: NavItem[] = [
  { key: 'structure', label: 'Academic structure', icon: <Network size={16} /> },
  { key: 'timetable', label: 'Timetable', icon: <CalendarDays size={16} />, badge: 1 },
  { key: 'exams', label: 'Exams', icon: <GraduationCap size={16} />, badge: 1 },
  { key: 'announcements', label: 'Announcements', icon: <Megaphone size={16} /> },
  { key: 'import', label: 'Bulk import', icon: <FileSpreadsheet size={16} /> },
]

const titles: Record<string, [string, string]> = {
  structure: ['Academic structure', 'College → department → programme → batch → section'],
  timetable: ['Weekly timetable', 'Instructor and room conflicts are detected as you edit'],
  exams: ['Exam calendar', 'Venue capacity and invigilator assignment'],
  announcements: ['Announcements', 'Targeted by college, department, batch or section'],
  import: ['Bulk import', 'Validate a registrar spreadsheet before anything is written'],
}

export default function UniHubDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('structure')
  const [slots, setSlots] = useState<Slot[]>(seedSlots)
  const [announcements, setAnnouncements] = useState<Announcement[]>(seedAnnouncements)
  const [title, subtitle] = titles[screen]

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={screen}
      onNavigate={setScreen}
      title={title}
      subtitle={subtitle}
      user={{ name: 'Registrar Office', role: 'System Administrator' }}
    >
      {screen === 'structure' && <Structure />}
      {screen === 'timetable' && <Timetable slots={slots} setSlots={setSlots} />}
      {screen === 'exams' && <Exams />}
      {screen === 'announcements' && (
        <Announcements items={announcements} setItems={setAnnouncements} />
      )}
      {screen === 'import' && <Import />}
    </DemoShell>
  )
}

/* =================================================================== *
 * Academic structure
 * =================================================================== */

const kindIcon: Record<Node['kind'], typeof Building2> = {
  college: Building2,
  department: Network,
  programme: GraduationCap,
  batch: Layers,
  section: Users,
}

function Structure() {
  const [open, setOpen] = useState<Set<string>>(new Set(['c1', 'd1', 'p1']))

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const counts = useMemo(() => {
    const tally = { college: 0, department: 0, programme: 0, batch: 0, section: 0 }
    const walk = (nodes: Node[]) =>
      nodes.forEach((n) => {
        tally[n.kind]++
        if (n.children) walk(n.children)
      })
    walk(structure)
    return tally
  }, [])

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Colleges" value={counts.college} icon={<Building2 size={14} />} />
        <Stat label="Departments" value={counts.department} icon={<Network size={14} />} />
        <Stat label="Programmes" value={counts.programme} icon={<GraduationCap size={14} />} />
        <Stat label="Sections" value={counts.section} icon={<Users size={14} />} />
      </StatRow>

      <Panel>
        <PanelHead
          title="Structure tree"
          hint="Everything downstream — timetables, exams, announcements — is scoped to a node in this tree"
          right={
            <Btn
              onClick={() =>
                setOpen((prev) => (prev.size ? new Set() : new Set(['c1', 'd1', 'p1', 'b1', 'c2'])))
              }
            >
              {open.size ? 'Collapse all' : 'Expand all'}
            </Btn>
          }
        />
        <ul className="space-y-1">
          {structure.map((n) => (
            <TreeNode key={n.id} node={n} depth={0} open={open} toggle={toggle} />
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function TreeNode({
  node,
  depth,
  open,
  toggle,
}: {
  node: Node
  depth: number
  open: Set<string>
  toggle: (id: string) => void
}) {
  const Icon = kindIcon[node.kind]
  const expandable = !!node.children?.length
  const isOpen = open.has(node.id)

  return (
    <li>
      <button
        onClick={() => expandable && toggle(node.id)}
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
        className={cx(
          'flex w-full items-center gap-2.5 rounded-lg py-2 pr-3 text-left transition-colors',
          expandable ? 'hover:bg-ink-800' : 'cursor-default',
        )}
      >
        <ChevronRight
          size={14}
          className={cx(
            'shrink-0 transition-transform',
            expandable ? 'text-chalk-500' : 'invisible',
            isOpen && 'rotate-90',
          )}
        />
        <Icon
          size={15}
          className={cx('shrink-0', depth === 0 ? 'text-[var(--accent)]' : 'text-chalk-600')}
        />
        <span
          className={cx(
            'min-w-0 flex-1 truncate',
            depth === 0
              ? 'text-[14px] font-semibold text-chalk-50'
              : depth === 1
                ? 'text-[13px] font-medium text-chalk-100'
                : 'text-[13px] text-chalk-300',
          )}
        >
          {node.name}
        </span>
        {node.meta && (
          <span className="hidden shrink-0 text-[11.5px] text-chalk-600 sm:block">{node.meta}</span>
        )}
        <Badge tone={depth === 0 ? 'accent' : 'neutral'}>{node.kind}</Badge>
      </button>
      {isOpen && node.children && (
        <ul className="space-y-1">
          {node.children.map((c) => (
            <TreeNode key={c.id} node={c} depth={depth + 1} open={open} toggle={toggle} />
          ))}
        </ul>
      )}
    </li>
  )
}

/* =================================================================== *
 * Timetable
 * =================================================================== */

function Timetable({
  slots,
  setSlots,
}: {
  slots: Slot[]
  setSlots: (fn: (prev: Slot[]) => Slot[]) => void
}) {
  const toast = useToast()
  const conflicts = useMemo(() => conflictsIn(slots), [slots])
  const clashing = new Set(conflicts.flatMap((c) => [c.a.id, c.b.id]))

  const resolve = () => {
    if (!conflicts.length) return
    const { b } = conflicts[0]
    setSlots((prev) => prev.map((s) => (s.id === b.id ? { ...s, day: 4, start: 11 } : s)))
    toast(`${b.code} moved to Friday 11:00 — the clash is resolved`)
  }

  return (
    <div className="space-y-4">
      {conflicts.length > 0 ? (
        <Panel className="border-rose-500/30 bg-rose-500/6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-3">
              <TriangleAlert size={18} className="mt-0.5 shrink-0 text-rose-400" />
              <div>
                <h3 className="text-[14px] font-semibold text-rose-200">
                  {conflicts.length} scheduling conflict{conflicts.length === 1 ? '' : 's'}
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {conflicts.map((c, i) => (
                    <li key={i} className="text-[12.5px] text-rose-300/85">
                      {c.reason} — {c.a.code} and {c.b.code} on {days[c.a.day]} at{' '}
                      {String(c.a.start).padStart(2, '0')}:00
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Btn variant="solid" onClick={resolve}>
              Move the later session
            </Btn>
          </div>
        </Panel>
      ) : (
        <Panel className="border-emerald-500/30 bg-emerald-500/6">
          <div className="flex items-center gap-3">
            <Check size={18} className="shrink-0 text-emerald-400" />
            <p className="text-[13.5px] text-emerald-200">
              No instructor or room is double-booked in this timetable.
            </p>
          </div>
        </Panel>
      )}

      <Panel pad={false}>
        <div className="scroll-slim overflow-x-auto p-4 sm:p-5">
          <div className="min-w-[52rem]">
            <div
              className="grid gap-px rounded-lg bg-ink-700"
              style={{ gridTemplateColumns: `4rem repeat(${days.length}, 1fr)` }}
            >
              <div className="bg-ink-850 px-2 py-2.5" />
              {days.map((d) => (
                <div
                  key={d}
                  className="bg-ink-850 px-2 py-2.5 text-center text-[11.5px] font-semibold tracking-wide text-chalk-300 uppercase"
                >
                  {d}
                </div>
              ))}

              {hours.map((h) => (
                <Hour key={h} hour={h} slots={slots} clashing={clashing} />
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function Hour({
  hour,
  slots,
  clashing,
}: {
  hour: number
  slots: Slot[]
  clashing: Set<string>
}) {
  return (
    <>
      <div className="tabular bg-ink-900 px-2 py-3 text-right text-[11px] text-chalk-600">
        {String(hour).padStart(2, '0')}:00
      </div>
      {days.map((_, day) => {
        const starting = slots.find((s) => s.day === day && s.start === hour)
        const covered = slots.find(
          (s) => s.day === day && hour > s.start && hour < s.start + s.length,
        )
        if (covered) return <div key={day} className="bg-ink-900" />
        return (
          <div key={day} className="bg-ink-900 p-1">
            {starting && (
              <div
                className={cx(
                  'h-full rounded-md border border-l-2 px-2 py-1.5',
                  clashing.has(starting.id)
                    ? 'border-rose-500/50 border-l-rose-400 bg-rose-500/14'
                    : 'border-ink-600 border-l-[var(--accent)] bg-ink-850',
                )}
                style={{ minHeight: `${starting.length * 2.6}rem` }}
              >
                <p
                  className={cx(
                    'text-[11.5px] leading-snug font-semibold',
                    clashing.has(starting.id) ? 'text-rose-200' : 'text-chalk-50',
                  )}
                >
                  {starting.course}
                </p>
                <p className="tabular mt-0.5 font-mono text-[10px] text-chalk-500">
                  {starting.code} · {starting.room}
                </p>
                <p className="mt-1 truncate text-[10.5px] text-chalk-500">{starting.instructor}</p>
                {clashing.has(starting.id) && (
                  <p className="mt-1 text-[10px] font-semibold text-rose-300">Conflict</p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

/* =================================================================== *
 * Exams
 * =================================================================== */

function Exams() {
  const over = exams.filter((e) => e.registered > e.capacity)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Scheduled exams" value={exams.length} icon={<GraduationCap size={14} />} />
        <Stat label="Over capacity" value={over.length} icon={<TriangleAlert size={14} />} />
        <Stat
          label="Invigilators assigned"
          value={new Set(exams.flatMap((e) => e.invigilators)).size}
        />
        <Stat label="Exam window" value="14 – 23 Sep" />
      </StatRow>

      {over.length > 0 && (
        <Panel className="border-amber-500/30 bg-amber-500/6">
          <div className="flex gap-3">
            <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-400" />
            <div>
              <h3 className="text-[14px] font-semibold text-amber-200">
                Venue capacity exceeded
              </h3>
              {over.map((e) => (
                <p key={e.id} className="mt-1 text-[12.5px] text-amber-300/85">
                  {e.code} — {e.registered} registered for {e.venue}, which seats {e.capacity}. Split
                  the sitting or move it to the Main Hall.
                </p>
              ))}
            </div>
          </div>
        </Panel>
      )}

      <Panel>
        <PanelHead title="Exam calendar" hint="Capacity is checked against registration counts" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Course</TH>
                <TH>Date</TH>
                <TH className="hidden sm:table-cell">Time</TH>
                <TH className="hidden md:table-cell">Venue</TH>
                <TH className="w-40">Capacity</TH>
                <TH className="hidden lg:table-cell">Invigilators</TH>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => {
                const pct = (e.registered / e.capacity) * 100
                const bad = e.registered > e.capacity
                return (
                  <Row key={e.id}>
                    <TD>
                      <p className="font-medium text-chalk-100">{e.course}</p>
                      <p className="tabular font-mono text-[11px] text-chalk-600">{e.code}</p>
                    </TD>
                    <TD className="tabular">{shortDate(e.date)}</TD>
                    <TD className="tabular hidden sm:table-cell text-[12px]">{e.time}</TD>
                    <TD className="hidden md:table-cell">{e.venue}</TD>
                    <TD>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.min(100, pct)}
                          tone={bad ? '#f43f5e' : undefined}
                          className="flex-1"
                        />
                        <span
                          className={cx(
                            'tabular w-16 shrink-0 text-right text-[11px]',
                            bad ? 'text-rose-400' : 'text-chalk-500',
                          )}
                        >
                          {e.registered}/{e.capacity}
                        </span>
                      </div>
                    </TD>
                    <TD className="hidden lg:table-cell text-[12px]">
                      {e.invigilators.join(', ')}
                    </TD>
                  </Row>
                )
              })}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Announcements
 * =================================================================== */

function Announcements({
  items,
  setItems,
}: {
  items: Announcement[]
  setItems: (fn: (prev: Announcement[]) => Announcement[]) => void
}) {
  const toast = useToast()
  const [audience, setAudience] = useState('all')
  const audiences = Array.from(new Set(items.map((a) => a.audience)))

  const shown = items
    .filter((a) => audience === 'all' || a.audience === audience)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned))

  const togglePin = (a: Announcement) => {
    setItems((prev) => prev.map((x) => (x.id === a.id ? { ...x, pinned: !x.pinned } : x)))
    toast(a.pinned ? 'Unpinned' : 'Pinned to the top of the feed')
  }

  return (
    <div className="space-y-4">
      <Panel>
        <PanelHead
          title="Feed"
          hint="An announcement reaches exactly the branch of the structure tree it targets"
          right={
            <Segmented
              value={audience}
              onChange={setAudience}
              options={[
                { value: 'all', label: 'All' },
                ...audiences.map((a) => ({ value: a, label: a })),
              ]}
            />
          }
        />
        {shown.length === 0 ? (
          <Empty>No announcements for that audience.</Empty>
        ) : (
          <ul className="space-y-3">
            {shown.map((a) => (
              <li
                key={a.id}
                className={cx(
                  'rounded-lg border p-4',
                  a.pinned ? 'border-[var(--accent)]/40 bg-[var(--accent-soft)]' : 'border-ink-700 bg-ink-900',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[14.5px] font-semibold text-chalk-50">{a.title}</h3>
                      {a.pinned && <Badge tone="accent">Pinned</Badge>}
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-chalk-600">
                      {a.author} · {shortDate(a.posted)} · to {a.audience}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePin(a)}
                    aria-label={a.pinned ? 'Unpin' : 'Pin'}
                    className={cx(
                      'shrink-0 rounded-lg p-1.5 transition-colors',
                      a.pinned
                        ? 'text-[var(--accent)] hover:bg-ink-800'
                        : 'text-chalk-600 hover:bg-ink-800 hover:text-chalk-200',
                    )}
                  >
                    <Pin size={15} />
                  </button>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-chalk-400">{a.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Bulk import
 * =================================================================== */

function Import() {
  const toast = useToast()
  const [committed, setCommitted] = useState(false)
  const bad = importPreview.filter((r) => r.issue)
  const good = importPreview.filter((r) => !r.issue)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Rows parsed" value={importPreview.length} icon={<FileSpreadsheet size={14} />} />
        <Stat label="Ready to import" value={good.length} />
        <Stat label="Rejected" value={bad.length} icon={<TriangleAlert size={14} />} />
        <Stat label="Committed" value={committed ? good.length : 0} />
      </StatRow>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <FileSpreadsheet size={18} />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-chalk-50">
                cs-batch-2023-intake.xlsx
              </p>
              <p className="text-[11.5px] text-chalk-600">
                9 data rows · uploaded 13 Aug 2026 · nothing has been written yet
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Btn
              variant="solid"
              size="md"
              disabled={committed}
              onClick={() => {
                setCommitted(true)
                toast(`${good.length} students imported, ${bad.length} rows skipped`)
              }}
            >
              {committed ? 'Imported' : `Import ${good.length} valid rows`}
            </Btn>
            <Btn size="md">Download error report</Btn>
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Validation preview"
          hint="Every row is checked against the structure tree before a single record is created"
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Line</TH>
                <TH>University ID</TH>
                <TH>Name</TH>
                <TH className="hidden md:table-cell">Programme</TH>
                <TH className="hidden sm:table-cell">Batch</TH>
                <TH>Result</TH>
              </tr>
            </thead>
            <tbody>
              {importPreview.map((r) => (
                <Row key={r.line}>
                  <TD className="tabular text-chalk-600">{r.line}</TD>
                  <TD className="tabular font-mono text-[12px]">
                    {r.id || <span className="text-rose-400">missing</span>}
                  </TD>
                  <TD className="font-medium text-chalk-100">{r.name}</TD>
                  <TD className="hidden md:table-cell">{r.programme}</TD>
                  <TD className="tabular hidden sm:table-cell">{r.batch}</TD>
                  <TD>
                    {r.issue ? (
                      <span className="flex items-start gap-1.5 text-[12px] text-rose-300">
                        <X size={13} className="mt-0.5 shrink-0" />
                        {r.issue}
                      </span>
                    ) : (
                      <Badge tone={(committed ? 'good' : 'info') as Tone} dot>
                        {committed ? 'Imported' : 'Valid'}
                      </Badge>
                    )}
                  </TD>
                </Row>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </div>
  )
}
