import { useMemo, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  Building2,
  Check,
  CreditCard,
  Filter,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Send,
  Settings,
  Trash2,
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
  Select,
  Stat,
  StatRow,
  Table,
  TableWrap,
  TD,
  TH,
  cx,
  money,
  shortDate,
  useToast,
} from '../kit'
import {
  branches as seedBranches,
  dailyForwards,
  exceptionNumbers as seedExceptions,
  messages,
  payments,
  plans,
  salesPeople,
  subscription,
  type Branch,
  type ExceptionNumber,
} from './data'

const nav: NavItem[] = [
  { key: 'home', label: 'Home', icon: <LayoutDashboard size={16} /> },
  { key: 'messages', label: 'Messages', icon: <MessageSquare size={16} />, badge: messages.filter((m) => m.forwarded).length },
  { key: 'branches', label: 'Branches', icon: <Building2 size={16} /> },
  { key: 'telegram', label: 'Telegram', icon: <Send size={16} /> },
  { key: 'exceptions', label: 'Exceptions', icon: <Filter size={16} /> },
  { key: 'subscription', label: 'Subscription', icon: <CreditCard size={16} /> },
]

const titles: Record<string, [string, string]> = {
  home: ['Home', 'SMS interception overview and forwarding stats'],
  messages: ['Messages', 'Incoming SMS log — forwarded and ignored'],
  branches: ['Branches', 'Corporate branch management with sales person assignment'],
  telegram: ['Telegram Setup', 'Connect branches to Telegram channels'],
  exceptions: ['Exception Numbers', 'Numbers to skip when intercepting'],
  subscription: ['Subscription', 'Plan, usage and payment history'],
}

export default function FetanSmsDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('home')
  const [branchList, setBranchList] = useState<Branch[]>(seedBranches)
  const [exceptions, setExceptions] = useState<ExceptionNumber[]>(seedExceptions)
  const [title, subtitle] = titles[screen] ?? ['', '']

  return (
    <DemoShell project={project} nav={nav} active={screen} onNavigate={setScreen} title={title} subtitle={subtitle}>
      {screen === 'home' && <HomeScreen />}
      {screen === 'messages' && <MessagesScreen />}
      {screen === 'branches' && <BranchesScreen branches={branchList} setBranches={setBranchList} />}
      {screen === 'telegram' && <TelegramScreen branches={branchList} />}
      {screen === 'exceptions' && <ExceptionsScreen exceptions={exceptions} setExceptions={setExceptions} />}
      {screen === 'subscription' && <SubscriptionScreen />}
    </DemoShell>
  )
}

/* ───── Home ───── */

function HomeScreen() {
  const forwarded = messages.filter((m) => m.forwarded).length
  const ignored = messages.filter((m) => m.ignored).length
  const activeBranches = seedBranches.filter((b) => b.active).length

  return (
    <div className="space-y-6">
      <StatRow>
        <Stat label="Messages today" value={String(forwarded + ignored)} />
        <Stat label="Forwarded" value={String(forwarded)} />
        <Stat label="Ignored" value={String(ignored)} />
        <Stat label="Active branches" value={String(activeBranches)} />
      </StatRow>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHead title="Forwarding volume" hint="Messages intercepted this week" />
          <div className="h-56 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyForwards} barGap={4}>
                <XAxis dataKey="day" tick={{ fill: '#8994a6', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8994a6', fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: '#141922', border: '1px solid #1c222d', borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="forwarded" name="Forwarded" fill="#A07CF0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ignored" name="Ignored" fill="#38424f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Subscription status" />
          <div className="space-y-4 px-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-chalk-300">Plan</span>
              <Badge tone="accent">{subscription.plan}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-chalk-300">Status</span>
              <Badge tone="good">Active</Badge>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-chalk-500">Messages used</span>
                <span className="tabular text-chalk-100">{subscription.messagesUsed.toLocaleString()} / {subscription.messagesLimit.toLocaleString()}</span>
              </div>
              <Progress value={(subscription.messagesUsed / subscription.messagesLimit) * 100} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-chalk-500">Renews</span>
              <span className="text-chalk-100">{shortDate(subscription.endDate)}</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Recent messages" hint="Last 5 intercepted SMS" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>From</TH>
                <TH>Message</TH>
                <TH>Branch</TH>
                <TH>Status</TH>
                <TH>Time</TH>
              </tr>
            </thead>
            <tbody>
              {messages.slice(0, 5).map((m) => (
                <tr key={m.id}>
                  <TD className="font-mono">{m.from}</TD>
                  <TD className="max-w-[320px] truncate">{m.body}</TD>
                  <TD>{m.branch || '—'}</TD>
                  <TD>
                    <Badge tone={m.forwarded ? 'good' : m.ignored ? 'neutral' : 'warn'}>
                      {m.forwarded ? 'Forwarded' : m.ignored ? 'Ignored' : 'Pending'}
                    </Badge>
                  </TD>
                  <TD className="tabular whitespace-nowrap">{m.received}</TD>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </div>
  )
}

/* ───── Messages ───── */

function MessagesScreen() {
  const [filter, setFilter] = useState<'all' | 'forwarded' | 'ignored'>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = messages
    if (filter === 'forwarded') list = list.filter((m) => m.forwarded)
    if (filter === 'ignored') list = list.filter((m) => m.ignored)
    if (q) list = list.filter((m) => m.body.toLowerCase().includes(q.toLowerCase()) || m.from.includes(q))
    return list
  }, [filter, q])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-chalk-600" />
          <Input className="pl-9" placeholder="Search messages or numbers…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
          <option value="all">All messages</option>
          <option value="forwarded">Forwarded</option>
          <option value="ignored">Ignored</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty>No messages match this filter.</Empty>
      ) : (
        <Panel>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <TH>From</TH>
                  <TH>Message</TH>
                  <TH>Branch</TH>
                  <TH>Status</TH>
                  <TH>Received</TH>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id}>
                    <TD className="font-mono">{m.from}</TD>
                    <TD>
                      <p className="max-w-md text-sm leading-relaxed">{m.body}</p>
                    </TD>
                    <TD>{m.branch || '—'}</TD>
                    <TD>
                      <Badge tone={m.forwarded ? 'good' : m.ignored ? 'neutral' : 'warn'}>
                        {m.forwarded ? 'Forwarded' : m.ignored ? 'Ignored' : 'Pending'}
                      </Badge>
                    </TD>
                    <TD className="tabular whitespace-nowrap">{m.received}</TD>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </Panel>
      )}
    </div>
  )
}

