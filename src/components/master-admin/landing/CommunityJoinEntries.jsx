import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ClipboardList,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  FileSpreadsheet,
  FileText,
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  indianStates,
  roles,
  experienceLevels,
} from '../../community/CommunityJoinForm.jsx'
import {
  getCommunityJoinSubmissions,
  createCommunityJoinSubmissionAdmin,
  updateCommunityJoinSubmission,
  deleteCommunityJoinSubmission,
} from '../../../utils/communityJoinStorage.js'

const PAGE_SIZE = 10
const POLL_MS = 10_000

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

function rowId(row) {
  return row?._id != null ? String(row._id) : row?.id != null ? String(row.id) : ''
}

function toDatetimeLocalValue(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const emptyAdminForm = () => ({
  source: 'home',
  fullName: '',
  workEmail: '',
  mobile: '',
  city: '',
  state: '',
  primaryRole: '',
  experienceLevel: '',
  whyJoin: '',
  projectIdea: '',
  agreeGuidelines: true,
  allowUpdates: false,
  submittedAt: '',
})

function rowToForm(row) {
  const allowedSources = new Set(['home', 'building-creativity', 'community-join-form'])
  return {
    source: allowedSources.has(row.source) ? row.source : 'home',
    fullName: row.fullName || '',
    workEmail: row.workEmail || '',
    mobile: row.mobile || '',
    city: row.city || '',
    state: row.state || '',
    primaryRole: row.primaryRole || '',
    experienceLevel: row.experienceLevel || '',
    whyJoin: row.whyJoin || '',
    projectIdea: row.projectIdea || '',
    agreeGuidelines: Boolean(row.agreeGuidelines),
    allowUpdates: Boolean(row.allowUpdates),
    submittedAt: toDatetimeLocalValue(row.submittedAt || row.createdAt),
  }
}

function matchesSearch(row, q) {
  if (!q.trim()) return true
  const needle = q.trim().toLowerCase()
  const blob = [
    row.fullName,
    row.workEmail,
    row.mobile,
    row.city,
    row.state,
    row.primaryRole,
    row.experienceLevel,
    row.whyJoin,
    row.projectIdea,
    row.source,
    rowId(row),
    formatWhen(row.submittedAt),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return blob.includes(needle)
}

function matchesDateRange(row, dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return true
  const raw = row.submittedAt || row.createdAt
  if (!raw) return false
  const t = new Date(raw).getTime()
  if (Number.isNaN(t)) return false
  if (dateFrom) {
    const start = new Date(`${dateFrom}T00:00:00`).getTime()
    if (t < start) return false
  }
  if (dateTo) {
    const end = new Date(`${dateTo}T23:59:59.999`).getTime()
    if (t > end) return false
  }
  return true
}

function sourceLabel(source) {
  if (source === 'building-creativity') return 'Landing page'
  if (source === 'community-join-form') return 'CommunityJoinForm link'
  return 'Home page'
}

function exportRowsForSheet(rows) {
  return rows.map((row, index) => ({
    '#': index + 1,
    'Submitted At': formatWhen(row.submittedAt),
    Source: sourceLabel(row.source),
    'Full Name': row.fullName || '',
    'Work Email': row.workEmail || '',
    Mobile: row.mobile || '',
    City: row.city || '',
    State: row.state || '',
    'Primary Role': row.primaryRole || '',
    Experience: row.experienceLevel || '',
    'Why Join': row.whyJoin || '',
    'Idea / Project': row.projectIdea || '',
    'Agreed Guidelines': row.agreeGuidelines ? 'Yes' : 'No',
    'Allow Updates': row.allowUpdates ? 'Yes' : 'No',
  }))
}

function downloadExcel(rows) {
  const data = exportRowsForSheet(rows)
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications')
  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `community-join-applications-${stamp}.xlsx`)
}

function downloadPdf(rows) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const stamp = new Date().toLocaleString()
  doc.setFontSize(14)
  doc.text('Community Join Applications', 40, 36)
  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(`Exported: ${stamp}  •  ${rows.length} entr${rows.length === 1 ? 'y' : 'ies'}`, 40, 52)
  doc.setTextColor(0)

  autoTable(doc, {
    startY: 64,
    head: [[
      '#',
      'Submitted',
      'Source',
      'Name',
      'Email',
      'Mobile',
      'City',
      'Role',
      'Experience',
    ]],
    body: rows.map((row, index) => [
      index + 1,
      formatWhen(row.submittedAt),
      sourceLabel(row.source),
      row.fullName || '—',
      row.workEmail || '—',
      row.mobile || '—',
      row.city || '—',
      row.primaryRole || '—',
      row.experienceLevel || '—',
    ]),
    styles: { fontSize: 8, cellPadding: 4, overflow: 'linebreak' },
    headStyles: { fillColor: [4, 75, 71], textColor: 255 },
    alternateRowStyles: { fillColor: [238, 247, 246] },
    margin: { left: 40, right: 40 },
  })

  const fileStamp = new Date().toISOString().slice(0, 10)
  doc.save(`community-join-applications-${fileStamp}.pdf`)
}

