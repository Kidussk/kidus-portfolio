import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BarChart3,
  Globe,
  Inbox,
  Package,
  Search,
  Tractor,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react'
import { DemoShell, type DemoProps, type NavItem } from '../DemoShell'
import {
  Badge,
  Btn,
  Empty,
  Field,
  Input,
  Modal,
  Panel,
  PanelHead,
  Row,
  Segmented,
  Stat,
  StatRow,
  Table,
  TableWrap,
  TD,
  TH,
  Textarea,
  cx,
  shortDate,
  useToast,
  type Tone,
} from '../kit'
import {
  brands,
  enquiries as seedEnquiries,
  products as seedProducts,
  sectorLabel,
  statusTone,
  trafficByWeek,
  type Enquiry,
  type Product,
  type Sector,
} from './data'

const nav: NavItem[] = [
  { key: 'site', label: 'Public site', icon: <Globe size={16} /> },
  { key: 'catalogue', label: 'Catalogue', icon: <Tractor size={16} /> },
  { key: 'enquiries', label: 'Enquiry inbox', icon: <Inbox size={16} />, badge: 2 },
  { key: 'products', label: 'Products', icon: <Package size={16} /> },
  { key: 'insights', label: 'Insights', icon: <BarChart3 size={16} /> },
]

const titles: Record<string, [string, string]> = {
  site: ['Public site', 'What a visitor sees at ethiotractors.com'],
  catalogue: ['Catalogue', 'Filter by sector, search by name, request a quote'],
  enquiries: ['Enquiry inbox', 'Every submission captured and attributable'],
  products: ['Products', 'The catalogue is driven entirely from here'],
  insights: ['Insights', 'Anonymous engagement counters'],
}

export default function EthioTractorsDemo({ project }: DemoProps) {
  const [screen, setScreen] = useState('site')
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [enquiries, setEnquiries] = useState<Enquiry[]>(seedEnquiries)
  /** Set when a visitor clicks "Get a quote" so the form arrives pre-filled. */
  const [quoteFor, setQuoteFor] = useState<Product | null>(null)
  const [title, subtitle] = titles[screen]

  const submitQuote = (e: Enquiry) => {
    setEnquiries((prev) => [e, ...prev])
    setProducts((prev) =>
      prev.map((p) => (p.name === e.interest ? { ...p, quoteClicks: p.quoteClicks + 1 } : p)),
    )
  }

  return (
    <DemoShell
      project={project}
      nav={nav}
      active={screen}
      onNavigate={setScreen}
      title={title}
      subtitle={subtitle}
      user={{ name: 'Abiy Getachew', role: 'Sales Manager' }}
    >
      {screen === 'site' && (
        <Storefront
          products={products}
          onBrowse={() => setScreen('catalogue')}
          onQuote={(p) => {
            setQuoteFor(p)
            setScreen('catalogue')
          }}
        />
      )}
      {screen === 'catalogue' && (
        <Catalogue products={products} quoteFor={quoteFor} setQuoteFor={setQuoteFor} onSubmit={submitQuote} />
      )}
      {screen === 'enquiries' && <InboxScreen enquiries={enquiries} setEnquiries={setEnquiries} />}
      {screen === 'products' && <ProductsAdmin products={products} setProducts={setProducts} />}
      {screen === 'insights' && <Insights products={products} enquiries={enquiries} />}
    </DemoShell>
  )
}

/* =================================================================== *
 * Public site
 * =================================================================== */

