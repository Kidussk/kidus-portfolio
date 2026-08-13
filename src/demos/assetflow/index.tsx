import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Boxes,
  Building2,
  LayoutDashboard,
  Package,
  Wrench,
  Search,
  ArrowRightLeft,
  TrendingDown,
  CircleAlert,
  ChevronRight,
  Plus,
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
  Drawer,
  compact,
  cx,
  money,
  shortDate,
  useToast,
  type Tone,
} from '../kit'
import {
  ageLabel,
  assets as seedAssets,
  bookValue,
  branchOfAsset,
  branches,
  buildings,
  categories,
  locationLabel,
  movements,
  rooms,
  statusMeta,
  stock,
  workOrders as seedOrders,
  type Asset,
  type WorkOrder,
} from './data'

const nav: NavItem[] = [
  { key: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { key: 'assets', label: 'Asset register', icon: <Boxes size={16} />, badge: seedAssets.length },
  { key: 'locations', label: 'Locations', icon: <Building2 size={16} /> },
  { key: 'maintenance', label: 'Maintenance', icon: <Wrench size={16} />, badge: 5 },
  { key: 'inventory', label: 'Inventory', icon: <Package size={16} /> },
]

const titles: Record<string, [string, string]> = {
  overview: ['Dashboard', 'Portfolio position across all branches'],
  assets: ['Asset register', 'Every registered asset with its location and custodian'],
  locations: ['Locations', 'Branch → building → floor → room'],
  maintenance: ['Maintenance', 'Work orders and preventive schedules'],
  inventory: ['Inventory', 'Consumable stock and reorder levels'],
}

export default function AssetFlowDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('overview')
  const [assets, setAssets] = useState<Asset[]>(seedAssets)
  const [orders, setOrders] = useState<WorkOrder[]>(seedOrders)
  const [title, subtitle] = titles[screen]

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={screen}
      onNavigate={setScreen}
      title={title}
      subtitle={subtitle}
      user={{ name: 'Selamawit Bekele', role: 'Asset Administrator' }}
      actions={
        <Btn variant="solid">
          <Plus size={14} /> <span className="hidden sm:inline">Register asset</span>
        </Btn>
      }
    >
      {screen === 'overview' && <Overview assets={assets} orders={orders} />}
      {screen === 'assets' && <Register assets={assets} setAssets={setAssets} />}
      {screen === 'locations' && <Locations assets={assets} />}
      {screen === 'maintenance' && <Maintenance orders={orders} setOrders={setOrders} />}
      {screen === 'inventory' && <Inventory />}
    </DemoShell>
  )
}

/* =================================================================== *
 * Dashboard
 * =================================================================== */