function buildPayloadFromForm(form) {
  const payload = {
    source: form.source,
    fullName: form.fullName.trim(),
    workEmail: form.workEmail.trim(),
    mobile: form.mobile.trim(),
    city: form.city.trim(),
    state: form.state.trim(),
    primaryRole: form.primaryRole.trim(),
    experienceLevel: form.experienceLevel.trim(),
    whyJoin: form.whyJoin.trim(),
    projectIdea: form.projectIdea.trim(),
    agreeGuidelines: Boolean(form.agreeGuidelines),
    allowUpdates: Boolean(form.allowUpdates),
  }
  if (form.submittedAt && String(form.submittedAt).trim()) {
    const d = new Date(form.submittedAt)
    if (!Number.isNaN(d.getTime())) {
      payload.submittedAt = d.toISOString()
    }
  }
  return payload
}

function EntryFormModal({ open, mode, initialForm, onClose, onSaved }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initialForm)
      setError('')
      setSaving(false)
    }
  }, [open, initialForm, mode])

  if (!open) return null

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#044b47]/25 focus:border-[#044b47]'
  const labelClass = 'mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.fullName.trim() || !form.workEmail.trim()) {
      setError('Full name and work email are required.')
      return
    }
    if (!form.agreeGuidelines) {
      setError('Agreed to guidelines must be checked to save.')
      return
    }

    const payload = buildPayloadFromForm(form)
    try {
      setSaving(true)
      if (mode === 'create') {
        await createCommunityJoinSubmissionAdmin(payload)
      } else {
        const id = String(initialForm._id || '').trim()
        if (!id) {
          setError('Missing entry id.')
          setSaving(false)
          return
        }
        await updateCommunityJoinSubmission(id, payload)
      }
      onSaved?.()
      onClose()
    } catch (err) {
      setError(err?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/50"
        onClick={() => !saving && onClose()}
      />
      <div className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-2xl flex-col rounded-t-2xl border border-[#d5e9e6] bg-white shadow-xl sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-5">
          <h3 className="text-base font-semibold text-slate-900">
            {mode === 'create' ? 'New community application' : 'Edit application'}
          </h3>
          <button
            type="button"
            disabled={saving}
            onClick={() => onClose()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
            {error ? (
              <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                {error}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Source</label>
                <select
                  className={inputClass}
                  value={form.source}
                  onChange={(e) => setField('source', e.target.value)}
                >
                  <option value="home">Home page (hero form)</option>
                  <option value="building-creativity">Building Creativity landing</option>
                  <option value="community-join-form">CommunityJoinForm link</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Full name</label>
                <input
                  className={inputClass}
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Work email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.workEmail}
                  onChange={(e) => setField('workEmail', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Mobile / WhatsApp</label>
                <input
                  className={inputClass}
                  value={form.mobile}
                  onChange={(e) => setField('mobile', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Submitted at</label>
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={form.submittedAt}
                  onChange={(e) => setField('submittedAt', e.target.value)}
                />
                <p className="mt-1 text-[11px] text-slate-400">Leave empty on new entry to use current time.</p>
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input className={inputClass} value={form.city} onChange={(e) => setField('city', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <select
                  className={inputClass}
                  value={form.state}
                  onChange={(e) => setField('state', e.target.value)}
                >
                  <option value="">Select state</option>
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Primary role</label>
                <select
                  className={inputClass}
                  value={form.primaryRole}
                  onChange={(e) => setField('primaryRole', e.target.value)}
                >
                  <option value="">Select role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Experience</label>
                <select
                  className={inputClass}
                  value={form.experienceLevel}
                  onChange={(e) => setField('experienceLevel', e.target.value)}
                >
                  <option value="">Select level</option>
                  {experienceLevels.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.agreeGuidelines}
                    onChange={(e) => setField('agreeGuidelines', e.target.checked)}
                    className="rounded border-slate-300 text-[#044b47] focus:ring-[#044b47]"
                  />
                  Agreed to community guidelines
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.allowUpdates}
                    onChange={(e) => setField('allowUpdates', e.target.checked)}
                    className="rounded border-slate-300 text-[#044b47] focus:ring-[#044b47]"
                  />
                  WhatsApp / email updates
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Why join?</label>
                <textarea
                  className={`${inputClass} min-h-[80px]`}
                  value={form.whyJoin}
                  onChange={(e) => setField('whyJoin', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Idea / project</label>
                <textarea
                  className={`${inputClass} min-h-[80px]`}
                  value={form.projectIdea}
                  onChange={(e) => setField('projectIdea', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-5">
            <button
              type="button"
              disabled={saving}
              onClick={() => onClose()}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#044b47] px-5 py-2 text-sm font-medium text-white hover:bg-[#033936] disabled:opacity-60"
            >
              {saving ? 'Saving…' : mode === 'create' ? 'Create entry' : 'Update entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CommunityJoinEntries() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdatedAt, setLastUpdatedAt] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editPayload, setEditPayload] = useState(() => ({ ...emptyAdminForm(), _id: '' }))

  const reload = useCallback(async () => {
    try {
      setError('')
      const data = await getCommunityJoinSubmissions()
      setRows(data)
      setLastUpdatedAt(new Date().toISOString())
    } catch (err) {
      setError(err?.message || 'Unable to load submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()

    const poll = () => {
      if (document.visibilityState === 'visible') reload()
    }
    const id = setInterval(poll, POLL_MS)
    document.addEventListener('visibilitychange', poll)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', poll)
    }
  }, [reload])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, dateFrom, dateTo])

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) => matchesSearch(row, searchQuery) && matchesDateRange(row, dateFrom, dateTo)
      ),
    [rows, searchQuery, dateFrom, dateTo]
  )

  const hasActiveFilters = Boolean(searchQuery.trim() || dateFrom || dateTo)

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRows.slice(start, start + PAGE_SIZE)
  }, [filteredRows, page])

  const openCreate = () => {
    setModalMode('create')
    setEditPayload({ ...emptyAdminForm(), _id: '' })
    setModalOpen(true)
  }

  const openEdit = (row) => {
    setModalMode('edit')
    setEditPayload({ ...rowToForm(row), _id: rowId(row) })
    setModalOpen(true)
  }

  const handleDelete = async (row) => {
    const id = rowId(row)
    if (!id) return
    const ok = window.confirm(
      `Delete application for “${row.fullName || row.workEmail || 'this entry'}”? This cannot be undone.`
    )
    if (!ok) return
    try {
      setLoading(true)
      await deleteCommunityJoinSubmission(id)
      await reload()
    } catch (err) {
      setError(err?.message || 'Delete failed')
      setLoading(false)
    }
  }

  const rangeLabel =
    filteredRows.length === 0
      ? '0 entries'
      : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filteredRows.length)} of ${filteredRows.length}`

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#d5e9e6] bg-white px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf6f4] text-[#044b47]">
              <ClipboardList size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">Community join applications</p>
              <p className="text-xs text-slate-500">
                Entries from the home hero form and the Building Your Creativity landing page.
              </p>
              {lastUpdatedAt ? (
                <p className="mt-1 text-[11px] text-slate-400">Last loaded: {formatWhen(lastUpdatedAt)}</p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">
            <button
              type="button"
              onClick={() => {
                setLoading(true)
                reload()
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#d5e9e6] bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-[#044b47] px-3 py-2 text-xs font-medium text-white hover:bg-[#033936]"
            >
              <Plus size={16} />
              New entry
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-end">
          <div className="relative min-w-0 flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, email, phone, city, role, notes, source…"
              className="w-full rounded-xl border border-[#d5e9e6] bg-[#f8fcfb] py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#044b47] focus:outline-none focus:ring-2 focus:ring-[#044b47]/20"
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-end">
            <label className="block min-w-[9.5rem]">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                From
              </span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full rounded-xl border border-[#d5e9e6] bg-[#f8fcfb] px-3 py-2.5 text-sm text-slate-900 focus:border-[#044b47] focus:outline-none focus:ring-2 focus:ring-[#044b47]/20"
              />
            </label>
            <label className="block min-w-[9.5rem]">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                To
              </span>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full rounded-xl border border-[#d5e9e6] bg-[#f8fcfb] px-3 py-2.5 text-sm text-slate-900 focus:border-[#044b47] focus:outline-none focus:ring-2 focus:ring-[#044b47]/20"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:shrink-0">
            <button
              type="button"
              disabled={filteredRows.length === 0}
              onClick={() => downloadExcel(filteredRows)}
              className="inline-flex items-center gap-2 rounded-full border border-[#d5e9e6] bg-white px-3 py-2.5 text-xs font-medium text-[#044b47] hover:bg-[#eef7f6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileSpreadsheet size={15} />
              Export to Excel
            </button>
            <button
              type="button"
              disabled={filteredRows.length === 0}
              onClick={() => downloadPdf(filteredRows)}
              className="inline-flex items-center gap-2 rounded-full border border-[#d5e9e6] bg-white px-3 py-2.5 text-xs font-medium text-[#044b47] hover:bg-[#eef7f6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileText size={15} />
              Export to PDF
            </button>
            <button
              type="button"
              disabled={!hasActiveFilters}
              onClick={() => {
                setSearchQuery('')
                setDateFrom('')
                setDateTo('')
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={15} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <article className="rounded-2xl border border-dashed border-[#c5ddd9] bg-white/80 p-8 text-center text-sm text-slate-600">
          Loading submissions...
        </article>
      ) : error ? (
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-sm text-amber-900">
          {error}
        </article>
      ) : filteredRows.length === 0 ? (
        <article className="rounded-2xl border border-dashed border-[#c5ddd9] bg-white/80 p-8 text-center text-sm text-slate-600">
          {rows.length === 0
            ? 'No submissions yet. Use New entry or wait for public form submissions.'
            : 'No entries match your search or date range. Try different filters.'}
        </article>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedRows.map((row) => (
              <article
                key={rowId(row)}
                className="rounded-2xl border border-[#d5e9e6] bg-white p-4 sm:p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-slate-900">{row.fullName || '—'}</p>
                    <p className="text-sm text-[#044b47]">{row.workEmail || '—'}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <div className="text-right text-xs text-slate-500 sm:mr-2">
                      <p>{formatWhen(row.submittedAt)}</p>
                      <p className="mt-1">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                          {sourceLabel(row.source)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#d5e9e6] bg-white px-3 py-1.5 text-xs font-medium text-[#044b47] hover:bg-[#eef7f6]"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(row)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ['Mobile / WhatsApp', row.mobile],
                    ['City', row.city],
                    ['State', row.state],
                    ['Primary role', row.primaryRole],
                    ['Experience', row.experienceLevel],
                    ['Agreed to guidelines', row.agreeGuidelines ? 'Yes' : 'No'],
                    ['WhatsApp/Email updates', row.allowUpdates ? 'Yes' : 'No'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                      <dd className="mt-0.5 text-slate-800">{value || '—'}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Why join?</p>
                    <p className="mt-1 text-sm whitespace-pre-wrap text-slate-700">{row.whyJoin || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Idea / project</p>
                    <p className="mt-1 text-sm whitespace-pre-wrap text-slate-700">{row.projectIdea || '—'}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-[#d5e9e6] bg-white px-4 py-3 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{rangeLabel}</span>
              {hasActiveFilters ? (
                <span className="text-slate-500"> (filtered from {rows.length} total)</span>
              ) : null}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-full border border-[#d5e9e6] bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="px-2 text-sm text-slate-600">
                Page <span className="font-semibold text-slate-900">{page}</span> of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-full border border-[#d5e9e6] bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      <EntryFormModal
        key={modalOpen ? `${modalMode}-${editPayload._id || 'new'}` : 'closed'}
        open={modalOpen}
        mode={modalMode}
        initialForm={editPayload}
        onClose={() => setModalOpen(false)}
        onSaved={reload}
      />
    </section>
  )
}
