import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ')

/* ------------------------------------------------------------------ *
 * Toasts — every demo mutation gives visible feedback
 * ------------------------------------------------------------------ */

type Toast = { id: number; text: string }
const ToastCtx = createContext<(text: string) => void>(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const seq = useRef(0)

  const push = useMemo(
    () => (text: string) => {
      const id = ++seq.current
      setToasts((t) => [...t, { id, text }])
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
    },
    [],
  )

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-rise rounded-lg border border-ink-600 bg-ink-800 px-4 py-2.5 text-[13px] font-medium text-chalk-100 shadow-2xl shadow-black/50"
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-[var(--accent)] align-middle" />
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */

export function Panel({
  children,
  className,
  pad = true,
}: {
  children: ReactNode
  className?: string
  pad?: boolean
}) {
  return (
    <section
      className={cx(
        'rounded-xl border border-ink-700 bg-ink-850',
        pad && 'p-4 sm:p-5',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function PanelHead({
  title,
  hint,
  right,
}: {
  title: string
  hint?: string
  right?: ReactNode
}) {
  return (
    <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-chalk-100">{title}</h3>
        {hint && <p className="mt-0.5 text-xs text-chalk-500">{hint}</p>}
      </div>
      {right}
    </header>
  )
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold tracking-tight text-chalk-50">{children}</h2>
      {hint && <p className="mt-1 text-sm text-chalk-500">{hint}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Stats
 * ------------------------------------------------------------------ */

export function Stat({
  label,
  value,
  sub,
  icon,
  tone = 'accent',
}: {
  label: string
  value: string | number
  sub?: string
  icon?: ReactNode
  tone?: 'accent' | 'plain'
}) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-850 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-wider text-chalk-500 uppercase">
          {label}
        </p>
        {icon && (
          <span
            className={cx(
              'grid size-7 shrink-0 place-items-center rounded-lg',
              tone === 'accent'
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'bg-ink-700 text-chalk-300',
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="tabular mt-2 text-[26px] leading-none font-semibold text-chalk-50">
        {value}
      </p>
      {sub && <p className="mt-1.5 text-xs text-chalk-500">{sub}</p>}
    </div>
  )
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{children}</div>
}

/* ------------------------------------------------------------------ *
 * Badges
 * ------------------------------------------------------------------ */

export type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'info' | 'accent'

const toneClass: Record<Tone, string> = {
  neutral: 'bg-ink-700 text-chalk-300 ring-ink-600',
  good: 'bg-emerald-500/12 text-emerald-300 ring-emerald-500/25',
  warn: 'bg-amber-500/12 text-amber-300 ring-amber-500/25',
  bad: 'bg-rose-500/12 text-rose-300 ring-rose-500/25',
  info: 'bg-sky-500/12 text-sky-300 ring-sky-500/25',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)] ring-[var(--accent)]/25',
}

export function Badge({
  children,
  tone = 'neutral',
  dot = false,
}: {
  children: ReactNode
  tone?: Tone
  dot?: boolean
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset whitespace-nowrap',
        toneClass[tone],
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Buttons & inputs
 * ------------------------------------------------------------------ */

type BtnProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  title?: string
}

export function Btn({
  children,
  onClick,
  variant = 'outline',
  size = 'sm',
  className,
  type = 'button',
  disabled,
  title,
}: BtnProps) {
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-45',
        size === 'sm' ? 'h-8 px-3 text-[13px]' : 'h-10 px-4 text-sm',
        variant === 'solid' &&
          'bg-[var(--accent)] text-ink-950 hover:brightness-110 active:brightness-95',
        variant === 'outline' &&
          'border border-ink-600 bg-ink-800 text-chalk-100 hover:border-ink-500 hover:bg-ink-700',
        variant === 'ghost' && 'text-chalk-300 hover:bg-ink-700 hover:text-chalk-100',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Field({
  label,
  children,
  hint,
  className,
}: {
  label: string
  children: ReactNode
  hint?: string
  className?: string
}) {
  return (
    <label className={cx('block', className)}>
      <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-chalk-500 uppercase">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-chalk-600">{hint}</span>}
    </label>
  )
}

const controlBase =
  'w-full rounded-lg border border-ink-600 bg-ink-900 px-3 text-sm text-chalk-100 placeholder:text-chalk-600 transition-colors focus:border-[var(--accent)] focus:outline-none'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(controlBase, 'h-9', props.className)} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(controlBase, 'py-2', props.className)} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(controlBase, 'h-9 cursor-pointer appearance-none pr-8', props.className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%238994a6' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ...props.style,
      }}
    />
  )
}

/* ------------------------------------------------------------------ *
 * Tabs / segmented control
 * ------------------------------------------------------------------ */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  size = 'sm',
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; count?: number }[]
  size?: 'sm' | 'md'
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg border border-ink-700 bg-ink-900 p-1">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={cx(
              'rounded-md font-medium whitespace-nowrap transition-colors',
              size === 'sm' ? 'px-2.5 py-1 text-[12px]' : 'px-3 py-1.5 text-[13px]',
              active
                ? 'bg-[var(--accent)] text-ink-950'
                : 'text-chalk-500 hover:bg-ink-800 hover:text-chalk-100',
            )}
          >
            {o.label}
            {o.count !== undefined && (
              <span className={cx('tabular ml-1.5', active ? 'opacity-70' : 'text-chalk-600')}>
                {o.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Table
 * ------------------------------------------------------------------ */

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-slim -mx-4 overflow-x-auto sm:-mx-5">
      <div className="inline-block min-w-full px-4 align-middle sm:px-5">{children}</div>
    </div>
  )
}

export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full text-left text-[13px]">{children}</table>
}

