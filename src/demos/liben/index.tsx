import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import {
  ClipboardList,
  FileText,
  HardHat,
  LayoutDashboard,
  ShoppingCart,
  Trash2,
  Check,
  X,
  ArrowLeft,
  Printer,
} from 'lucide-react'
import { DemoShell, type DemoProps, type NavItem } from '../DemoShell'
import {
  Badge,
  Btn,
  Empty,
  Field,
  Input,
  KeyVal,
  Panel,
  PanelHead,
  Progress,
  Row,
  Segmented,
  Select,
  Stat,
  StatRow,
  Table,
  TableWrap,
  TD,
  TH,
  compact,
  money,
  money2,
  shortDate,
  useToast,
  type Tone,
} from '../kit'
import {
  VAT_RATE,
  amountInWords,
  catalog,
  phases,
  projects as seedProjects,
  purchases as seedPurchases,
  siteReports as seedReports,
  statusTone,
  tasks as seedTasks,
  type Project,
  type Purchase,
  type SiteReport,
  type Task,
} from './data'

const nav: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { key: 'projects', label: 'Projects', icon: <HardHat size={16} />, badge: 7 },
  { key: 'reports', label: 'Site reports', icon: <ClipboardList size={16} />, badge: 2 },
  { key: 'procurement', label: 'Procurement', icon: <ShoppingCart size={16} />, badge: 2 },
  { key: 'proforma', label: 'Proforma', icon: <FileText size={16} /> },
]

const titles: Record<string, [string, string]> = {
  dashboard: ['Dashboard', 'Company position across every live project'],
  projects: ['Projects', 'Lead to handover, on a board or a list'],
  reports: ['Daily site reports', 'Submitted by supervisors, approved by a project manager'],
  procurement: ['Procurement', 'Material requests and the approval chain'],
  proforma: ['Proforma invoice', 'Branded, VAT-calculated and QR-verifiable'],
}

export default function LibenDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('dashboard')
  const [openProject, setOpenProject] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>(seedProjects)
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [reports, setReports] = useState<SiteReport[]>(seedReports)
  const [purchases, setPurchases] = useState<Purchase[]>(seedPurchases)

  const [title, subtitle] = titles[screen]
  const current = projects.find((p) => p.id === openProject) ?? null

  const go = (key: string) => {
    setOpenProject(null)
    setScreen(key)
  }

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={screen}
      onNavigate={go}
      title={current ? current.name : title}
      subtitle={current ? `${current.code} · ${current.customer}` : subtitle}
      user={{ name: 'Hiwot Girma', role: 'Project Manager' }}
    >
      {screen === 'dashboard' && (
        <Dashboard projects={projects} tasks={tasks} purchases={purchases} reports={reports} />
      )}
      {screen === 'projects' &&
        (current ? (
          <Workspace
            project={current}
            tasks={tasks}
            setTasks={setTasks}
            reports={reports}
            purchases={purchases}
            onBack={() => setOpenProject(null)}
          />
        ) : (
          <Projects projects={projects} setProjects={setProjects} onOpen={setOpenProject} />
        ))}
      {screen === 'reports' && (
        <Reports reports={reports} setReports={setReports} projects={projects} />
      )}
      {screen === 'procurement' && (
        <Procurement purchases={purchases} setPurchases={setPurchases} projects={projects} />
      )}
      {screen === 'proforma' && <Proforma />}
    </DemoShell>
  )
}

/* =================================================================== *
 * Dashboard
 * =================================================================== */

