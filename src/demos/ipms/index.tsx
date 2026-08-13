import { useMemo, useState } from 'react'
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Search,
  Sparkles,
  Users,
  UserCheck,
  FileCheck2,
  Check,
  RotateCcw,
} from 'lucide-react'
import { DemoShell, type DemoProps, type NavItem } from '../DemoShell'
import {
  Badge,
  Btn,
  Empty,
  Field,
  Input,
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
} from '../kit'
import {
  defences,
  finalMark,
  groupGpa,
  grades,
  groups as seedGroups,
  letter,
  milestones as seedMilestones,
  published,
  staff,
  staffById,
  studentById,
  students,
  type Group,
  type Milestone,
  type Role,
} from './data'

const roleMeta: Record<Role, { label: string; user: { name: string; role: string } }> = {
  head: {
    label: 'Department Head',
    user: { name: 'Dr. Almaz Wondwosen', role: 'Department Head' },
  },
  advisor: { label: 'Advisor', user: { name: 'Mr. Solomon Desta', role: 'Advisor · Lecturer' } },
  student: { label: 'Student', user: { name: 'Abel Tariku', role: 'Student · CS 4th year' } },
}

const navByRole: Record<Role, NavItem[]> = {
  head: [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { key: 'groups', label: 'Groups', icon: <Users size={16} />, badge: 5 },
    { key: 'advisors', label: 'Advisor load', icon: <UserCheck size={16} /> },
    { key: 'schedule', label: 'Defence schedule', icon: <CalendarDays size={16} /> },
    { key: 'grading', label: 'Grading', icon: <GraduationCap size={16} /> },
    { key: 'repository', label: 'Repository', icon: <BookOpen size={16} /> },
  ],
  advisor: [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { key: 'groups', label: 'My groups', icon: <Users size={16} /> },
    { key: 'submissions', label: 'Submissions', icon: <FileCheck2 size={16} />, badge: 2 },
    { key: 'schedule', label: 'Defence schedule', icon: <CalendarDays size={16} /> },
  ],
  student: [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { key: 'submissions', label: 'My submissions', icon: <FileCheck2 size={16} /> },
    { key: 'schedule', label: 'My defence', icon: <CalendarDays size={16} /> },
    { key: 'repository', label: 'Repository', icon: <BookOpen size={16} /> },
  ],
}

export default function IpmsDemo({ project }: DemoProps) {
  const [role, setRole] = useState<Role>('head')
  const [screen, setScreen] = useState('overview')
  const [groups, setGroups] = useState<Group[]>(seedGroups)
  const [milestones, setMilestones] = useState<Milestone[]>(seedMilestones)

  const nav = navByRole[role]
  const active = nav.some((n) => n.key === screen) ? screen : 'overview'

  const switchRole = (r: Role) => {
    setRole(r)
    setScreen('overview')
  }

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={active}
      onNavigate={setScreen}
      title={nav.find((n) => n.key === active)?.label ?? 'Overview'}
      subtitle={`Signed in as ${roleMeta[role].label} — the navigation and every screen derive from this role`}
      user={roleMeta[role].user}
      actions={
        <Segmented
          value={role}
          onChange={switchRole}
          options={[
            { value: 'head', label: 'Head' },
            { value: 'advisor', label: 'Advisor' },
            { value: 'student', label: 'Student' },
          ]}
        />
      }
    >
      {active === 'overview' && <Overview role={role} groups={groups} milestones={milestones} />}
      {active === 'groups' && <Groups role={role} groups={groups} setGroups={setGroups} />}
      {active === 'advisors' && <Advisors groups={groups} />}
      {active === 'submissions' && (
        <Submissions role={role} groups={groups} milestones={milestones} setMilestones={setMilestones} />
      )}
      {active === 'schedule' && <Schedule role={role} groups={groups} />}
      {active === 'grading' && <Grading groups={groups} />}
      {active === 'repository' && <Repository />}
    </DemoShell>
  )
}