function Storefront({
  products,
  onBrowse,
  onQuote,
}: {
  products: Product[]
  onBrowse: () => void
  onQuote: (p: Product) => void
}) {
  const featured = products.filter((p) => p.published).slice(0, 3)

  return (
    <div className="space-y-4">
      {/* hero */}
      <div className="relative overflow-hidden rounded-xl border border-ink-700">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #0d1117 0%, #1a1408 55%, rgba(224,159,54,0.22) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="grid-veil absolute inset-0 opacity-20 [mask-image:linear-gradient(to_right,black,transparent)]"
        />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            EthioTractors
          </p>
          <h1 className="mt-4 max-w-2xl text-2xl leading-tight font-semibold text-balance text-chalk-50 sm:text-4xl">
            We import and support the machinery that farms, builds and mines Ethiopia.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-chalk-400">
            Authorised importer and distributor of Doğanlar, Zoomlion and Romsan machinery — with
            pre-purchase advisory, commissioning, genuine parts and nationwide delivery.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Btn variant="solid" size="md" onClick={onBrowse}>
              Browse the catalogue <ArrowRight size={15} />
            </Btn>
            <Btn size="md" onClick={onBrowse}>
              Request a quote
            </Btn>
          </div>
        </div>
      </div>

      {/* sectors */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(sectorLabel) as Sector[]).map((s) => {
          const count = products.filter((p) => p.sector === s && p.published).length
          return (
            <button
              key={s}
              onClick={onBrowse}
              className="group rounded-xl border border-ink-700 bg-ink-850 p-4 text-left transition-colors hover:border-[var(--accent)]"
            >
              <p className="text-[15px] font-semibold text-chalk-50">{sectorLabel[s]}</p>
              <p className="tabular mt-1 text-xs text-chalk-500">{count} product lines</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--accent)]">
                Learn more
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          )
        })}
      </div>

      {/* brands */}
      <Panel>
        <PanelHead title="Brands we import" hint="Three manufacturers, factory-backed support" />
        <div className="grid gap-3 md:grid-cols-3">
          {brands.map((b) => (
            <div key={b.key} className="rounded-lg border border-ink-700 bg-ink-900 p-4">
              <div className="flex items-center justify-between">
                <span
                  className="grid size-9 place-items-center rounded-lg text-[13px] font-bold text-ink-950"
                  style={{ background: 'var(--accent)' }}
                >
                  {b.mark}
                </span>
                <span className="text-[11px] text-chalk-600">{b.origin}</span>
              </div>
              <h4 className="mt-3.5 text-[14px] font-semibold text-chalk-50">{b.name}</h4>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-chalk-500">{b.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* featured */}
      <Panel>
        <PanelHead
          title="Featured machinery"
          hint="The quote button carries the machine into the enquiry form"
          right={<Btn onClick={onBrowse}>See all</Btn>}
        />
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onQuote={() => onQuote(p)} />
          ))}
        </div>
      </Panel>

      {/* contact strip */}
      <Panel>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, label: 'Head office', value: 'Addis Ababa, Ethiopia' },
            { icon: Phone, label: 'Phone', value: '+251 11 000 0000' },
            { icon: Mail, label: 'Email', value: 'sales@ethiotractors.com' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <r.icon size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                  {r.label}
                </p>
                <p className="truncate text-[13px] font-medium text-chalk-100">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function ProductCard({ product, onQuote }: { product: Product; onQuote: () => void }) {
  return (
    <article className="flex flex-col rounded-lg border border-ink-700 bg-ink-900 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] text-chalk-600">
            {product.brand} · {product.category}
          </p>
          <h4 className="mt-0.5 text-[14px] font-semibold text-chalk-50">{product.name}</h4>
        </div>
        <Badge tone="accent">{sectorLabel[product.sector]}</Badge>
      </div>
      <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-chalk-500">{product.blurb}</p>
      <dl className="mt-3.5 space-y-1 border-t border-ink-800 pt-3">
        {product.specs.slice(0, 3).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-[12px]">
            <dt className="text-chalk-600">{k}</dt>
            <dd className="tabular text-right font-medium text-chalk-300">{v}</dd>
          </div>
        ))}
      </dl>
      <button
        onClick={onQuote}
        className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--accent)] hover:underline"
      >
        Get a quote <ArrowRight size={13} />
      </button>
    </article>
  )
}

/* =================================================================== *
 * Catalogue + quote form
 * =================================================================== */

