import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  BadgeCheck,
  CreditCard,
  LayoutDashboard,
  MessageSquarePlus,
  Search,
  Send,
  Smartphone,
  Users,
  Radio,
  Check,
  X,
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
  Select,
  Stat,
  StatRow,
  Table,
  TableWrap,
  TD,
  TH,
  Textarea,
  compact,
  cx,
  money,
  money2,
  shortDate,
  useToast,
  type Tone,
} from '../kit'
import {
  RATE,
  campaigns as seedCampaigns,
  contacts,
  dailyVolume,
  gateways,
  payments as seedPayments,
  plans,
  segments,
  segmentsFor,
  type Campaign,
  type Payment,
} from './data'

const nav: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
  { key: 'compose', label: 'Compose', icon: <MessageSquarePlus size={16} /> },
  { key: 'campaigns', label: 'Campaigns', icon: <Send size={16} />, badge: 5 },
  { key: 'contacts', label: 'Contacts', icon: <Users size={16} /> },
  { key: 'gateways', label: 'Gateways', icon: <Smartphone size={16} />, badge: '3/4' },
  { key: 'billing', label: 'Billing', icon: <CreditCard size={16} />, badge: 2 },
]

const titles: Record<string, [string, string]> = {
  overview: ['Overview', 'Delivery performance across the account'],
  compose: ['Compose', 'Merge fields, segment targeting and a live cost estimate'],
  campaigns: ['Campaigns', 'Every send and its delivery breakdown'],
  contacts: ['Contacts', 'Lists, opt-outs and imports'],
  gateways: ['Gateways', 'Android handsets paired to this account'],
  billing: ['Billing', 'Plans, quota and bank transfer approval'],
}

export default function FetanSmsDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('overview')
  const [campaigns, setCampaigns] = useState<Campaign[]>(seedCampaigns)
  const [payments, setPayments] = useState<Payment[]>(seedPayments)
  const [title, subtitle] = titles[screen]

  /** Walks any "sending" campaign towards completion so the demo feels live. */
  useEffect(() => {
    const live = campaigns.some((c) => c.status === 'sending')
    if (!live) return
    const timer = setInterval(() => {
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.status !== 'sending') return c
          const step = Math.ceil(c.recipients / 12)
          const done = Math.min(c.recipients, c.delivered + c.failed + step)
          const failed = Math.round(done * 0.032)
          return done >= c.recipients
            ? { ...c, delivered: c.recipients - failed, failed, status: 'completed' as const }
            : { ...c, delivered: done - failed, failed }
        }),
      )
    }, 700)
    return () => clearInterval(timer)
  }, [campaigns])

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={screen}
      onNavigate={setScreen}
      title={title}
      subtitle={subtitle}
      user={{ name: 'Fetan Tech', role: 'Account owner · Business plan' }}
    >
      {screen === 'overview' && <Overview campaigns={campaigns} />}
      {screen === 'compose' && (
        <Compose
          onSend={(c) => {
            setCampaigns((prev) => [c, ...prev])
            setScreen('campaigns')
          }}
        />
      )}
      {screen === 'campaigns' && <Campaigns campaigns={campaigns} />}
      {screen === 'contacts' && <Contacts />}
      {screen === 'gateways' && <Gateways />}
      {screen === 'billing' && <Billing payments={payments} setPayments={setPayments} />}
    </DemoShell>
  )
}

const tooltipStyle = {
  background: '#141922',
  border: '1px solid #262e3b',
  borderRadius: 10,
  fontSize: 12,
  color: '#eef2f8',
} as const

/* =================================================================== *
 * Overview
 * =================================================================== */