function Overview({ assets, orders }: { assets: Asset[]; orders: WorkOrder[] }) {
  const live = assets.filter((a) => a.status !== 'disposed')
  const totalCost = live.reduce((s, a) => s + a.cost, 0)
  const totalBook = live.reduce((s, a) => s + bookValue(a), 0)
  const openOrders = orders.filter((o) => o.status !== 'completed')

  const byCategory = useMemo(
    () =>
      categories
        .map((c) => ({
          name: c,
          short: c.split(' ')[0],
          value: live.filter((a) => a.category === c).reduce((s, a) => s + bookValue(a), 0),
        }))
        .filter((d) => d.value > 0)
        .sort((a, b) => b.value - a.value),
    [live],
  )

  const byBranch = useMemo(
    () =>
      branches.map((b) => ({
        name: b.name,
        value: live.filter((a) => branchOfAsset(a).id === b.id).length,
      })),
    [live],
  )

  const pieColors = ['var(--accent)', '#7FA0FF', '#4A5D8F']
  const depreciated = totalCost - totalBook

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat
          label="Registered assets"
          value={live.length}
          sub={`${assets.length - live.length} disposed this year`}
          icon={<Boxes size={14} />}
        />
        <Stat
          label="Acquisition value"
          value={`ETB ${compact(totalCost)}`}
          sub="Original purchase cost"
          icon={<Package size={14} />}
        />
        <Stat
          label="Net book value"
          value={`ETB ${compact(totalBook)}`}
          sub={`ETB ${compact(depreciated)} depreciated`}
          icon={<TrendingDown size={14} />}
        />
        <Stat
          label="Open work orders"
          value={openOrders.length}
          sub={`${openOrders.filter((o) => o.priority === 'High').length} high priority`}
          icon={<Wrench size={14} />}
        />
      </StatRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHead
            title="Net book value by category"
            hint="Straight-line depreciation to a 5% residual"
          />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
                <XAxis
                  dataKey="short"
                  tick={{ fill: '#6b7688', fontSize: 11 }}
                  axisLine={{ stroke: '#1c222d' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6b7688', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => compact(v as number)}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: '#eef2f8', fontWeight: 600, marginBottom: 4 }}
                  formatter={(v) => [money(v as number), 'Book value']}
                  labelFormatter={(_, p) => p?.[0]?.payload?.name ?? ''}
                />
                <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHead title="Assets by branch" hint="Count of active assets" />
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byBranch}
                    dataKey="value"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {byBranch.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="min-w-0 flex-1 space-y-2.5">
              {byBranch.map((b, i) => (
                <li key={b.name} className="flex items-center gap-2.5 text-[13px]">
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{ background: pieColors[i % pieColors.length] }}
                  />
                  <span className="min-w-0 flex-1 truncate text-chalk-300">{b.name}</span>
                  <span className="tabular font-semibold text-chalk-100">{b.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHead title="Recent movements" hint="Immutable audit trail per asset" />
          <ul className="space-y-3">
            {movements.slice(0, 5).map((m) => (
              <li key={m.id} className="flex gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <ArrowRightLeft size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-chalk-100">
                    <span className="font-semibold">{m.action}</span>
                    <span className="tabular mx-1.5 text-chalk-600">·</span>
                    <span className="tabular font-mono text-[12px] text-chalk-500">
                      {m.assetTag}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-chalk-500">{m.detail}</p>
                  <p className="mt-1 text-[11px] text-chalk-600">
                    {m.who} · {shortDate(m.when)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHead title="Needs attention" hint="Ranked by business impact" />
          <ul className="space-y-2.5">
            {stock
              .filter((s) => s.onHand < s.reorderAt)
              .map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5"
                >
                  <CircleAlert size={15} className="shrink-0 text-amber-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-chalk-100">{s.name}</p>
                    <p className="text-[11px] text-chalk-500">
                      {s.onHand} {s.unit} on hand · reorder at {s.reorderAt} · {s.store}
                    </p>
                  </div>
                  <Badge tone="warn">Reorder</Badge>
                </li>
              ))}
            {orders
              .filter((o) => o.priority === 'High' && o.status !== 'completed')
              .map((o) => (
                <li
                  key={o.id}
                  className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5"
                >
                  <Wrench size={15} className="shrink-0 text-rose-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-chalk-100">
                      {o.assetName}
                    </p>
                    <p className="text-[11px] text-chalk-500">
                      {o.id} · due {shortDate(o.due)} · {o.technician}
                    </p>
                  </div>
                  <Badge tone="bad">High</Badge>
                </li>
              ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

const tooltipStyle = {
  background: '#141922',
  border: '1px solid #262e3b',
  borderRadius: 10,
  fontSize: 12,
  color: '#eef2f8',
  boxShadow: '0 12px 32px rgba(0,0,0,.45)',
} as const

/* =================================================================== *
 * Asset register
 * =================================================================== */

function Register({
  assets,
  setAssets,
}: {
  assets: Asset[]
  setAssets: (fn: (prev: Asset[]) => Asset[]) => void
}) {
  const [q, setQ] = useState('')
  const [branch, setBranch] = useState('all')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const toast = useToast()

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return assets.filter((a) => {
      if (branch !== 'all' && branchOfAsset(a).id !== branch) return false
      if (category !== 'all' && a.category !== category) return false
      if (status !== 'all' && a.status !== status) return false
      if (!needle) return true
      return `${a.tag} ${a.name} ${a.model} ${a.serial} ${a.custodian}`
        .toLowerCase()
        .includes(needle)
    })
  }, [assets, q, branch, category, status])

  const selected = assets.find((a) => a.id === openId) ?? null
  const shownValue = filtered
    .filter((a) => a.status !== 'disposed')
    .reduce((s, a) => s + bookValue(a), 0)

  function move(a: Asset, next: Asset['status'], msg: string) {
    setAssets((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: next } : x)))
    toast(msg)
  }

  return (
    <div className="space-y-4">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Search">
            <div className="relative">
              <Search
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-chalk-600"
              />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tag, name, serial, custodian…"
                className="pl-8"
              />
            </div>
          </Field>
          <Field label="Branch">
            <Select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="all">All branches</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Category">
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Any status</option>
              {Object.entries(statusMeta).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title={`${filtered.length} asset${filtered.length === 1 ? '' : 's'}`}
          hint={`Net book value of the current selection: ${money(shownValue)}`}
          right={
            (q || branch !== 'all' || category !== 'all' || status !== 'all') && (
              <Btn
                onClick={() => {
                  setQ('')
                  setBranch('all')
                  setCategory('all')
                  setStatus('all')
                }}
              >
                Clear filters
              </Btn>
            )
          }
        />

        {filtered.length === 0 ? (
          <Empty>No assets match those filters.</Empty>
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <TH>Tag</TH>
                  <TH>Asset</TH>
                  <TH className="hidden md:table-cell">Location</TH>
                  <TH className="hidden lg:table-cell">Custodian</TH>
                  <TH>Status</TH>
                  <TH align="right">Book value</TH>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const meta = statusMeta[a.status]
                  return (
                    <Row key={a.id} onClick={() => setOpenId(a.id)} active={a.id === openId}>
                      <TD className="tabular font-mono text-[12px] text-chalk-500">{a.tag}</TD>
                      <TD>
                        <p className="font-medium text-chalk-100">{a.name}</p>
                        <p className="text-[11px] text-chalk-600">{a.category}</p>
                      </TD>
                      <TD className="hidden md:table-cell text-[12px]">{locationLabel(a)}</TD>
                      <TD className="hidden lg:table-cell">{a.custodian}</TD>
                      <TD>
                        <Badge tone={meta.tone as Tone} dot>
                          {meta.label}
                        </Badge>
                      </TD>
                      <TD align="right" className="tabular font-medium text-chalk-100">
                        {money(bookValue(a))}
                      </TD>
                    </Row>
                  )
                })}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Panel>

      <Drawer
        open={!!selected}
        onClose={() => setOpenId(null)}
        title={selected?.name ?? ''}
        subtitle={selected?.tag}
        footer={
          selected && (
            <div className="flex gap-2">
              {selected.status === 'checked-out' ? (
                <Btn
                  variant="solid"
                  onClick={() =>
                    move(selected, 'in-service', `${selected.tag} checked in and back in service`)
                  }
                >
                  Check in
                </Btn>
              ) : (
                <Btn
                  variant="solid"
                  disabled={selected.status === 'disposed'}
                  onClick={() =>
                    move(selected, 'checked-out', `${selected.tag} checked out to ${selected.custodian}`)
                  }
                >
                  Check out
                </Btn>
              )}
              <Btn
                disabled={selected.status === 'disposed' || selected.status === 'maintenance'}
                onClick={() =>
                  move(selected, 'maintenance', `Work order opened for ${selected.tag}`)
                }
              >
                Send to maintenance
              </Btn>
            </div>
          )
        }
      >
        {selected && <AssetDetail asset={selected} />}
      </Drawer>
    </div>
  )
}

function AssetDetail({ asset }: { asset: Asset }) {
  const book = bookValue(asset)
  const pct = asset.cost ? (book / asset.cost) * 100 : 0
  const meta = statusMeta[asset.status]
  const history = movements.filter((m) => m.assetTag === asset.tag)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={meta.tone as Tone} dot>
          {meta.label}
        </Badge>
        <Badge tone={asset.condition === 'poor' ? 'bad' : asset.condition === 'fair' ? 'warn' : 'good'}>
          Condition: {asset.condition}
        </Badge>
        <Badge>{asset.category}</Badge>
      </div>

      <div className="rounded-xl border border-ink-700 bg-ink-900 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-chalk-500 uppercase">
              Net book value
            </p>
            <p className="tabular mt-1 text-2xl font-semibold text-chalk-50">{money(book)}</p>
          </div>
          <p className="tabular text-right text-xs text-chalk-500">
            {pct.toFixed(0)}% of
            <br />
            {money(asset.cost)}
          </p>
        </div>
        <Progress value={pct} className="mt-3" />
        <p className="mt-2 text-[11px] text-chalk-600">
          Straight-line over {asset.lifeYears} years to a 5% residual · in service {ageLabel(asset)}
        </p>
      </div>

      <dl>
        <KeyVal k="Asset tag" v={<span className="font-mono text-[12px]">{asset.tag}</span>} />
        <KeyVal k="Model" v={asset.model} />
        <KeyVal k="Serial" v={<span className="font-mono text-[12px]">{asset.serial}</span>} />
        <KeyVal k="Location" v={locationLabel(asset)} />
        <KeyVal k="Custodian" v={asset.custodian} />
        <KeyVal k="Purchased" v={shortDate(asset.purchased)} />
        <KeyVal k="Acquisition cost" v={money(asset.cost)} />
        <KeyVal k="Useful life" v={`${asset.lifeYears} years`} />
      </dl>

      <div>
        <h4 className="mb-3 text-[13px] font-semibold text-chalk-100">Movement history</h4>
        {history.length === 0 ? (
          <p className="text-xs text-chalk-600">
            No movements recorded since registration on {shortDate(asset.purchased)}.
          </p>
        ) : (
          <ol className="space-y-3 border-l border-ink-700 pl-4">
            {history.map((m) => (
              <li key={m.id} className="relative">
                <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-[var(--accent)]" />
                <p className="text-[13px] font-medium text-chalk-100">{m.action}</p>
                <p className="text-xs text-chalk-500">{m.detail}</p>
                <p className="mt-0.5 text-[11px] text-chalk-600">
                  {m.who} · {shortDate(m.when)}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

/* =================================================================== *
 * Locations
 * =================================================================== */

function Locations({ assets }: { assets: Asset[] }) {
  const [openBranch, setOpenBranch] = useState<string>(branches[0].id)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {branches.map((b) => {
          const owned = assets.filter((a) => branchOfAsset(a).id === b.id && a.status !== 'disposed')
          const value = owned.reduce((s, a) => s + bookValue(a), 0)
          const on = openBranch === b.id
          return (
            <button
              key={b.id}
              onClick={() => setOpenBranch(b.id)}
              className={cx(
                'rounded-xl border p-4 text-left transition-colors',
                on
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'border-ink-700 bg-ink-850 hover:border-ink-600',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-chalk-50">{b.name}</p>
                  <p className="text-xs text-chalk-500">{b.city}</p>
                </div>
                <Building2 size={16} className={on ? 'text-[var(--accent)]' : 'text-chalk-600'} />
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="tabular text-xl font-semibold text-chalk-50">{owned.length}</p>
                  <p className="text-[11px] text-chalk-600">assets</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-[13px] font-medium text-chalk-100">
                    ETB {compact(value)}
                  </p>
                  <p className="text-[11px] text-chalk-600">book value</p>
                </div>
              </div>
              <p className="mt-3 border-t border-ink-700 pt-2.5 text-[11px] text-chalk-500">
                Branch manager · {b.manager}
              </p>
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        {buildings
          .filter((bl) => bl.branchId === openBranch)
          .map((bl) => {
            const buildingRooms = rooms.filter((r) => r.buildingId === bl.id)
            return (
              <Panel key={bl.id}>
                <PanelHead
                  title={bl.name}
                  hint={`${bl.floors} floor${bl.floors === 1 ? '' : 's'} · ${buildingRooms.length} rooms registered`}
                />
                <div className="grid gap-2.5 md:grid-cols-2">
                  {buildingRooms.map((r) => {
                    const inRoom = assets.filter(
                      (a) => a.roomId === r.id && a.status !== 'disposed',
                    )
                    const value = inRoom.reduce((s, a) => s + bookValue(a), 0)
                    return (
                      <div
                        key={r.id}
                        className="rounded-lg border border-ink-700 bg-ink-900 p-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-chalk-100">
                              {r.name}
                            </p>
                            <p className="tabular font-mono text-[11px] text-chalk-600">
                              {r.code} · Floor {r.floor}
                            </p>
                          </div>
                          <Badge tone={inRoom.length ? 'accent' : 'neutral'}>
                            {inRoom.length} asset{inRoom.length === 1 ? '' : 's'}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink-800 pt-2.5">
                          <p className="truncate text-[11px] text-chalk-500">
                            Responsible · <span className="text-chalk-300">{r.officer}</span>
                          </p>
                          <p className="tabular shrink-0 text-[12px] font-medium text-chalk-100">
                            ETB {compact(value)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Panel>
            )
          })}
      </div>
    </div>
  )
}

/* =================================================================== *
 * Maintenance
 * =================================================================== */

const columns = [
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'awaiting-parts', label: 'Awaiting parts' },
  { key: 'completed', label: 'Completed' },
] as const

const nextStatus: Record<WorkOrder['status'], WorkOrder['status'] | null> = {
  scheduled: 'in-progress',
  'in-progress': 'awaiting-parts',
  'awaiting-parts': 'completed',
  completed: null,
}

function Maintenance({
  orders,
  setOrders,
}: {
  orders: WorkOrder[]
  setOrders: (fn: (prev: WorkOrder[]) => WorkOrder[]) => void
}) {
  const [view, setView] = useState<'board' | 'list'>('board')
  const toast = useToast()

  const advance = (o: WorkOrder) => {
    const next = nextStatus[o.status]
    if (!next) return
    setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status: next } : x)))
    toast(`${o.id} moved to ${columns.find((c) => c.key === next)!.label.toLowerCase()}`)
  }

  const open = orders.filter((o) => o.status !== 'completed')
  const spend = orders.reduce((s, o) => s + o.cost, 0)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Open orders" value={open.length} icon={<Wrench size={14} />} />
        <Stat
          label="High priority"
          value={open.filter((o) => o.priority === 'High').length}
          icon={<CircleAlert size={14} />}
        />
        <Stat
          label="Preventive share"
          value={`${Math.round((orders.filter((o) => o.kind === 'Preventive').length / orders.length) * 100)}%`}
          sub="Target: above 60%"
        />
        <Stat label="Committed spend" value={`ETB ${compact(spend)}`} sub="This quarter" />
      </StatRow>

      <div className="flex items-center justify-between gap-3">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'board', label: 'Board' },
            { value: 'list', label: 'List' },
          ]}
        />
        <p className="text-xs text-chalk-600">Click a card to advance its stage</p>
      </div>

      {view === 'board' ? (
        <div className="scroll-slim -mx-3 overflow-x-auto px-3 sm:-mx-5 sm:px-5">
          <div className="grid min-w-[52rem] grid-cols-4 gap-3">
            {columns.map((col) => {
              const cards = orders.filter((o) => o.status === col.key)
              return (
                <div key={col.key} className="rounded-xl border border-ink-700 bg-ink-850 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[12px] font-semibold tracking-wide text-chalk-300 uppercase">
                      {col.label}
                    </h3>
                    <span className="tabular rounded-full bg-ink-700 px-1.5 text-[10px] font-semibold text-chalk-500">
                      {cards.length}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {cards.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => advance(o)}
                        disabled={o.status === 'completed'}
                        className="w-full rounded-lg border border-ink-700 bg-ink-900 p-3 text-left transition-colors enabled:hover:border-[var(--accent)] disabled:cursor-default"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="tabular font-mono text-[11px] text-chalk-600">
                            {o.id}
                          </span>
                          <Badge
                            tone={
                              o.priority === 'High'
                                ? 'bad'
                                : o.priority === 'Medium'
                                  ? 'warn'
                                  : 'neutral'
                            }
                          >
                            {o.priority}
                          </Badge>
                        </div>
                        <p className="mt-1.5 text-[13px] font-medium text-chalk-100">
                          {o.assetName}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[11px] text-chalk-500">{o.note}</p>
                        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-ink-800 pt-2 text-[11px] text-chalk-600">
                          <span className="truncate">{o.technician}</span>
                          <span className="tabular shrink-0">{shortDate(o.due)}</span>
                        </div>
                      </button>
                    ))}
                    {cards.length === 0 && (
                      <p className="rounded-lg border border-dashed border-ink-700 py-6 text-center text-[11px] text-chalk-600">
                        Nothing here
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
                  <TH>Order</TH>
                  <TH>Asset</TH>
                  <TH className="hidden md:table-cell">Type</TH>
                  <TH>Priority</TH>
                  <TH className="hidden lg:table-cell">Technician</TH>
                  <TH>Due</TH>
                  <TH align="right">Cost</TH>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <Row key={o.id} onClick={() => advance(o)}>
                    <TD className="tabular font-mono text-[12px] text-chalk-500">{o.id}</TD>
                    <TD className="font-medium text-chalk-100">{o.assetName}</TD>
                    <TD className="hidden md:table-cell">{o.kind}</TD>
                    <TD>
                      <Badge
                        tone={
                          o.priority === 'High' ? 'bad' : o.priority === 'Medium' ? 'warn' : 'neutral'
                        }
                      >
                        {o.priority}
                      </Badge>
                    </TD>
                    <TD className="hidden lg:table-cell">{o.technician}</TD>
                    <TD className="tabular">{shortDate(o.due)}</TD>
                    <TD align="right" className="tabular">
                      {money(o.cost)}
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
 * Inventory
 * =================================================================== */

function Inventory() {
  const [store, setStore] = useState('all')
  const stores = Array.from(new Set(stock.map((s) => s.store)))
  const rows = stock.filter((s) => store === 'all' || s.store === store)
  const value = rows.reduce((s, i) => s + i.onHand * i.unitCost, 0)
  const low = rows.filter((s) => s.onHand < s.reorderAt)

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Stock lines" value={rows.length} icon={<Package size={14} />} />
        <Stat label="Stock value" value={money(value)} />
        <Stat label="Below reorder" value={low.length} icon={<CircleAlert size={14} />} />
        <Stat label="Stores" value={stores.length} icon={<Building2 size={14} />} />
      </StatRow>

      <Panel>
        <PanelHead
          title="Consumables"
          hint="Levels update as items are issued against work orders"
          right={
            <Segmented
              value={store}
              onChange={setStore}
              options={[
                { value: 'all', label: 'All stores' },
                ...stores.map((s) => ({ value: s, label: s })),
              ]}
            />
          }
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Item</TH>
                <TH className="hidden sm:table-cell">Store</TH>
                <TH align="right">On hand</TH>
                <TH align="right" className="hidden md:table-cell">
                  Reorder at
                </TH>
                <TH className="w-40">Level</TH>
                <TH align="right">Value</TH>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const pct = Math.min(100, (s.onHand / (s.reorderAt * 2)) * 100)
                const lowStock = s.onHand < s.reorderAt
                return (
                  <Row key={s.id}>
                    <TD>
                      <p className="font-medium text-chalk-100">{s.name}</p>
                      <p className="text-[11px] text-chalk-600">
                        {money(s.unitCost)} per {s.unit}
                      </p>
                    </TD>
                    <TD className="hidden sm:table-cell">{s.store}</TD>
                    <TD align="right" className="tabular font-medium text-chalk-100">
                      {s.onHand}
                    </TD>
                    <TD align="right" className="tabular hidden md:table-cell">
                      {s.reorderAt}
                    </TD>
                    <TD>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={pct}
                          tone={lowStock ? '#f59e0b' : undefined}
                          className="flex-1"
                        />
                        {lowStock && <Badge tone="warn">Low</Badge>}
                      </div>
                    </TD>
                    <TD align="right" className="tabular">
                      {money(s.onHand * s.unitCost)}
                    </TD>
                  </Row>
                )
              })}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>

      <Panel>
        <PanelHead title="Stores" hint="Each store belongs to a branch and has a keeper" />
        <div className="grid gap-2.5 sm:grid-cols-3">
          {stores.map((s) => {
            const items = stock.filter((i) => i.store === s)
            return (
              <div key={s} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-chalk-100">{s}</p>
                  <ChevronRight size={14} className="shrink-0 text-chalk-600" />
                </div>
                <p className="tabular mt-2 text-lg font-semibold text-chalk-50">
                  {money(items.reduce((t, i) => t + i.onHand * i.unitCost, 0))}
                </p>
                <p className="text-[11px] text-chalk-600">
                  {items.length} lines · {items.filter((i) => i.onHand < i.reorderAt).length} low
                </p>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