function Catalogue({
  products,
  quoteFor,
  setQuoteFor,
  onSubmit,
}: {
  products: Product[]
  quoteFor: Product | null
  setQuoteFor: (p: Product | null) => void
  onSubmit: (e: Enquiry) => void
}) {
  const [sector, setSector] = useState<'all' | Sector>('all')
  const [q, setQ] = useState('')

  const live = products.filter((p) => p.published)
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return live.filter((p) => {
      if (sector !== 'all' && p.sector !== sector) return false
      if (!needle) return true
      return `${p.name} ${p.brand} ${p.category} ${p.tags.join(' ')}`.toLowerCase().includes(needle)
    })
  }, [live, sector, q])

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Segmented
            value={sector}
            onChange={setSector}
            size="md"
            options={[
              { value: 'all', label: 'All', count: live.length },
              ...(Object.keys(sectorLabel) as Sector[]).map((s) => ({
                value: s,
                label: sectorLabel[s],
                count: live.filter((p) => p.sector === s).length,
              })),
            ]}
          />
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-chalk-600" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search machines, e.g. plough…"
              className="pl-8"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-chalk-600">
          Showing {shown.length} of {live.length} published product lines
        </p>
      </Panel>

      {shown.length === 0 ? (
        <Empty>No machines match your search — try a different term.</Empty>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} onQuote={() => setQuoteFor(p)} />
          ))}
        </div>
      )}

      <QuoteModal product={quoteFor} onClose={() => setQuoteFor(null)} onSubmit={onSubmit} />
    </div>
  )
}

function QuoteModal({
  product,
  onClose,
  onSubmit,
}: {
  product: Product | null
  onClose: () => void
  onSubmit: (e: Enquiry) => void
}) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [touched, setTouched] = useState(false)
  const toast = useToast()

  const valid = form.name.trim() !== '' && /\S+@\S+\.\S+/.test(form.email)

  const close = () => {
    onClose()
    // Reset a beat later so the dialog does not flicker on the way out.
    setTimeout(() => {
      setSent(false)
      setTouched(false)
      setForm({ name: '', company: '', email: '', phone: '', message: '' })
    }, 200)
  }

  const submit = () => {
    setTouched(true)
    if (!valid || !product) return
    onSubmit({
      id: `EQ-${2042 + Math.floor(Math.random() * 40)}`,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      sector: product.sector,
      interest: product.name,
      message: form.message || 'Requested pricing and availability.',
      received: '2026-08-13',
      status: 'new',
      source: 'contact',
    })
    setSent(true)
    toast('Enquiry received — check the inbox screen')
  }

  return (
    <Modal
      open={!!product}
      onClose={close}
      title={sent ? 'Enquiry received' : 'Request a quote'}
      subtitle={product ? `${product.brand} · ${product.name}` : undefined}
      footer={
        sent ? (
          <Btn variant="solid" onClick={close}>
            Done
          </Btn>
        ) : (
          <>
            <Btn onClick={close}>Cancel</Btn>
            <Btn variant="solid" onClick={submit}>
              Send enquiry
            </Btn>
          </>
        )
      }
    >
      {sent ? (
        <div className="py-4 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500/12 text-emerald-400">
            <CheckCircle2 size={24} />
          </span>
          <p className="mt-4 text-[15px] font-medium text-chalk-50">
            Thank you, {form.name.split(' ')[0]}.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-chalk-500">
            Your enquiry has been recorded against{' '}
            <span className="text-chalk-300">{product?.name}</span> and appears in the staff inbox
            immediately. Open the <span className="text-chalk-300">Enquiry inbox</span> screen to see
            it arrive.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5">
            <p className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
              Product of interest
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-[var(--accent)]">{product?.name}</p>
            <p className="mt-0.5 text-[11px] text-chalk-600">
              Pre-filled from the machine you were viewing
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name *">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </Field>
            <Field label="Company / farm">
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Optional"
              />
            </Field>
            <Field label="Email *">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone">
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+251 …"
              />
            </Field>
          </div>

          <Field label="Message">
            <Textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your site, farm size or project"
            />
          </Field>

          {touched && !valid && (
            <p className="text-[12px] text-rose-400">
              A name and a valid email address are required.
            </p>
          )}
          <p className="text-[11px] text-chalk-600">
            The live form also carries a CSRF token, a honeypot field and per-connection rate
            limiting.
          </p>
        </div>
      )}
    </Modal>
  )
}

/* =================================================================== *
 * Enquiry inbox
 * =================================================================== */

const flow: Record<Enquiry['status'], Enquiry['status']> = {
  new: 'contacted',
  contacted: 'quoted',
  quoted: 'closed',
  closed: 'new',
}