function Dashboard({
  projects,
  tasks,
  purchases,
  reports,
}: {
  projects: Project[]
  tasks: Task[]
  purchases: Purchase[]
  reports: SiteReport[]
}) {
  const active = projects.filter((p) => p.status === 'Active')
  const contracted = projects
    .filter((p) => !['Lead', 'Quoted'].includes(p.status))
    .reduce((s, p) => s + p.budget, 0)
  const spent = projects.reduce((s, p) => s + p.spent, 0)
  const openTasks = tasks.filter((t) => t.status !== 'done')
  const pendingApprovals =
    reports.filter((r) => r.approval === 'pending').length +
    purchases.filter((p) => p.stage === 'Pending').length

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Active projects" value={active.length} sub={`${projects.length} in the register`} icon={<HardHat size={14} />} />
        <Stat label="Contract value" value={`ETB ${compact(contracted)}`} sub="Excluding leads and quotes" />
        <Stat label="Committed spend" value={`ETB ${compact(spent)}`} sub={`${Math.round((spent / contracted) * 100)}% of contract value`} />
        <Stat label="Awaiting your approval" value={pendingApprovals} sub="Site reports and purchase requests" icon={<ClipboardList size={14} />} />
      </StatRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHead title="Glazing progress" hint="Approved site reports roll up into the scope tracker" />
          <div className="space-y-4">
            {active.map((p) => {
              const pct = (p.doneM2 / p.scopeM2) * 100
              return (
                <div key={p.id}>
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-chalk-100">{p.name}</p>
                      <p className="tabular font-mono text-[11px] text-chalk-600">
                        {p.code} · {p.phase}
                      </p>
                    </div>
                    <p className="tabular shrink-0 text-[12px] text-chalk-400">
                      {p.doneM2.toLocaleString()} / {p.scopeM2.toLocaleString()} m²
                    </p>
                  </div>
                  <Progress value={pct} className="mt-2" />
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHead title="Your open tasks" hint="Across every project you can see" />
          <ul className="space-y-2">
            {openTasks.slice(0, 6).map((t) => (
              <li
                key={t.id}
                className="rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] leading-snug text-chalk-100">{t.title}</p>
                  <Badge tone={t.priority === 'High' ? 'bad' : t.priority === 'Medium' ? 'warn' : 'neutral'}>
                    {t.priority}
                  </Badge>
                </div>
                <p className="mt-1.5 text-[11px] text-chalk-600">
                  {t.assignee} · due {shortDate(t.due)}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Phase distribution" hint="Every project sits in exactly one of six phases" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {phases.map((ph) => {
            const list = projects.filter((p) => p.phase === ph)
            return (
              <div key={ph} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                <p className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                  {ph}
                </p>
                <p className="tabular mt-2 text-2xl font-semibold text-chalk-50">{list.length}</p>
                <p className="mt-1 truncate text-[11px] text-chalk-600">
                  {list[0]?.code ?? 'none'}
                </p>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Projects — board / list
 * =================================================================== */

function Projects({
  projects,
  setProjects,
  onOpen,
}: {
  projects: Project[]
  setProjects: (fn: (prev: Project[]) => Project[]) => void
  onOpen: (id: string) => void
}) {
  const [view, setView] = useState<'board' | 'list'>('board')
  const toast = useToast()

  const advance = (p: Project) => {
    const i = phases.indexOf(p.phase)
    if (i >= phases.length - 1) return
    const next = phases[i + 1]
    setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, phase: next } : x)))
    toast(`${p.code} moved to ${next}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          value={view}
          onChange={setView}
          size="md"
          options={[
            { value: 'board', label: 'Kanban' },
            { value: 'list', label: 'List' },
          ]}
        />
        <p className="text-xs text-chalk-600">
          {view === 'board' ? 'Click a card to advance its phase' : 'Click a row to open the workspace'}
        </p>
      </div>

      {view === 'board' ? (
        <div className="scroll-slim -mx-3 overflow-x-auto px-3 sm:-mx-5 sm:px-5">
          <div className="grid min-w-[68rem] grid-cols-6 gap-3">
            {phases.map((ph) => {
              const list = projects.filter((p) => p.phase === ph)
              return (
                <div key={ph} className="rounded-xl border border-ink-700 bg-ink-850 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[11.5px] font-semibold tracking-wide text-chalk-300 uppercase">
                      {ph}
                    </h3>
                    <span className="tabular rounded-full bg-ink-700 px-1.5 text-[10px] font-semibold text-chalk-500">
                      {list.length}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {list.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-lg border border-ink-700 bg-ink-900 p-3 transition-colors hover:border-[var(--accent)]"
                      >
                        <button onClick={() => onOpen(p.id)} className="w-full text-left">
                          <span className="tabular font-mono text-[10.5px] text-chalk-600">
                            {p.code}
                          </span>
                          <p className="mt-1 text-[12.5px] leading-snug font-medium text-chalk-100">
                            {p.name}
                          </p>
                          <p className="mt-1 truncate text-[11px] text-chalk-600">{p.customer}</p>
                          <Progress value={(p.doneM2 / p.scopeM2) * 100} className="mt-2.5" />
                        </button>
                        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-ink-800 pt-2">
                          <Badge tone={statusTone[p.status] as Tone}>{p.status}</Badge>
                          <button
                            onClick={() => advance(p)}
                            title="Advance phase"
                            className="rounded p-0.5 text-chalk-600 hover:text-[var(--accent)]"
                          >
                            <Check size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {list.length === 0 && (
                      <p className="rounded-lg border border-dashed border-ink-700 py-5 text-center text-[11px] text-chalk-600">
                        —
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <Panel>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <TH>Code</TH>
                  <TH>Project</TH>
                  <TH className="hidden lg:table-cell">Supervisor</TH>
                  <TH>Phase</TH>
                  <TH>Status</TH>
                  <TH className="w-32">Progress</TH>
                  <TH align="right">Budget</TH>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <Row key={p.id} onClick={() => onOpen(p.id)}>
                    <TD className="tabular font-mono text-[12px] text-chalk-500">{p.code}</TD>
                    <TD>
                      <p className="font-medium text-chalk-100">{p.name}</p>
                      <p className="text-[11px] text-chalk-600">{p.customer}</p>
                    </TD>
                    <TD className="hidden lg:table-cell">{p.supervisor}</TD>
                    <TD>{p.phase}</TD>
                    <TD>
                      <Badge tone={statusTone[p.status] as Tone} dot>
                        {p.status}
                      </Badge>
                    </TD>
                    <TD>
                      <Progress value={(p.doneM2 / p.scopeM2) * 100} />
                    </TD>
                    <TD align="right" className="tabular">
                      {money(p.budget)}
                    </TD>
                  </Row>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </Panel>
      )}
    </div>
  )
}

/* =================================================================== *
 * Project workspace
 * =================================================================== */

const taskColumns = [
  { key: 'todo', label: 'To do' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'blocked', label: 'Blocked' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
] as const

function Workspace({
  project,
  tasks,
  setTasks,
  reports,
  purchases,
  onBack,
}: {
  project: Project
  tasks: Task[]
  setTasks: (fn: (prev: Task[]) => Task[]) => void
  reports: SiteReport[]
  purchases: Purchase[]
  onBack: () => void
}) {
  const [tab, setTab] = useState<'overview' | 'tasks' | 'logs' | 'procurement'>('overview')
  const toast = useToast()

  const mine = tasks.filter((t) => t.projectId === project.id)
  const myReports = reports.filter((r) => r.projectId === project.id)
  const myPurchases = purchases.filter((p) => p.projectId === project.id)
  const pct = (project.doneM2 / project.scopeM2) * 100

  const cycle = (t: Task) => {
    const order = taskColumns.map((c) => c.key)
    const next = order[(order.indexOf(t.status) + 1) % order.length]
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)))
    toast(`“${t.title.slice(0, 28)}…” → ${taskColumns.find((c) => c.key === next)!.label}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Btn onClick={onBack}>
          <ArrowLeft size={14} /> All projects
        </Btn>
        <Segmented
          value={tab}
          onChange={setTab}
          size="md"
          options={[
            { value: 'overview', label: 'Overview' },
            { value: 'tasks', label: 'Tasks', count: mine.length },
            { value: 'logs', label: 'Site logs', count: myReports.length },
            { value: 'procurement', label: 'Procurement', count: myPurchases.length },
          ]}
        />
      </div>

      {tab === 'overview' && (
        <div className="grid gap-4 lg:grid-cols-5">
          <Panel className="lg:col-span-3">
            <PanelHead title="Scope and progress" hint="Square metres of glazing installed" />
            <div className="flex items-end justify-between gap-4">
              <p className="tabular text-3xl font-semibold text-chalk-50">{pct.toFixed(0)}%</p>
              <p className="tabular text-right text-[13px] text-chalk-400">
                {project.doneM2.toLocaleString()} of {project.scopeM2.toLocaleString()} m²
              </p>
            </div>
            <Progress value={pct} className="mt-3 h-2" />

            <dl className="mt-6">
              <KeyVal k="Customer" v={project.customer} />
              <KeyVal k="Site" v={project.site} />
              <KeyVal k="Supervisor" v={project.supervisor} />
              <KeyVal k="Phase" v={project.phase} />
              <KeyVal k="Start" v={shortDate(project.start)} />
              <KeyVal k="Target handover" v={shortDate(project.target)} />
            </dl>
          </Panel>

          <div className="space-y-4 lg:col-span-2">
            <Panel>
              <PanelHead title="Financials" />
              <dl className="space-y-3">
                <div>
                  <dt className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                    Contract budget
                  </dt>
                  <dd className="tabular mt-1 text-xl font-semibold text-chalk-50">
                    {money(project.budget)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                    Committed to date
                  </dt>
                  <dd className="tabular mt-1 text-xl font-semibold text-chalk-50">
                    {money(project.spent)}
                  </dd>
                  <Progress value={(project.spent / project.budget) * 100} className="mt-2" />
                  <p className="mt-1.5 text-[11px] text-chalk-600">
                    {money(project.budget - project.spent)} remaining
                  </p>
                </div>
              </dl>
            </Panel>
            <Panel>
              <PanelHead title="Team" />
              <ul className="space-y-2 text-[13px]">
                {[project.supervisor, 'Meklit Haile', 'Tewodros Assefa'].map((n) => (
                  <li key={n} className="flex items-center justify-between gap-2">
                    <span className="text-chalk-200">{n}</span>
                    <span className="text-[11px] text-chalk-600">allocated</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="scroll-slim -mx-3 overflow-x-auto px-3 sm:-mx-5 sm:px-5">
          <div className="grid min-w-[60rem] grid-cols-5 gap-3">
            {taskColumns.map((col) => {
              const list = mine.filter((t) => t.status === col.key)
              return (
                <div key={col.key} className="rounded-xl border border-ink-700 bg-ink-850 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[11.5px] font-semibold tracking-wide text-chalk-300 uppercase">
                      {col.label}
                    </h3>
                    <span className="tabular rounded-full bg-ink-700 px-1.5 text-[10px] font-semibold text-chalk-500">
                      {list.length}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {list.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => cycle(t)}
                        className="w-full rounded-lg border border-ink-700 bg-ink-900 p-3 text-left transition-colors hover:border-[var(--accent)]"
                      >
                        <p className="text-[12.5px] leading-snug text-chalk-100">{t.title}</p>
                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] text-chalk-600">{t.assignee}</span>
                          <Badge
                            tone={t.priority === 'High' ? 'bad' : t.priority === 'Medium' ? 'warn' : 'neutral'}
                          >
                            {t.priority}
                          </Badge>
                        </div>
                      </button>
                    ))}
                    {list.length === 0 && (
                      <p className="rounded-lg border border-dashed border-ink-700 py-5 text-center text-[11px] text-chalk-600">
                        —
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'logs' && (
        <Panel>
          <PanelHead title="Daily site reports" hint="Filed against this project" />
          {myReports.length === 0 ? (
            <Empty>No reports filed yet.</Empty>
          ) : (
            <ul className="space-y-3">
              {myReports.map((r) => (
                <li key={r.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="tabular font-mono text-[11px] text-chalk-600">
                      {r.id} · {shortDate(r.date)}
                    </span>
                    <Badge tone={r.approval === 'approved' ? 'good' : 'warn'} dot>
                      {r.approval}
                    </Badge>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-chalk-200">{r.work}</p>
                  <p className="mt-2 text-[11px] text-chalk-600">
                    {r.workforce} workers · {r.weather} · {r.glassM2} m² glazed
                    {r.delay && ` · ${r.delay}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}

      {tab === 'procurement' && (
        <Panel>
          <PanelHead title="Purchase requests" hint="Raised against this project" />
          {myPurchases.length === 0 ? (
            <Empty>No requests raised yet.</Empty>
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <TH>Ref</TH>
                    <TH>Item</TH>
                    <TH className="hidden md:table-cell">Supplier</TH>
                    <TH>Stage</TH>
                    <TH align="right">Amount</TH>
                  </tr>
                </thead>
                <tbody>
                  {myPurchases.map((p) => (
                    <Row key={p.id}>
                      <TD className="tabular font-mono text-[12px] text-chalk-500">{p.id}</TD>
                      <TD>
                        <p className="font-medium text-chalk-100">{p.item}</p>
                        <p className="text-[11px] text-chalk-600">{p.qty}</p>
                      </TD>
                      <TD className="hidden md:table-cell">{p.supplier}</TD>
                      <TD>
                        <Badge tone={stageTone(p.stage)}>{p.stage}</Badge>
                      </TD>
                      <TD align="right" className="tabular">
                        {money(p.amount)}
                      </TD>
                    </Row>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Panel>
      )}
    </div>
  )
}

/* =================================================================== *
 * Site reports — approval queue
 * =================================================================== */

function Reports({
  reports,
  setReports,
  projects,
}: {
  reports: SiteReport[]
  setReports: (fn: (prev: SiteReport[]) => SiteReport[]) => void
  projects: Project[]
}) {
  const toast = useToast()
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const codeOf = (id: string) => projects.find((p) => p.id === id)?.code ?? '—'

  const shown = reports.filter((r) => filter === 'all' || r.approval === filter)

  const decide = (r: SiteReport, approval: 'approved' | 'rejected') => {
    setReports((prev) => prev.map((x) => (x.id === r.id ? { ...x, approval } : x)))
    toast(
      approval === 'approved'
        ? `${r.id} approved — ${r.glassM2} m² rolled into the scope tracker`
        : `${r.id} returned to ${r.supervisor}`,
    )
  }

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat
          label="Pending approval"
          value={reports.filter((r) => r.approval === 'pending').length}
          icon={<ClipboardList size={14} />}
        />
        <Stat label="Approved" value={reports.filter((r) => r.approval === 'approved').length} />
        <Stat
          label="Glazed this week"
          value={`${reports.reduce((s, r) => s + r.glassM2, 0)} m²`}
        />
        <Stat
          label="Days with delays"
          value={reports.filter((r) => r.delay).length}
          sub="Recorded against the programme"
        />
      </StatRow>

      <div className="flex justify-between gap-3">
        <Segmented
          value={filter}
          onChange={setFilter}
          size="md"
          options={[
            { value: 'all', label: 'All', count: reports.length },
            { value: 'pending', label: 'Pending', count: reports.filter((r) => r.approval === 'pending').length },
            { value: 'approved', label: 'Approved', count: reports.filter((r) => r.approval === 'approved').length },
          ]}
        />
      </div>

      {shown.length === 0 ? (
        <Empty>Nothing in this state.</Empty>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {shown.map((r) => (
            <Panel key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="tabular font-mono text-[11px] text-chalk-600">
                    {r.id} · {codeOf(r.projectId)}
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-chalk-50">
                    {shortDate(r.date)}
                  </p>
                  <p className="text-[11px] text-chalk-600">Filed by {r.supervisor}</p>
                </div>
                <Badge
                  tone={r.approval === 'approved' ? 'good' : r.approval === 'rejected' ? 'bad' : 'warn'}
                  dot
                >
                  {r.approval}
                </Badge>
              </div>

              <p className="mt-3.5 text-[13px] leading-relaxed text-chalk-300">{r.work}</p>

              <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700">
                {[
                  ['Workforce', String(r.workforce)],
                  ['Weather', r.weather],
                  ['Glazed', `${r.glassM2} m²`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink-900 px-3 py-2.5">
                    <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                      {k}
                    </dt>
                    <dd className="tabular mt-0.5 text-[13px] font-medium text-chalk-100">{v}</dd>
                  </div>
                ))}
              </dl>

              {r.delay && (
                <p className="mt-3 rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-2 text-[12px] text-amber-300">
                  Delay recorded · {r.delay}
                </p>
              )}

              {r.approval === 'pending' && (
                <div className="mt-4 flex gap-2 border-t border-ink-800 pt-3.5">
                  <Btn variant="solid" onClick={() => decide(r, 'approved')}>
                    <Check size={14} /> Approve
                  </Btn>
                  <Btn onClick={() => decide(r, 'rejected')}>
                    <X size={14} /> Return
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
 * Procurement
 * =================================================================== */

const stages: Purchase['stage'][] = ['Draft', 'Pending', 'Approved', 'Ordered', 'Received']

function stageTone(stage: Purchase['stage']): Tone {
  return stage === 'Received'
    ? 'good'
    : stage === 'Ordered'
      ? 'info'
      : stage === 'Approved'
        ? 'accent'
        : stage === 'Pending'
          ? 'warn'
          : 'neutral'
}

function Procurement({
  purchases,
  setPurchases,
  projects,
}: {
  purchases: Purchase[]
  setPurchases: (fn: (prev: Purchase[]) => Purchase[]) => void
  projects: Project[]
}) {
  const toast = useToast()
  const codeOf = (id: string) => projects.find((p) => p.id === id)?.code ?? '—'

  const advance = (p: Purchase) => {
    const i = stages.indexOf(p.stage)
    if (i >= stages.length - 1) return
    const next = stages[i + 1]
    setPurchases((prev) => prev.map((x) => (x.id === p.id ? { ...x, stage: next } : x)))
    toast(`${p.id} → ${next}`)
  }

  const value = purchases.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Open requests" value={purchases.filter((p) => p.stage !== 'Received').length} icon={<ShoppingCart size={14} />} />
        <Stat label="Awaiting approval" value={purchases.filter((p) => p.stage === 'Pending').length} />
        <Stat label="Total requested" value={`ETB ${compact(value)}`} />
        <Stat label="Suppliers" value={new Set(purchases.map((p) => p.supplier)).size} />
      </StatRow>

      <Panel>
        <PanelHead
          title="Purchase requests"
          hint="Draft → Pending → Approved → Ordered → Received. Click a row to advance the stage."
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Ref</TH>
                <TH>Item</TH>
                <TH className="hidden lg:table-cell">Project</TH>
                <TH className="hidden md:table-cell">Supplier</TH>
                <TH>Stage</TH>
                <TH align="right">Amount</TH>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <Row key={p.id} onClick={() => advance(p)}>
                  <TD className="tabular font-mono text-[12px] text-chalk-500">{p.id}</TD>
                  <TD>
                    <p className="font-medium text-chalk-100">{p.item}</p>
                    <p className="text-[11px] text-chalk-600">
                      {p.qty} · raised by {p.raisedBy}
                    </p>
                  </TD>
                  <TD className="tabular hidden lg:table-cell font-mono text-[12px]">
                    {codeOf(p.projectId)}
                  </TD>
                  <TD className="hidden md:table-cell">{p.supplier}</TD>
                  <TD>
                    <Badge tone={stageTone(p.stage)} dot>
                      {p.stage}
                    </Badge>
                  </TD>
                  <TD align="right" className="tabular font-medium text-chalk-100">
                    {money(p.amount)}
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
 * Proforma generator
 * =================================================================== */

type Line = { id: number; description: string; unit: string; qty: number; price: number }

let lineSeq = 3

function Proforma() {
  const toast = useToast()
  const [customer, setCustomer] = useState('Skyline Real Estate PLC')
  const [tin, setTin] = useState('0012345678')
  const [attention, setAttention] = useState('Eng. Abebe Mengistu')
  const [discountPct, setDiscountPct] = useState(2.5)
  const [vatOn, setVatOn] = useState(true)
  const [lines, setLines] = useState<Line[]>([
    { id: 1, description: catalog[0].description, unit: catalog[0].unit, qty: 420, price: catalog[0].price },
    { id: 2, description: catalog[8].description, unit: catalog[8].unit, qty: 1, price: catalog[8].price },
  ])

  const ref = 'PF-2026-0184'

  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0)
  const discount = subtotal * (discountPct / 100)
  const taxable = subtotal - discount
  const vat = vatOn ? taxable * VAT_RATE : 0
  const total = taxable + vat

  const addLine = (catalogId: string) => {
    const item = catalog.find((c) => c.id === catalogId)
    if (!item) return
    setLines((prev) => [
      ...prev,
      { id: ++lineSeq, description: item.description, unit: item.unit, qty: 1, price: item.price },
    ])
  }

  const update = (id: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  return (
    <div className="grid gap-4 xl:grid-cols-12">
      {/* ---- builder ---- */}
      <div className="space-y-4 xl:col-span-5">
        <Panel>
          <PanelHead title="Customer" hint="Printed in the header block of the document" />
          <div className="space-y-3">
            <Field label="Company">
              <Input value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="TIN">
                <Input value={tin} onChange={(e) => setTin(e.target.value)} />
              </Field>
              <Field label="Attention">
                <Input value={attention} onChange={(e) => setAttention(e.target.value)} />
              </Field>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Line items"
            hint="Pick from the product catalogue, then adjust quantity or rate"
          />
          <Field label="Add from catalogue">
            <Select
              value=""
              onChange={(e) => {
                addLine(e.target.value)
                e.currentTarget.value = ''
              }}
            >
              <option value="">Select a product or service…</option>
              {catalog.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.description} — {money(c.price)}/{c.unit}
                </option>
              ))}
            </Select>
          </Field>

          <ul className="mt-4 space-y-2.5">
            {lines.map((l) => (
              <li key={l.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12.5px] leading-snug text-chalk-100">{l.description}</p>
                  <button
                    onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}
                    className="shrink-0 rounded p-1 text-chalk-600 hover:bg-ink-700 hover:text-rose-400"
                    aria-label="Remove line"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  <Field label={`Qty (${l.unit})`}>
                    <Input
                      type="number"
                      min={0}
                      value={l.qty}
                      onChange={(e) => update(l.id, { qty: Number(e.target.value) || 0 })}
                    />
                  </Field>
                  <Field label="Unit rate">
                    <Input
                      type="number"
                      min={0}
                      value={l.price}
                      onChange={(e) => update(l.id, { price: Number(e.target.value) || 0 })}
                    />
                  </Field>
                  <Field label="Amount">
                    <div className="tabular flex h-9 items-center rounded-lg border border-ink-800 bg-ink-950 px-3 text-sm font-medium text-chalk-100">
                      {(l.qty * l.price).toLocaleString()}
                    </div>
                  </Field>
                </div>
              </li>
            ))}
            {lines.length === 0 && <Empty>Add a line from the catalogue above.</Empty>}
          </ul>
        </Panel>

        <Panel>
          <PanelHead title="Adjustments" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Discount %">
              <Input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={discountPct}
                onChange={(e) => setDiscountPct(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="VAT">
              <Segmented
                value={vatOn ? 'on' : 'off'}
                onChange={(v) => setVatOn(v === 'on')}
                size="md"
                options={[
                  { value: 'on', label: 'Apply 15%' },
                  { value: 'off', label: 'Exempt' },
                ]}
              />
            </Field>
          </div>
          <div className="mt-4 flex gap-2">
            <Btn variant="solid" size="md" onClick={() => toast('Proforma saved and reference locked')}>
              Save proforma
            </Btn>
            <Btn size="md" onClick={() => toast('Sent to the A4 print template')}>
              <Printer size={14} /> Print
            </Btn>
          </div>
        </Panel>
      </div>

      {/* ---- document preview ---- */}
      <div className="xl:col-span-7">
        <div className="sticky top-0">
          <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
            A4 preview · updates as you type
          </p>
          <Document
            reference={ref}
            customer={customer}
            tin={tin}
            attention={attention}
            lines={lines}
            subtotal={subtotal}
            discount={discount}
            discountPct={discountPct}
            vat={vat}
            vatOn={vatOn}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}

function Document({
  reference,
  customer,
  tin,
  attention,
  lines,
  subtotal,
  discount,
  discountPct,
  vat,
  vatOn,
  total,
}: {
  reference: string
  customer: string
  tin: string
  attention: string
  lines: Line[]
  subtotal: number
  discount: number
  discountPct: number
  vat: number
  vatOn: boolean
  total: number
}) {
  const [qr, setQr] = useState<string>('')
  const verifyUrl = `https://liben.systems/view.html?id=${reference}`

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(verifyUrl, {
      margin: 0,
      width: 220,
      color: { dark: '#1B4965', light: '#ffffff' },
    })
      .then((url) => !cancelled && setQr(url))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [verifyUrl])

  return (
    <div className="scroll-slim overflow-x-auto rounded-xl border border-ink-700 bg-white p-6 text-[#12202b] shadow-2xl shadow-black/40 sm:p-8">
      <div className="min-w-[30rem]">
        {/* letterhead */}
        <header className="flex items-start justify-between gap-6 border-b-2 border-[#1B4965] pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded bg-[#1B4965] text-sm font-bold text-white">
                LF
              </span>
              <div>
                <p className="text-[15px] leading-tight font-bold text-[#1B4965]">
                  Liben Finishing Technology
                </p>
                <p className="text-[10px] tracking-wide text-[#5a6b7a] uppercase">
                  Glass &amp; Aluminium Works
                </p>
              </div>
            </div>
            <p className="mt-3 text-[10.5px] leading-relaxed text-[#5a6b7a]">
              Addis Ababa, Ethiopia · +251 11 000 0000
              <br />
              info@liben.systems · TIN 0098765432
            </p>
          </div>
          <div className="text-right">
            <p className="text-[17px] font-bold tracking-wide text-[#1B4965]">PROFORMA INVOICE</p>
            <dl className="mt-2 space-y-0.5 text-[10.5px]">
              <div className="flex justify-end gap-2">
                <dt className="text-[#5a6b7a]">Reference</dt>
                <dd className="font-semibold tabular-nums">{reference}</dd>
              </div>
              <div className="flex justify-end gap-2">
                <dt className="text-[#5a6b7a]">Date</dt>
                <dd className="font-semibold tabular-nums">13 Aug 2026</dd>
              </div>
              <div className="flex justify-end gap-2">
                <dt className="text-[#5a6b7a]">Valid until</dt>
                <dd className="font-semibold tabular-nums">12 Sep 2026</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* bill to */}
        <section className="mt-5 grid grid-cols-2 gap-6">
          <div>
            <p className="text-[9.5px] font-bold tracking-wider text-[#5a6b7a] uppercase">
              Billed to
            </p>
            <p className="mt-1.5 text-[13px] font-semibold">{customer || '—'}</p>
            <p className="text-[10.5px] text-[#5a6b7a]">TIN {tin || '—'}</p>
            {attention && (
              <p className="text-[10.5px] text-[#5a6b7a]">Attn: {attention}</p>
            )}
          </div>
          <div>
            <p className="text-[9.5px] font-bold tracking-wider text-[#5a6b7a] uppercase">
              Payment terms
            </p>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#5a6b7a]">
              50% advance on order confirmation, 40% before delivery,
              <br />
              10% on completion and handover.
            </p>
          </div>
        </section>

        {/* lines */}
        <table className="mt-5 w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-[#1B4965] text-white">
              <th className="w-8 px-2 py-2 text-left font-semibold">#</th>
              <th className="px-2 py-2 text-left font-semibold">Description</th>
              <th className="w-16 px-2 py-2 text-right font-semibold">Qty</th>
              <th className="w-12 px-2 py-2 text-left font-semibold">Unit</th>
              <th className="w-24 px-2 py-2 text-right font-semibold">Rate</th>
              <th className="w-28 px-2 py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={l.id} className="border-b border-[#e2e8ee]">
                <td className="px-2 py-2 text-[#5a6b7a] tabular-nums">{i + 1}</td>
                <td className="px-2 py-2 leading-snug">{l.description}</td>
                <td className="px-2 py-2 text-right tabular-nums">{l.qty.toLocaleString()}</td>
                <td className="px-2 py-2 text-[#5a6b7a]">{l.unit}</td>
                <td className="px-2 py-2 text-right tabular-nums">{l.price.toLocaleString()}</td>
                <td className="px-2 py-2 text-right font-medium tabular-nums">
                  {(l.qty * l.price).toLocaleString()}
                </td>
              </tr>
            ))}
            {lines.length === 0 && (
              <tr>
                <td colSpan={6} className="px-2 py-6 text-center text-[#8a97a4]">
                  No items added
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* totals */}
        <section className="mt-4 flex justify-end">
          <dl className="w-64 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <dt className="text-[#5a6b7a]">Subtotal</dt>
              <dd className="tabular-nums">{money2(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-[#5a6b7a]">Discount ({discountPct}%)</dt>
                <dd className="tabular-nums text-[#a3392f]">− {money2(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-[#5a6b7a]">VAT {vatOn ? '(15%)' : '(exempt)'}</dt>
              <dd className="tabular-nums">{money2(vat)}</dd>
            </div>
            <div className="mt-1.5 flex justify-between border-t-2 border-[#1B4965] pt-2 text-[13px] font-bold text-[#1B4965]">
              <dt>Total</dt>
              <dd className="tabular-nums">{money2(total)}</dd>
            </div>
          </dl>
        </section>

        <p className="mt-3 rounded bg-[#f2f6fa] px-3 py-2 text-[10.5px] text-[#3d5164]">
          <span className="font-semibold">Amount in words:</span>{' '}
          <span className="first-letter:uppercase">{amountInWords(total)}</span>
        </p>

        {/* verification */}
        <footer className="mt-5 flex items-end justify-between gap-6 border-t border-[#e2e8ee] pt-4">
          <div className="flex gap-3">
            {qr ? (
              <img src={qr} alt="Verification QR code" className="size-[68px]" />
            ) : (
              <div className="size-[68px] animate-pulse rounded bg-[#e2e8ee]" />
            )}
            <div className="max-w-[15rem]">
              <p className="text-[9.5px] font-bold tracking-wider text-[#5a6b7a] uppercase">
                Verify this document
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-[#5a6b7a]">
                Scan to confirm this proforma against the issuing system. The code is a genuine,
                scannable QR — point a phone at it.
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="h-8 w-36 border-b border-[#8a97a4]" />
            <p className="mt-1 text-[9.5px] text-[#5a6b7a]">Authorised signature</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