export function TH({
  children,
  align = 'left',
  className,
}: {
  children?: ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}) {
  return (
    <th
      scope="col"
      className={cx(
        'border-b border-ink-700 pb-2 text-[11px] font-semibold tracking-wider text-chalk-500 uppercase',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {children}
    </th>
  )
}

export function TD({
  children,
  align = 'left',
  className,
}: {
  children?: ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}) {
  return (
    <td
      className={cx(
        'border-b border-ink-800 py-2.5 align-middle text-chalk-300',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {children}
    </td>
  )
}

export function Row({
  children,
  onClick,
  active,
}: {
  children: ReactNode
  onClick?: () => void
  active?: boolean
}) {
  return (
    <tr
      onClick={onClick}
      className={cx(
        onClick && 'cursor-pointer',
        active ? 'bg-[var(--accent-soft)]' : onClick && 'hover:bg-ink-800',
      )}
    >
      {children}
    </tr>
  )
}

/* ------------------------------------------------------------------ *
 * Progress bar
 * ------------------------------------------------------------------ */

export function Progress({
  value,
  tone,
  className,
}: {
  value: number
  tone?: string
  className?: string
}) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cx('h-1.5 w-full overflow-hidden rounded-full bg-ink-700', className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, background: tone ?? 'var(--accent)' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Drawer — right-hand detail pane used by several demos
 * ------------------------------------------------------------------ */

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 flex justify-end">
      <button
        aria-label="Close panel"
        onClick={onClose}
        className="animate-fade absolute inset-0 bg-ink-950/70 backdrop-blur-[2px]"
      />
      <aside className="scroll-slim relative flex h-full w-full max-w-[26rem] flex-col overflow-y-auto border-l border-ink-700 bg-ink-850 shadow-2xl shadow-black/60 duration-300 ease-out [animation:rise_.35s_var(--ease-out-quint)_both]">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-700 bg-ink-850/95 px-5 py-4 backdrop-blur">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-chalk-50">{title}</h3>
            {subtitle && <p className="mt-0.5 truncate text-xs text-chalk-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-chalk-500 hover:bg-ink-700 hover:text-chalk-100"
          >
            <X size={16} />
          </button>
        </header>
        <div className="flex-1 px-5 py-5">{children}</div>
        {footer && (
          <footer className="sticky bottom-0 border-t border-ink-700 bg-ink-850/95 px-5 py-3 backdrop-blur">
            {footer}
          </footer>
        )}
      </aside>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Modal — centred dialog
 * ------------------------------------------------------------------ */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  wide,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 grid place-items-center p-4">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="animate-fade absolute inset-0 bg-ink-950/75 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cx(
          'scroll-slim relative max-h-full w-full overflow-y-auto rounded-xl border border-ink-700 bg-ink-850 shadow-2xl shadow-black/60 [animation:rise_.3s_var(--ease-out-quint)_both]',
          wide ? 'max-w-3xl' : 'max-w-lg',
        )}
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-ink-700 bg-ink-850/95 px-5 py-4 backdrop-blur">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-chalk-50">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-chalk-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-chalk-500 hover:bg-ink-700 hover:text-chalk-100"
          >
            <X size={16} />
          </button>
        </header>
        <div className="px-5 py-5">{children}</div>
        {footer && (
          <footer className="sticky bottom-0 flex justify-end gap-2 border-t border-ink-700 bg-ink-850/95 px-5 py-3 backdrop-blur">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Misc
 * ------------------------------------------------------------------ */

export function KeyVal({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink-800 py-2 last:border-0">
      <dt className="text-xs text-chalk-500">{k}</dt>
      <dd className="text-right text-[13px] font-medium text-chalk-100">{v}</dd>
    </div>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-ink-600 px-4 py-10 text-center text-sm text-chalk-500">
      {children}
    </div>
  )
}

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full bg-ink-700 font-semibold text-chalk-300"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Formatting helpers shared by the demos
 * ------------------------------------------------------------------ */

export const money = (n: number, currency = 'ETB') =>
  `${currency} ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

export const money2 = (n: number, currency = 'ETB') =>
  `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const compact = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
    : n >= 1000
      ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
      : String(n)

export const shortDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const dayMonth = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