function InboxScreen({
  enquiries,
  setEnquiries,
}: {
  enquiries: Enquiry[]
  setEnquiries: (fn: (prev: Enquiry[]) => Enquiry[]) => void
}) {
  const [filter, setFilter] = useState<'all' | Enquiry['status']>('all')
  const [openId, setOpenId] = useState<string | null>(enquiries[0]?.id ?? null)
  const toast = useToast()

  const shown = enquiries.filter((e) => filter === 'all' || e.status === filter)
  const selected = enquiries.find((e) => e.id === openId) ?? shown[0] ?? null

  const advance = (e: Enquiry) => {
    const next = flow[e.status]
    setEnquiries((prev) => prev.map((x) => (x.id === e.id ? { ...x, status: next } : x)))
    toast(`${e.id} marked ${next}`)
  }

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat
          label="New this week"
          value={enquiries.filter((e) => e.status === 'new').length}
          icon={<Inbox size={14} />}
        />
        <Stat label="Awaiting quote" value={enquiries.filter((e) => e.status === 'contacted').length} />
        <Stat label="Quoted" value={enquiries.filter((e) => e.status === 'quoted').length} />
        <Stat label="Total captured" value={enquiries.length} sub="Since launch" />
      </StatRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHead
            title="Enquiries"
            right={
              <Segmented
                value={filter}
                onChange={setFilter}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'new', label: 'New' },
                  { value: 'contacted', label: 'Contacted' },
                  { value: 'quoted', label: 'Quoted' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            }
          />
          {shown.length === 0 ? (
            <Empty>Nothing in this state.</Empty>
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <TH>Ref</TH>
                    <TH>From</TH>
                    <TH className="hidden md:table-cell">Interest</TH>
                    <TH>Status</TH>
                    <TH align="right">Received</TH>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((e) => (
                    <Row key={e.id} onClick={() => setOpenId(e.id)} active={e.id === selected?.id}>
                      <TD className="tabular font-mono text-[12px] text-chalk-500">{e.id}</TD>
                      <TD>
                        <p className="font-medium text-chalk-100">{e.name}</p>
                        <p className="text-[11px] text-chalk-600">{e.company || e.email}</p>
                      </TD>
                      <TD className="hidden md:table-cell text-[12px]">{e.interest}</TD>
                      <TD>
                        <Badge tone={statusTone[e.status] as Tone} dot>
                          {e.status}
                        </Badge>
                      </TD>
                      <TD align="right" className="tabular text-[12px]">
                        {shortDate(e.received)}
                      </TD>
                    </Row>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Panel>

        <Panel className="lg:col-span-2">
          {selected ? (
            <>
              <PanelHead
                title={selected.name}
                hint={selected.company || 'Individual enquiry'}
                right={
                  <Badge tone={statusTone[selected.status] as Tone} dot>
                    {selected.status}
                  </Badge>
                }
              />
              <div className="space-y-3">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
                  <p className="text-[11px] font-semibold tracking-wider text-chalk-600 uppercase">
                    Product of interest
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-[var(--accent)]">
                    {selected.interest}
                  </p>
                </div>
                <p className="text-[13px] leading-relaxed text-chalk-300">{selected.message}</p>
                <dl className="space-y-2 border-t border-ink-800 pt-3 text-[12.5px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-chalk-600">Email</dt>
                    <dd className="truncate text-chalk-200">{selected.email}</dd>
                  </div>
                  {selected.phone && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-chalk-600">Phone</dt>
                      <dd className="tabular text-chalk-200">{selected.phone}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <dt className="text-chalk-600">Sector</dt>
                    <dd className="text-chalk-200">{sectorLabel[selected.sector]}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-chalk-600">Source</dt>
                    <dd className="text-chalk-200 capitalize">{selected.source}</dd>
                  </div>
                </dl>
                <div className="flex gap-2 border-t border-ink-800 pt-3">
                  <Btn variant="solid" onClick={() => advance(selected)}>
                    Mark {flow[selected.status]}
                  </Btn>
                  <Btn>Reply by email</Btn>
                </div>
              </div>
            </>
          ) : (
            <Empty>Select an enquiry to read it.</Empty>
          )}
        </Panel>
      </div>
    </div>
  )
}

/* =================================================================== *
 * Products admin
 * =================================================================== */

function ProductsAdmin({
  products,
  setProducts,
}: {
  products: Product[]
  setProducts: (fn: (prev: Product[]) => Product[]) => void
}) {
  const [sector, setSector] = useState<'all' | Sector>('all')
  const toast = useToast()
  const shown = products.filter((p) => sector === 'all' || p.sector === sector)

  const toggle = (p: Product) => {
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, published: !x.published } : x)),
    )
    toast(`${p.name} ${p.published ? 'hidden from' : 'published to'} the public site`)
  }

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Product lines" value={products.length} icon={<Package size={14} />} />
        <Stat label="Published" value={products.filter((p) => p.published).length} />
        <Stat label="Hidden" value={products.filter((p) => !p.published).length} />
        <Stat label="Brands" value={new Set(products.map((p) => p.brand)).size} />
      </StatRow>

      <Panel>
        <PanelHead
          title="Catalogue management"
          hint="Toggling publication changes the public site immediately"
          right={
            <Segmented
              value={sector}
              onChange={setSector}
              options={[
                { value: 'all', label: 'All' },
                ...(Object.keys(sectorLabel) as Sector[]).map((s) => ({
                  value: s,
                  label: sectorLabel[s],
                })),
              ]}
            />
          }
        />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>Product</TH>
                <TH className="hidden sm:table-cell">Brand</TH>
                <TH className="hidden lg:table-cell">Sector</TH>
                <TH align="right">Quote clicks</TH>
                <TH align="center">Published</TH>
              </tr>
            </thead>
            <tbody>
              {shown.map((p) => (
                <Row key={p.id}>
                  <TD>
                    <p className="font-medium text-chalk-100">{p.name}</p>
                    <p className="text-[11px] text-chalk-600">{p.category}</p>
                  </TD>
                  <TD className="hidden sm:table-cell">{p.brand}</TD>
                  <TD className="hidden lg:table-cell">{sectorLabel[p.sector]}</TD>
                  <TD align="right" className="tabular font-medium text-chalk-100">
                    {p.quoteClicks}
                  </TD>
                  <TD align="center">
                    <button
                      onClick={() => toggle(p)}
                      title={p.published ? 'Hide from the public site' : 'Publish'}
                      className={cx(
                        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium transition-colors',
                        p.published
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'bg-ink-700 text-chalk-500 hover:text-chalk-200',
                      )}
                    >
                      {p.published ? <Eye size={13} /> : <EyeOff size={13} />}
                      {p.published ? 'Live' : 'Hidden'}
                    </button>
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
 * Insights
 * =================================================================== */

const tooltipStyle = {
  background: '#141922',
  border: '1px solid #262e3b',
  borderRadius: 10,
  fontSize: 12,
  color: '#eef2f8',
} as const

function Insights({ products, enquiries }: { products: Product[]; enquiries: Enquiry[] }) {
  const top = [...products].sort((a, b) => b.quoteClicks - a.quoteClicks).slice(0, 8)
  const totalClicks = products.reduce((s, p) => s + p.quoteClicks, 0)
  const last = trafficByWeek[trafficByWeek.length - 1]

  return (
    <div className="space-y-4">
      <StatRow>
        <Stat label="Page views (W33)" value={last.views.toLocaleString()} sub="+13% on W32" />
        <Stat label="Quote clicks (W33)" value={last.quotes} sub="+24% on W32" />
        <Stat
          label="Click-to-enquiry"
          value={`${((enquiries.length / totalClicks) * 100).toFixed(1)}%`}
          sub="Enquiries per quote click"
        />
        <Stat label="Tracked clicks" value={totalClicks.toLocaleString()} sub="All time" />
      </StatRow>

      <Panel>
        <PanelHead
          title="Traffic and intent"
          hint="Anonymous counters only — no personal data is stored by the beacon"
        />
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficByWeek} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="et-views" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                tick={{ fill: '#6b7688', fontSize: 11 }}
                axisLine={{ stroke: '#1c222d' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7688', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#et-views)"
                name="Page views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Most requested machines"
          hint="Ranked by quote-button clicks — this is what drives stock decisions"
        />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top}
              layout="vertical"
              margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fill: '#8994a6', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={tooltipStyle} />
              <Bar dataKey="quoteClicks" fill="var(--accent)" radius={[0, 4, 4, 0]} maxBarSize={18} name="Quote clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  )
}