/* ───── Branches ───── */

function BranchesScreen({
  branches,
  setBranches,
}: {
  branches: Branch[]
  setBranches: (b: Branch[]) => void
}) {
  const [editing, setEditing] = useState<string | null>(null)
  const toast = useToast()

  const toggle = (id: string) => {
    setBranches(branches.map((b) => (b.id === id ? { ...b, active: !b.active } : b)))
    const br = branches.find((b) => b.id === id)!
    toast(br.active ? `${br.name} deactivated` : `${br.name} activated`)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Btn size="sm" variant="solid" onClick={() => toast('Branch creation is handled in the Android app')}>
          <Plus size={14} /> Add branch
        </Btn>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {branches.map((b) => (
          <Panel key={b.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-chalk-50">{b.name}</h3>
                <p className="mt-0.5 text-sm text-chalk-500">{b.city}</p>
              </div>
              <Badge tone={b.active ? 'good' : 'neutral'}>{b.active ? 'Active' : 'Inactive'}</Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-chalk-500">Telegram</span>
                <span className={cx('font-mono text-xs', b.telegramChatId ? 'text-chalk-300' : 'text-chalk-600')}>
                  {b.telegramChatId || 'Not connected'}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-chalk-500">Sales people</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {salesPeople
                    .filter((sp) => b.salesPeople.includes(sp.id))
                    .map((sp) => (
                      <Badge key={sp.id} tone="info">{sp.name}</Badge>
                    ))}
                  {b.salesPeople.length === 0 && <span className="text-xs text-chalk-600">None assigned</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Btn size="sm" onClick={() => toggle(b.id)}>
                {b.active ? 'Deactivate' : 'Activate'}
              </Btn>
              <Btn size="sm" onClick={() => setEditing(b.id === editing ? null : b.id)}>
                <Settings size={13} /> Settings
              </Btn>
            </div>

            {editing === b.id && (
              <div className="mt-3 rounded-lg border border-ink-700 bg-ink-900 p-3">
                <p className="text-xs text-chalk-500">Branch settings are managed in the FetanSMS Android app. Pair this device and configure routing from there.</p>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  )
}

/* ───── Telegram Setup ───── */

function TelegramScreen({ branches }: { branches: Branch[] }) {
  const [step, setStep] = useState(0)
  const toast = useToast()

  return (
    <div className="space-y-6">
      <Panel>
        <PanelHead title="How it works" hint="FetanSMS Telegram integration" />
        <div className="space-y-3 text-sm text-chalk-300">
          <p>The FetanSMS Android app intercepts incoming SMS messages and forwards them to your Telegram channels in real time.</p>
          <ol className="list-inside list-decimal space-y-2 text-chalk-500">
            <li>Create a Telegram bot via <span className="font-mono text-chalk-300">@BotFather</span></li>
            <li>Add the bot to your business group or channel</li>
            <li>Enter the bot token and chat ID in the FetanSMS app</li>
            <li>Assign the channel to a branch — messages from that branch route there</li>
          </ol>
        </div>
      </Panel>

      <Panel>
        <PanelHead title="Branch → Channel routing" hint="Each branch forwards to its own Telegram channel" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Branch</TH>
                <TH>City</TH>
                <TH>Telegram channel</TH>
                <TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id}>
                  <TD>{b.name}</TD>
                  <TD>{b.city}</TD>
                  <TD className="font-mono">{b.telegramChatId || '—'}</TD>
                  <TD>
                    <Badge tone={b.telegramChatId ? 'good' : 'warn'}>
                      {b.telegramChatId ? 'Connected' : 'Not set'}
                    </Badge>
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>

      <Panel>
        <PanelHead title="Test connection" />
        <div className="flex gap-3">
          <Btn
            variant="solid"
            onClick={() => {
              setStep(1)
              setTimeout(() => {
                setStep(2)
                toast('Test message sent to Telegram')
              }, 1500)
            }}
          >
            <Send size={14} /> Send test message
          </Btn>
          {step === 1 && <span className="self-center text-sm text-chalk-500">Sending…</span>}
          {step === 2 && (
            <span className="self-center text-sm text-emerald-400">
              <Check size={14} className="mr-1 inline" />
              Delivered to Main Branch channel
            </span>
          )}
        </div>
      </Panel>
    </div>
  )
}

/* ───── Exception Numbers ───── */

function ExceptionsScreen({
  exceptions,
  setExceptions,
}: {
  exceptions: ExceptionNumber[]
  setExceptions: (e: ExceptionNumber[]) => void
}) {
  const [newNum, setNewNum] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const toast = useToast()

  const add = () => {
    if (!newNum.trim()) return
    setExceptions([...exceptions, { id: `ex${Date.now()}`, number: newNum.trim(), label: newLabel.trim() || 'Unlabeled' }])
    setNewNum('')
    setNewLabel('')
    toast('Exception number added')
  }

  const remove = (id: string) => {
    setExceptions(exceptions.filter((e) => e.id !== id))
    toast('Exception number removed')
  }

  return (
    <div className="space-y-4">
      <Panel>
        <PanelHead title="Add exception" hint="Messages from these numbers will be skipped" />
        <div className="flex flex-wrap gap-3">
          <Field label="Phone number" className="flex-1">
            <Input placeholder="+251 91 1234567 or short code" value={newNum} onChange={(e) => setNewNum(e.target.value)} />
          </Field>
          <Field label="Label" className="flex-1">
            <Input placeholder="e.g. Telecom promotions" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
          </Field>
          <div className="flex items-end">
            <Btn variant="solid" onClick={add}>
              <Plus size={14} /> Add
            </Btn>
          </div>
        </div>
      </Panel>

      <Panel>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Number</TH>
                <TH>Label</TH>
                <TH>Action</TH>
              </tr>
            </thead>
            <tbody>
              {exceptions.map((ex) => (
                <tr key={ex.id}>
                  <TD className="font-mono">{ex.number}</TD>
                  <TD>{ex.label}</TD>
                  <TD>
                    <Btn size="sm" onClick={() => remove(ex.id)}>
                      <Trash2 size={13} />
                    </Btn>
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </div>
  )
}

/* ───── Subscription ───── */

function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Panel>
        <PanelHead title="Current plan" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-chalk-300">Plan</span>
            <span className="font-semibold text-chalk-50">{subscription.plan}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-chalk-300">Status</span>
            <Badge tone="good">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-chalk-300">Period</span>
            <span className="tabular text-chalk-100">{shortDate(subscription.startDate)} — {shortDate(subscription.endDate)}</span>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-chalk-500">Usage</span>
              <span className="tabular text-chalk-100">{subscription.messagesUsed.toLocaleString()} / {subscription.messagesLimit.toLocaleString()} messages</span>
            </div>
            <Progress value={(subscription.messagesUsed / subscription.messagesLimit) * 100} />
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHead title="Available plans" hint="Upgrade or change your plan" />
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cx(
                'cursor-pointer rounded-xl border p-4 transition-colors',
                subscription.plan.toLowerCase() === p.id
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                  : selectedPlan === p.id
                    ? 'border-chalk-500 bg-ink-850'
                    : 'border-ink-700 bg-ink-900 hover:border-ink-600',
              )}
              onClick={() => setSelectedPlan(p.id)}
            >
              <h3 className="text-lg font-semibold text-chalk-50">{p.name}</h3>
              <p className="mt-1 text-2xl font-bold text-chalk-50">
                {p.price.toLocaleString()} <span className="text-sm font-normal text-chalk-500">ETB/mo</span>
              </p>
              <p className="mt-1 text-sm text-chalk-500">{p.limit.toLocaleString()} messages</p>
              <ul className="mt-3 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-chalk-300">
                    <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              {subscription.plan.toLowerCase() === p.id && (
                <span className="mt-3 inline-block">
                  <Badge tone="accent">Current plan</Badge>
                </span>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHead title="Payment history" />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Reference</TH>
                <TH>Plan</TH>
                <TH>Amount</TH>
                <TH>Method</TH>
                <TH>Date</TH>
                <TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <TD className="font-mono">{p.id}</TD>
                  <TD>{p.plan}</TD>
                  <TD className="tabular">{money(p.amount)}</TD>
                  <TD>{p.method}</TD>
                  <TD className="tabular">{shortDate(p.date)}</TD>
                  <TD>
                    <Badge tone={p.state === 'approved' ? 'good' : p.state === 'pending' ? 'warn' : 'bad'}>
                      {p.state}
                    </Badge>
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </div>
  )
}