/* =================================================================== *
 * Overview — one per role
 * =================================================================== */

function Overview({
  role,
  groups,
  milestones,
}: {
  role: Role
  groups: Group[]
  milestones: Milestone[]
}) {
  if (role === 'student') {
    const mine = groups[1]
    const myMilestones = milestones.filter((m) => m.groupId === mine.id)
    const defence = defences.find((d) => d.groupId === mine.id)
    return (
      <div className="space-y-4">
        <Panel>
          <PanelHead title="Your project" hint={`Group ${mine.id.toUpperCase()}`} />
          <h3 className="text-lg font-semibold text-chalk-50">{mine.title}</h3>
          <p className="mt-1.5 text-[13px] text-chalk-500">
            Advised by {staffById(mine.advisorId)?.name ?? 'not yet assigned'}
          </p>
          <div className="mt-5">
            <div className="flex items-end justify-between">
              <p className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                Overall progress
              </p>
              <p className="tabular text-[13px] font-medium text-chalk-100">{mine.progress}%</p>
            </div>
            <Progress value={mine.progress} className="mt-2 h-2" />
            <p className="mt-2 text-[12px] text-chalk-500">Current milestone · {mine.milestone}</p>
          </div>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <PanelHead title="Your group" />
            <ul className="space-y-2.5">
              {mine.members.map((id) => {
                const s = studentById(id)
                return (
                  <li key={id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-medium text-chalk-100">{s.name}</p>
                      <p className="text-[11px] text-chalk-600">{s.skills.join(' · ')}</p>
                    </div>
                    <span className="tabular text-[13px] text-chalk-400">GPA {s.gpa.toFixed(2)}</span>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel>
            <PanelHead title="Defence" hint="Scheduled automatically by the department" />
            {defence ? (
              <div className="space-y-2 text-[13px]">
                <p className="text-lg font-semibold text-chalk-50">{shortDate(defence.date)}</p>
                <p className="text-chalk-300">{defence.slot}</p>
                <p className="text-chalk-500">{defence.room}</p>
                <p className="mt-3 border-t border-ink-800 pt-3 text-[12px] text-chalk-500">
                  Chair · {defence.chair}
                </p>
              </div>
            ) : (
              <Empty>Not yet scheduled.</Empty>
            )}
          </Panel>
        </div>

        <Panel>
          <PanelHead title="Recent feedback" hint="From your advisor" />
          <ul className="space-y-2.5">
            {myMilestones.map((m) => (
              <li key={m.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-medium text-chalk-100">{m.name}</p>
                  <Badge tone={m.state === 'reviewed' ? 'good' : m.state === 'revise' ? 'warn' : 'info'} dot>
                    {m.state}
                  </Badge>
                </div>
                <p className="mt-1.5 text-[12.5px] text-chalk-500">
                  {m.comment || 'Awaiting review.'}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    )
  }

  if (role === 'advisor') {
    const mine = groups.filter((g) => g.advisorId === 'f2')
    const queue = milestones.filter(
      (m) => m.state === 'submitted' && mine.some((g) => g.id === m.groupId),
    )
    return (
      <div className="space-y-4">
        <StatRow>
          <Stat label="Groups advised" value={mine.length} sub="Capacity 6" icon={<Users size={14} />} />
          <Stat label="Awaiting review" value={queue.length} icon={<FileCheck2 size={14} />} />
          <Stat
            label="Average progress"
            value={`${Math.round(mine.reduce((s, g) => s + g.progress, 0) / Math.max(1, mine.length))}%`}
          />
          <Stat label="Defences upcoming" value={defences.filter((d) => mine.some((g) => g.id === d.groupId)).length} />
        </StatRow>

        <Panel>
          <PanelHead title="Groups you advise" />
          <div className="space-y-3">
            {mine.map((g) => (
              <div key={g.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[13.5px] font-medium text-chalk-100">{g.title}</p>
                  <Badge tone="accent">{g.milestone}</Badge>
                </div>
                <p className="mt-1.5 text-[11.5px] text-chalk-600">
                  {g.members.map((id) => studentById(id).name).join(' · ')}
                </p>
                <Progress value={g.progress} className="mt-3" />
              </div>
            ))}
            {mine.length === 0 && <Empty>No groups assigned to you yet.</Empty>}
          </div>
        </Panel>
      </div>
    )
  }

  // head
  const advised = groups.filter((g) => g.advisorId).length
  const avgProgress = Math.round(groups.reduce((s, g) => s + g.progress, 0) / groups.length)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Active groups" value={groups.length} icon={<Users size={14} />} />
        <Stat label="Students enrolled" value={students.length} icon={<GraduationCap size={14} />} />
        <Stat label="Advisor assigned" value={`${advised} of ${groups.length}`} icon={<UserCheck size={14} />} />
        <Stat label="Average progress" value={`${avgProgress}%`} />
      </StatRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHead title="Group progress" hint="Rolled up from reviewed milestone submissions" />
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.id}>
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-chalk-100">{g.title}</p>
                    <p className="text-[11px] text-chalk-600">
                      {staffById(g.advisorId)?.name ?? 'No advisor assigned'} · GPA{' '}
                      {groupGpa(g).toFixed(2)}
                    </p>
                  </div>
                  <p className="tabular shrink-0 text-[12px] text-chalk-400">{g.progress}%</p>
                </div>
                <Progress value={g.progress} className="mt-2" />
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHead title="Needs a decision" />
          <ul className="space-y-2.5">
            {groups
              .filter((g) => !g.advisorId)
              .map((g) => (
                <li key={g.id} className="rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-2.5">
                  <p className="text-[12.5px] font-medium text-amber-200">No advisor assigned</p>
                  <p className="mt-0.5 text-[11.5px] text-amber-300/70">{g.title}</p>
                </li>
              ))}
            {milestones
              .filter((m) => m.state === 'submitted')
              .map((m) => (
                <li key={m.id} className="rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5">
                  <p className="text-[12.5px] font-medium text-chalk-100">Submission awaiting review</p>
                  <p className="mt-0.5 text-[11.5px] text-chalk-600">
                    {m.name} · filed {shortDate(m.submitted)}
                  </p>
                </li>
              ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

/* =================================================================== *
 * Groups
 * =================================================================== */

function Groups({
  role,
  groups,
  setGroups,
}: {
  role: Role
  groups: Group[]
  setGroups: (fn: (prev: Group[]) => Group[]) => void
}) {
  const toast = useToast()
  const shown = role === 'advisor' ? groups.filter((g) => g.advisorId === 'f2') : groups

  /**
   * Matches unadvised groups to the staff member whose expertise overlaps the
   * project title and who has spare capacity. The real system asks a local
   * model first and falls back to exactly this heuristic.
   */
  const autoAssign = () => {
    const load = new Map(staff.map((s) => [s.id, groups.filter((g) => g.advisorId === s.id).length]))
    let assigned = 0

    setGroups((prev) =>
      prev.map((g) => {
        if (g.advisorId) return g
        const title = g.title.toLowerCase()
        const ranked = [...staff]
          .filter((s) => (load.get(s.id) ?? 0) < s.capacity)
          .sort((a, b) => {
            const score = (s: typeof a) =>
              s.expertise.filter((e) => title.includes(e.split(' ')[0].toLowerCase())).length * 10 -
              (load.get(s.id) ?? 0)
            return score(b) - score(a)
          })
        const pick = ranked[0]
        if (!pick) return g
        load.set(pick.id, (load.get(pick.id) ?? 0) + 1)
        assigned++
        return { ...g, advisorId: pick.id, status: 'advised' as const }
      }),
    )

    toast(
      assigned
        ? `${assigned} group${assigned === 1 ? '' : 's'} matched by expertise and remaining capacity`
        : 'Every group already has an advisor',
    )
  }

  return (
    <div className="space-y-4">
      {role === 'head' && (
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-chalk-100">Advisor matching</h3>
              <p className="mt-0.5 text-xs text-chalk-500">
                Balances expertise overlap against each advisor's remaining capacity. Falls back to
                a deterministic heuristic when the local model is unavailable.
              </p>
            </div>
            <Btn variant="solid" size="md" onClick={autoAssign}>
              <Sparkles size={14} /> Match unassigned groups
            </Btn>
          </div>
        </Panel>
      )}

      <div className="grid gap-3 lg:grid-cols-2">
        {shown.map((g) => {
          const advisor = staffById(g.advisorId)
          return (
            <Panel key={g.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="tabular font-mono text-[11px] text-chalk-600">
                    {g.id.toUpperCase()}
                  </p>
                  <h3 className="mt-1 text-[14.5px] leading-snug font-semibold text-chalk-50">
                    {g.title}
                  </h3>
                </div>
                <Badge tone={g.advisorId ? 'good' : 'warn'} dot>
                  {g.advisorId ? 'Advised' : 'Unassigned'}
                </Badge>
              </div>

              <ul className="mt-4 space-y-2">
                {g.members.map((id) => {
                  const s = studentById(id)
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 text-[12.5px]">
                      <span className="truncate text-chalk-200">{s.name}</span>
                      <span className="tabular shrink-0 text-chalk-500">
                        GPA {s.gpa.toFixed(2)}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700">
                <div className="bg-ink-900 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                    Group GPA
                  </dt>
                  <dd className="tabular mt-0.5 text-[13px] font-medium text-chalk-100">
                    {groupGpa(g).toFixed(2)}
                  </dd>
                </div>
                <div className="bg-ink-900 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                    Advisor
                  </dt>
                  <dd className="mt-0.5 truncate text-[13px] font-medium text-chalk-100">
                    {advisor?.name ?? '—'}
                  </dd>
                </div>
              </dl>

              <Progress value={g.progress} className="mt-4" />
              <p className="mt-2 text-[11.5px] text-chalk-600">{g.milestone}</p>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}

/* =================================================================== *
 * Advisor load
 * =================================================================== */

function Advisors({ groups }: { groups: Group[] }) {
  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Academic staff" value={staff.length} icon={<UserCheck size={14} />} />
        <Stat label="Total capacity" value={staff.reduce((s, x) => s + x.capacity, 0)} />
        <Stat label="Assigned" value={groups.filter((g) => g.advisorId).length} />
        <Stat
          label="Utilisation"
          value={`${Math.round((groups.filter((g) => g.advisorId).length / staff.reduce((s, x) => s + x.capacity, 0)) * 100)}%`}
        />
      </StatRow>

      <Panel>
        <PanelHead title="Advisor load" hint="Capacity is enforced when groups are matched" />
        <div className="space-y-4">
          {staff.map((s) => {
            const load = groups.filter((g) => g.advisorId === s.id).length
            const pct = (load / s.capacity) * 100
            return (
              <div key={s.id}>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-medium text-chalk-100">{s.name}</p>
                    <p className="text-[11px] text-chalk-600">
                      {s.title} · {s.expertise.join(', ')}
                    </p>
                  </div>
                  <p className="tabular text-[12px] text-chalk-400">
                    {load} / {s.capacity} groups
                  </p>
                </div>
                <Progress
                  value={pct}
                  tone={pct >= 100 ? '#f43f5e' : pct >= 75 ? '#f59e0b' : undefined}
                  className="mt-2"
                />
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Submissions
 * =================================================================== */

function Submissions({
  role,
  groups,
  milestones,
  setMilestones,
}: {
  role: Role
  groups: Group[]
  milestones: Milestone[]
  setMilestones: (fn: (prev: Milestone[]) => Milestone[]) => void
}) {
  const toast = useToast()
  const titleOf = (id: string) => groups.find((g) => g.id === id)?.title ?? '—'

  const shown =
    role === 'student'
      ? milestones.filter((m) => m.groupId === 'g2')
      : role === 'advisor'
        ? milestones.filter((m) => groups.some((g) => g.id === m.groupId && g.advisorId === 'f2'))
        : milestones

  const decide = (m: Milestone, state: Milestone['state'], comment: string) => {
    setMilestones((prev) => prev.map((x) => (x.id === m.id ? { ...x, state, comment } : x)))
    toast(state === 'reviewed' ? `${m.name} accepted` : `${m.name} returned for revision`)
  }

  return (
    <div className="space-y-4">
      {shown.length === 0 ? (
        <Empty>Nothing submitted yet.</Empty>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {shown.map((m) => (
            <Panel key={m.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-chalk-50">{m.name}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-chalk-600">
                    {titleOf(m.groupId)}
                  </p>
                </div>
                <Badge
                  tone={m.state === 'reviewed' ? 'good' : m.state === 'revise' ? 'warn' : 'info'}
                  dot
                >
                  {m.state}
                </Badge>
              </div>

              <p className="mt-3 text-[11.5px] text-chalk-600">
                Submitted {shortDate(m.submitted)}
              </p>

              {m.comment && (
                <p className="mt-3 rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5 text-[12.5px] leading-relaxed text-chalk-300">
                  {m.comment}
                </p>
              )}

              {role !== 'student' && m.state === 'submitted' && (
                <div className="mt-4 flex gap-2 border-t border-ink-800 pt-3.5">
                  <Btn
                    variant="solid"
                    onClick={() => decide(m, 'reviewed', 'Accepted. Proceed to the next chapter.')}
                  >
                    <Check size={14} /> Accept
                  </Btn>
                  <Btn
                    onClick={() =>
                      decide(m, 'revise', 'Returned — address the advisor comments and resubmit.')
                    }
                  >
                    <RotateCcw size={14} /> Request revision
                  </Btn>
                </div>
              )}
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}

/* =================================================================== *
 * Defence schedule
 * =================================================================== */

function Schedule({ role, groups }: { role: Role; groups: Group[] }) {
  const toast = useToast()
  const titleOf = (id: string) => groups.find((g) => g.id === id)?.title ?? '—'
  const list = role === 'student' ? defences.filter((d) => d.groupId === 'g2') : defences

  const days = Array.from(new Set(list.map((d) => d.date)))

  return (
    <div className="space-y-4">
      {role === 'head' && (
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-chalk-100">Automatic scheduling</h3>
              <p className="mt-0.5 text-xs text-chalk-500">
                Assigns slots without double-booking an examiner or a room, respecting recorded
                availability.
              </p>
            </div>
            <Btn
              variant="solid"
              size="md"
              onClick={() => toast('Schedule regenerated — no examiner or room conflicts found')}
            >
              <Sparkles size={14} /> Regenerate schedule
            </Btn>
          </div>
        </Panel>
      )}

      {days.map((day) => (
        <Panel key={day}>
          <PanelHead
            title={shortDate(day)}
            hint={`${list.filter((d) => d.date === day).length} defences scheduled`}
          />
          <div className="space-y-2.5">
            {list
              .filter((d) => d.date === day)
              .map((d) => {
                const group = groups.find((g) => g.id === d.groupId)
                return (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-ink-700 bg-ink-900 p-3.5"
                  >
                    <div className="tabular w-28 shrink-0 text-[13px] font-semibold text-[var(--accent)]">
                      {d.slot}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-chalk-100">
                        {titleOf(d.groupId)}
                      </p>
                      <p className="mt-0.5 truncate text-[11.5px] text-chalk-600">
                        {group?.members.map((id) => studentById(id).name).join(' · ')}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12px] text-chalk-300">{d.room}</p>
                      <p className="text-[11px] text-chalk-600">Chair · {d.chair}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </Panel>
      ))}
    </div>
  )
}

/* =================================================================== *
 * Grading
 * =================================================================== */

function Grading({ groups }: { groups: Group[] }) {
  const titleOf = (id: string) => groups.find((g) => g.id === id)?.title ?? '—'
  const rows = grades.map((g) => ({ ...g, mark: finalMark(g) }))
  const avg = rows.reduce((s, r) => s + r.mark, 0) / rows.length

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Graded groups" value={rows.length} icon={<GraduationCap size={14} />} />
        <Stat label="Class average" value={avg.toFixed(1)} sub={`Letter ${letter(avg)}`} />
        <Stat label="Highest" value={Math.max(...rows.map((r) => r.mark)).toFixed(1)} />
        <Stat label="Below 70" value={rows.filter((r) => r.mark < 70).length} />
      </StatRow>

      <Panel>
        <PanelHead
          title="Weighted marks"
          hint="Proposal 15% · progress 25% · advisor 30% · examiner 30%"
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Group</TH>
                <TH align="right">Proposal</TH>
                <TH align="right">Progress</TH>
                <TH align="right">Advisor</TH>
                <TH align="right">Examiner</TH>
                <TH align="right">Final</TH>
                <TH align="center">Grade</TH>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <Row key={r.groupId}>
                  <TD>
                    <p className="max-w-xs truncate font-medium text-chalk-100">
                      {titleOf(r.groupId)}
                    </p>
                    <p className="tabular font-mono text-[11px] text-chalk-600">
                      {r.groupId.toUpperCase()}
                    </p>
                  </TD>
                  <TD align="right" className="tabular">
                    {r.proposal}
                  </TD>
                  <TD align="right" className="tabular">
                    {r.progressScore}
                  </TD>
                  <TD align="right" className="tabular">
                    {r.advisorScore}
                  </TD>
                  <TD align="right" className="tabular">
                    {r.examinerScore}
                  </TD>
                  <TD align="right" className="tabular font-semibold text-chalk-50">
                    {r.mark.toFixed(1)}
                  </TD>
                  <TD align="center">
                    <Badge tone={r.mark >= 80 ? 'good' : r.mark >= 70 ? 'info' : 'warn'}>
                      {letter(r.mark)}
                    </Badge>
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

/* =================================================================== *
 * Public repository
 * =================================================================== */

function Repository() {
  const [q, setQ] = useState('')
  const [year, setYear] = useState<'all' | string>('all')
  const years = Array.from(new Set(published.map((p) => p.year)))

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return published.filter((p) => {
      if (year !== 'all' && p.year !== year) return false
      if (!needle) return true
      return `${p.title} ${p.authors} ${p.department} ${p.tags.join(' ')}`
        .toLowerCase()
        .includes(needle)
    })
  }, [q, year])

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Field label="Search the repository" className="w-full sm:w-80">
            <div className="relative">
              <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-chalk-600" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, author, department, topic…"
                className="pl-8"
              />
            </div>
          </Field>
          <Segmented
            value={year}
            onChange={setYear}
            size="md"
            options={[{ value: 'all', label: 'All years' }, ...years.map((y) => ({ value: y, label: y }))]}
          />
        </div>
      </Panel>

      {shown.length === 0 ? (
        <Empty>Nothing matches that search.</Empty>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {shown.map((p) => (
            <Panel key={p.id}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[14.5px] leading-snug font-semibold text-chalk-50">
                  {p.title}
                </h3>
                <Badge tone="accent">{p.year}</Badge>
              </div>
              <p className="mt-2 text-[11.5px] text-chalk-600">
                {p.authors} · {p.department}
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-chalk-400">{p.abstract}</p>
              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className={cx(
                      'rounded-md border border-ink-700 bg-ink-900 px-2 py-0.5 text-[11px] text-chalk-500',
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}