function Overview({ campaigns }: { campaigns: Campaign[] }) {
  const done = campaigns.filter((c) => c.status === 'completed')
  const delivered = done.reduce((s, c) => s + c.delivered, 0)
  const failed = done.reduce((s, c) => s + c.failed, 0)
  const rate = delivered + failed ? (delivered / (delivered + failed)) * 100 : 0
  const used = delivered + failed
  const quota = 25_000

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Delivered (30 days)" value={compact(delivered)} sub={`${rate.toFixed(1)}% delivery rate`} icon={<Send size={14} />} />
        <Stat label="Failed" value={failed.toLocaleString()} sub="Retried up to three times" />
        <Stat label="Quota used" value={`${Math.round((used / quota) * 100)}%`} sub={`${used.toLocaleString()} of ${quota.toLocaleString()}`} icon={<Radio size={14} />} />
        <Stat label="Gateways online" value={`${gateways.filter((g) => g.online).length} / ${gateways.length}`} icon={<Smartphone size={14} />} />
      </StatRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHead title="Volume this week" hint="Delivered against failed, by day" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVolume} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
                <XAxis
                  dataKey="day"
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
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={tooltipStyle} />
                <Bar dataKey="delivered" stackId="a" fill="var(--accent)" radius={[0, 0, 0, 0]} maxBarSize={38} name="Delivered" />
                <Bar dataKey="failed" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={38} name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHead title="Gateway fleet" hint="Android handsets doing the sending" />
          <ul className="space-y-2.5">
            {gateways.map((g) => (
              <li key={g.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-chalk-100">
                      {g.label} · {g.device}
                    </p>
                    <p className="text-[11px] text-chalk-600">{g.operator}</p>
                  </div>
                  <Badge tone={g.online ? 'good' : 'bad'} dot>
                    {g.online ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <Progress
                    value={g.battery}
                    tone={g.battery < 20 ? '#f43f5e' : g.battery < 40 ? '#f59e0b' : '#34d399'}
                    className="flex-1"
                  />
                  <span className="tabular w-16 shrink-0 text-right text-[11px] text-chalk-500">
                    {g.battery}% · {g.queued}q
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Recent campaigns" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Campaign</TH>
                <TH className="hidden sm:table-cell">Segment</TH>
                <TH align="right">Recipients</TH>
                <TH align="right">Delivered</TH>
                <TH className="w-32">Rate</TH>
                <TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {campaigns.slice(0, 5).map((c) => {
                const total = c.delivered + c.failed
                const pct = total ? (c.delivered / total) * 100 : 0
                return (
                  <Row key={c.id}>
                    <TD>
                      <p className="font-medium text-chalk-100">{c.name}</p>
                      <p className="tabular font-mono text-[11px] text-chalk-600">{c.id}</p>
                    </TD>
                    <TD className="hidden sm:table-cell">{c.segment}</TD>
                    <TD align="right" className="tabular">
                      {c.recipients.toLocaleString()}
                    </TD>
                    <TD align="right" className="tabular">
                      {c.delivered.toLocaleString()}
                    </TD>
                    <TD>
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="flex-1" />
                        <span className="tabular w-10 text-right text-[11px] text-chalk-500">
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                    </TD>
                    <TD>
                      <Badge tone={statusTone(c.status)} dot>
                        {c.status}
                      </Badge>
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

function statusTone(s: Campaign['status']): Tone {
  return s === 'completed' ? 'good' : s === 'sending' ? 'accent' : s === 'scheduled' ? 'info' : 'neutral'
}

/* =================================================================== *
 * Compose
 * =================================================================== */

function Compose({ onSend }: { onSend: (c: Campaign) => void }) {
  const toast = useToast()
  const [name, setName] = useState('')
  const [segmentId, setSegmentId] = useState(segments[0].id)
  const [body, setBody] = useState(
    'Hi {{name}}, thank you for shopping with Fetan. Show this message for 10% off your next visit. Reply STOP to opt out.',
  )

  const segment = segments.find((s) => s.id === segmentId)!
  const { parts, limit, unicode } = segmentsFor(body)
  const cost = parts * segment.size * RATE

  const preview = body.replace(/\{\{name\}\}/g, 'Almaz')

  const send = () => {
    if (!body.trim()) return
    onSend({
      id: `CMP-${1186 + Math.floor(Math.random() * 30)}`,
      name: name.trim() || 'Untitled campaign',
      segment: segment.name,
      sent: '2026-08-13',
      recipients: segment.size,
      delivered: 0,
      failed: 0,
      status: 'sending',
      body,
    })
    toast(`Queued to ${segment.size.toLocaleString()} recipients across 3 gateways`)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-7">
        <Panel>
          <PanelHead title="Message" hint="Merge fields are replaced per recipient at send time" />
          <div className="space-y-3">
            <Field label="Campaign name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meskel promotion"
              />
            </Field>
            <Field label="Audience">
              <Select value={segmentId} onChange={(e) => setSegmentId(e.target.value)}>
                {segments.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.size.toLocaleString()} contacts
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Body" hint={segment.note}>
              <Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
            </Field>
            <div className="flex flex-wrap gap-1.5">
              {['{{name}}', '{{first_name}}', '{{balance}}', '{{branch}}'].map((f) => (
                <button
                  key={f}
                  onClick={() => setBody((b) => `${b}${f}`)}
                  className="rounded-md border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-[11px] text-chalk-400 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Cost estimate" hint={`Billed per segment at ${money2(RATE)} each`} />
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 sm:grid-cols-4">
            {[
              ['Characters', `${body.length} / ${limit}`],
              ['Segments', String(parts)],
              ['Recipients', segment.size.toLocaleString()],
              ['Estimated cost', money(cost)],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-900 px-3 py-3">
                <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                  {k}
                </dt>
                <dd className="tabular mt-1 text-[15px] font-semibold text-chalk-50">{v}</dd>
              </div>
            ))}
          </dl>
          {unicode && (
            <p className="mt-3 rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-2 text-[12px] text-amber-300">
              Non-GSM characters detected — the message switches to Unicode, so each part holds only{' '}
              {limit} characters instead of 153.
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <Btn variant="solid" size="md" onClick={send}>
              <Send size={14} /> Send now
            </Btn>
            <Btn size="md" onClick={() => toast('Saved as a draft')}>
              Save draft
            </Btn>
          </div>
        </Panel>
      </div>

      {/* handset preview */}
      <div className="lg:col-span-5">
        <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
          Handset preview
        </p>
        <div className="mx-auto w-full max-w-[17rem] rounded-[2rem] border-4 border-ink-700 bg-ink-950 p-3 shadow-2xl shadow-black/50">
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-ink-700" />
          <div className="flex items-center gap-2 border-b border-ink-800 pb-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-[var(--accent-soft)] text-[11px] font-bold text-[var(--accent)]">
              FT
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-chalk-100">FETAN</p>
              <p className="text-[10px] text-chalk-600">SMS</p>
            </div>
          </div>
          <div className="min-h-[13rem] py-3">
            {preview.trim() ? (
              <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-ink-800 px-3 py-2.5">
                <p className="text-[12.5px] leading-relaxed break-words text-chalk-100">
                  {preview}
                </p>
                <p className="mt-1.5 text-[10px] text-chalk-600">
                  now · {parts} segment{parts === 1 ? '' : 's'}
                </p>
              </div>
            ) : (
              <p className="pt-10 text-center text-[12px] text-chalk-600">
                Your message appears here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =================================================================== *
 * Campaigns
 * =================================================================== */

function Campaigns({ campaigns }: { campaigns: Campaign[] }) {
  const [openId, setOpenId] = useState<string | null>(campaigns[0]?.id ?? null)
  const selected = campaigns.find((c) => c.id === openId) ?? campaigns[0] ?? null

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Panel className="lg:col-span-3">
        <PanelHead title="All campaigns" hint="Click a row to open its delivery breakdown" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Campaign</TH>
                <TH className="hidden md:table-cell">Segment</TH>
                <TH align="right">Sent</TH>
                <TH>Status</TH>
                <TH align="right">Date</TH>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <Row key={c.id} onClick={() => setOpenId(c.id)} active={c.id === selected?.id}>
                  <TD>
                    <p className="font-medium text-chalk-100">{c.name}</p>
                    <p className="tabular font-mono text-[11px] text-chalk-600">{c.id}</p>
                  </TD>
                  <TD className="hidden md:table-cell">{c.segment}</TD>
                  <TD align="right" className="tabular">
                    {c.recipients.toLocaleString()}
                  </TD>
                  <TD>
                    <Badge tone={statusTone(c.status)} dot>
                      {c.status}
                    </Badge>
                  </TD>
                  <TD align="right" className="tabular text-[12px]">
                    {shortDate(c.sent)}
                  </TD>
                </Row>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>

      <Panel className="lg:col-span-2">
        {selected ? (
          <>
            <PanelHead title={selected.name} hint={selected.id} />
            <div className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
              <p className="text-[12.5px] leading-relaxed text-chalk-300">{selected.body}</p>
            </div>

            <dl className="mt-4 space-y-3">
              {[
                { k: 'Delivered', v: selected.delivered, tone: '#34d399' },
                { k: 'Failed', v: selected.failed, tone: '#f43f5e' },
                {
                  k: 'Pending',
                  v: Math.max(0, selected.recipients - selected.delivered - selected.failed),
                  tone: '#6b7688',
                },
              ].map((r) => {
                const pct = selected.recipients ? (r.v / selected.recipients) * 100 : 0
                return (
                  <div key={r.k}>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[12px] text-chalk-500">{r.k}</dt>
                      <dd className="tabular text-[13px] font-medium text-chalk-100">
                        {r.v.toLocaleString()}{' '}
                        <span className="text-[11px] text-chalk-600">({pct.toFixed(1)}%)</span>
                      </dd>
                    </div>
                    <Progress value={pct} tone={r.tone} className="mt-1.5" />
                  </div>
                )
              })}
            </dl>

            <dl className="mt-5 border-t border-ink-800 pt-4 text-[12.5px]">
              <div className="flex justify-between gap-3 py-1.5">
                <dt className="text-chalk-600">Segment</dt>
                <dd className="text-chalk-200">{selected.segment}</dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5">
                <dt className="text-chalk-600">Parts per message</dt>
                <dd className="tabular text-chalk-200">{segmentsFor(selected.body).parts}</dd>
              </div>
              <div className="flex justify-between gap-3 py-1.5">
                <dt className="text-chalk-600">Cost</dt>
                <dd className="tabular text-chalk-200">
                  {money(segmentsFor(selected.body).parts * selected.recipients * RATE)}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <Empty>No campaigns yet.</Empty>
        )}
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Contacts
 * =================================================================== */

function Contacts() {
  const [q, setQ] = useState('')
  const [seg, setSeg] = useState('all')

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return contacts.filter((c) => {
      if (seg !== 'all' && c.segment !== seg) return false
      if (!needle) return true
      return `${c.name} ${c.msisdn} ${c.segment}`.toLowerCase().includes(needle)
    })
  }, [q, seg])

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Total contacts" value="8,420" icon={<Users size={14} />} />
        <Stat label="Opted out" value="164" sub="Excluded from every send" />
        <Stat label="Segments" value={segments.length} />
        <Stat label="Added this month" value="615" />
      </StatRow>

      <Panel>
        <PanelHead
          title="Segments"
          hint="Membership is evaluated at send time, not stored"
        />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSeg(s.name)}
              className={cx(
                'rounded-lg border p-3.5 text-left transition-colors',
                seg === s.name
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'border-ink-700 bg-ink-900 hover:border-ink-600',
              )}
            >
              <p className="text-[12.5px] font-medium text-chalk-100">{s.name}</p>
              <p className="tabular mt-1.5 text-xl font-semibold text-chalk-50">
                {compact(s.size)}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-chalk-600">{s.note}</p>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Contact list"
          hint="Numbers are masked in this demo"
          right={
            <div className="flex items-center gap-2">
              {seg !== 'all' && <Btn onClick={() => setSeg('all')}>Clear segment</Btn>}
              <div className="relative w-48">
                <Search
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-chalk-600"
                />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="pl-8"
                />
              </div>
            </div>
          }
        />
        {shown.length === 0 ? (
          <Empty>No contacts match.</Empty>
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <TH>Name</TH>
                  <TH>Number</TH>
                  <TH className="hidden sm:table-cell">Segment</TH>
                  <TH className="hidden md:table-cell">Joined</TH>
                  <TH align="center">Status</TH>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <Row key={c.id}>
                    <TD className="font-medium text-chalk-100">{c.name}</TD>
                    <TD className="tabular font-mono text-[12px]">{c.msisdn}</TD>
                    <TD className="hidden sm:table-cell">{c.segment}</TD>
                    <TD className="tabular hidden md:table-cell text-[12px]">
                      {shortDate(c.joined)}
                    </TD>
                    <TD align="center">
                      <Badge tone={c.optedOut ? 'bad' : 'good'} dot>
                        {c.optedOut ? 'Opted out' : 'Subscribed'}
                      </Badge>
                    </TD>
                  </Row>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </Panel>
    </div>
  )
}

/* =================================================================== *
 * Gateways
 * =================================================================== */

function Gateways() {
  return (
    <div className="space-y-4">
      <Panel>
        <PanelHead
          title="How sending works"
          hint="Each handset runs the FetanSMS Android app, polls the API for queued messages, sends them over the operator network, and reports delivery status back."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['1 · Queue', 'The API accepts a campaign and expands it into one row per recipient.'],
            ['2 · Poll', 'Paired handsets pull batches sized to their remaining daily allowance.'],
            ['3 · Report', 'Each handset posts back sent, delivered or failed with the operator reason.'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
              <p className="text-[12px] font-semibold text-[var(--accent)]">{k}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-chalk-400">{v}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2">
        {gateways.map((g) => (
          <Panel key={g.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={cx(
                    'grid size-10 place-items-center rounded-xl',
                    g.online ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'bg-ink-700 text-chalk-600',
                  )}
                >
                  <Smartphone size={18} />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-chalk-50">{g.label}</p>
                  <p className="text-[11.5px] text-chalk-600">
                    {g.device} · {g.operator}
                  </p>
                </div>
              </div>
              <Badge tone={g.online ? 'good' : 'bad'} dot>
                {g.online ? 'Online' : 'Offline'}
              </Badge>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700">
              <div className="bg-ink-900 px-3 py-2.5">
                <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                  Battery
                </dt>
                <dd className="tabular mt-0.5 text-[13px] font-medium text-chalk-100">
                  {g.battery}%
                </dd>
              </div>
              <div className="bg-ink-900 px-3 py-2.5">
                <dt className="text-[10px] font-semibold tracking-wider text-chalk-600 uppercase">
                  Queued
                </dt>
                <dd className="tabular mt-0.5 text-[13px] font-medium text-chalk-100">
                  {g.queued}
                </dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </div>
  )
}

/* =================================================================== *
 * Billing
 * =================================================================== */

function Billing({
  payments,
  setPayments,
}: {
  payments: Payment[]
  setPayments: (fn: (prev: Payment[]) => Payment[]) => void
}) {
  const toast = useToast()
  const [current, setCurrent] = useState('business')

  const decide = (p: Payment, state: 'approved' | 'rejected') => {
    setPayments((prev) => prev.map((x) => (x.id === p.id ? { ...x, state } : x)))
    toast(
      state === 'approved'
        ? `${p.id} approved — quota topped up`
        : `${p.id} rejected and the customer notified`,
    )
  }

  return (
    <div className="space-y-4">
      <Panel>
        <PanelHead title="Subscription plans" hint="Quota resets on the billing anniversary" />
        <div className="grid gap-3 md:grid-cols-3">
          {plans.map((p) => {
            const on = p.id === current
            return (
              <div
                key={p.id}
                className={cx(
                  'rounded-xl border p-4 transition-colors',
                  on ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-ink-700 bg-ink-900',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-semibold text-chalk-50">{p.name}</p>
                  {on && <Badge tone="accent">Current</Badge>}
                </div>
                <p className="tabular mt-3 text-2xl font-semibold text-chalk-50">
                  {money(p.price)}
                  <span className="text-[13px] font-normal text-chalk-600"> /month</span>
                </p>
                <p className="tabular mt-1 text-[12px] text-chalk-500">
                  {p.quota.toLocaleString()} messages included
                </p>
                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] text-chalk-400">
                      <BadgeCheck size={13} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!on && (
                  <Btn
                    className="mt-4 w-full"
                    onClick={() => {
                      setCurrent(p.id)
                      toast(`Switched to the ${p.name} plan`)
                    }}
                  >
                    Switch to {p.name}
                  </Btn>
                )}
              </div>
            )
          })}
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Bank transfer approvals"
          hint="Customers upload a transfer receipt; an admin confirms it against the bank statement"
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Reference</TH>
                <TH className="hidden sm:table-cell">Plan</TH>
                <TH className="hidden md:table-cell">Method</TH>
                <TH align="right">Amount</TH>
                <TH>State</TH>
                <TH align="right">Action</TH>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <Row key={p.id}>
                  <TD>
                    <p className="tabular font-mono text-[12px] text-chalk-100">{p.id}</p>
                    <p className="tabular font-mono text-[11px] text-chalk-600">{p.reference}</p>
                  </TD>
                  <TD className="hidden sm:table-cell">{p.plan}</TD>
                  <TD className="hidden md:table-cell">{p.method}</TD>
                  <TD align="right" className="tabular font-medium text-chalk-100">
                    {money(p.amount)}
                  </TD>
                  <TD>
                    <Badge
                      tone={p.state === 'approved' ? 'good' : p.state === 'rejected' ? 'bad' : 'warn'}
                      dot
                    >
                      {p.state}
                    </Badge>
                  </TD>
                  <TD align="right">
                    {p.state === 'pending' ? (
                      <div className="flex justify-end gap-1.5">
                        <Btn variant="solid" onClick={() => decide(p, 'approved')}>
                          <Check size={13} /> Approve
                        </Btn>
                        <Btn onClick={() => decide(p, 'rejected')}>
                          <X size={13} />
                        </Btn>
                      </div>
                    ) : (
                      <span className="tabular text-[12px] text-chalk-600">
                        {shortDate(p.date)}
                      </span>
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
