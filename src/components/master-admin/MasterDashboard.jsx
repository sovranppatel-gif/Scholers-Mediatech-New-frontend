import {
  Bell,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MonitorCog,
  Search,
  Settings,
  BadgeIndianRupee,
  Activity,
  Menu,
  ChevronLeft,
  ChevronDown,
  MessageSquare,
  CalendarDays,
  Layers,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import logo from '../../assets/logo.png'
import LoadingScreen from '../LoadingScreen.jsx'
import CommunityJoinEntries from './landing/CommunityJoinEntries.jsx'
import { getCommunityJoinSubmissions } from '../../utils/communityJoinStorage.js'
import PaymentsPage from './payments/PaymentsPage'
import ReportsPage from './reports/ReportsPage'
import SettingsPage from './settings/SettingsPage'
import AboutCmsPage from '../../pages/admin/about/AboutCmsPage.jsx'
import ExpertiseCmsPage from '../../pages/admin/expertise/ExpertiseCmsPage.jsx'
import ProcessCmsPage from '../../pages/admin/process/ProcessCmsPage.jsx'
import ServicesCmsPage from '../../pages/admin/services/ServicesCmsPage.jsx'
import CaseStudyCmsPage from '../../pages/admin/caseStudy/CaseStudyCmsPage.jsx'
import FaqCmsPage from '../../pages/admin/faq/FaqCmsPage.jsx'
import HeroLeftCmsPage from '../../pages/admin/heroLeft/HeroLeftCmsPage.jsx'
import { clearMasterAdminSession } from '../../utils/masterAdminAuth.js'

const sideMenu = [
  {
    group: 'MAIN MENU',
    items: [
      'Dashboard',
      {
        label: 'Manage Landing Page',
        children: [
          'Hero left CMS',
          'About CMS',
          'Expertise CMS',
          'Process CMS',
          'Services CMS',
          'Case study CMS',
          'FAQ CMS',
        ],
      },
      'Community applications',
    ],
  },
  { group: 'COMPLIANCE', items: ['Payments', 'Reports', 'Settings'] },
]

/** CMS sections under “Manage Landing Page” — keep submenu open when one is active */
const LANDING_CMS_SECTIONS = [
  'Hero left CMS',
  'About CMS',
  'Expertise CMS',
  'Process CMS',
  'Services CMS',
  'Case study CMS',
  'FAQ CMS',
]

const itemIcon = {
  Dashboard: LayoutDashboard,
  'Manage Landing Page': MonitorCog,
  'Hero left CMS': ClipboardList,
  'About CMS': ClipboardList,
  'Expertise CMS': ClipboardList,
  'Process CMS': ClipboardList,
  'Services CMS': ClipboardList,
  'Case study CMS': ClipboardList,
  'FAQ CMS': ClipboardList,
  'Community applications': ClipboardList,
  Payments: BadgeIndianRupee,
  Reports: Activity,
  Settings: Settings,
}

function formatShortWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return '—'
  }
}

function submissionTimestamp(row) {
  const raw = row?.submittedAt || row?.createdAt
  if (!raw) return NaN
  const t = new Date(raw).getTime()
  return Number.isFinite(t) ? t : NaN
}

const DASHBOARD_POLL_MS = 10_000

function DashboardHome({ onNavigate }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statsUpdatedAt, setStatsUpdatedAt] = useState('')

  const reload = useCallback(async () => {
    try {
      setError('')
      const data = await getCommunityJoinSubmissions()
      setRows(Array.isArray(data) ? data : [])
      setStatsUpdatedAt(new Date().toISOString())
    } catch (err) {
      setError(err?.message || 'Unable to load enquiries')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()

    const poll = () => {
      if (document.visibilityState === 'visible') reload()
    }
    const id = setInterval(poll, DASHBOARD_POLL_MS)
    document.addEventListener('visibilitychange', poll)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', poll)
    }
  }, [reload])

  const stats = useMemo(() => {
    const startToday = new Date()
    startToday.setHours(0, 0, 0, 0)
    const todayStart = startToday.getTime()
    const monthMs = 30 * 24 * 60 * 60 * 1000
    const monthCut = Date.now() - monthMs

    let today = 0
    let last30 = 0
    let fromHome = 0
    let fromBuilding = 0

    for (const row of rows) {
      const t = submissionTimestamp(row)
      if (!Number.isFinite(t)) continue
      if (t >= todayStart) today++
      if (t >= monthCut) last30++
      if (row.source === 'building-creativity') fromBuilding++
      else fromHome++
    }

    const sorted = [...rows].sort((a, b) => submissionTimestamp(b) - submissionTimestamp(a))
    const latest = sorted[0] || null

    return {
      today,
      last30Days: last30,
      total: rows.length,
      fromHome,
      fromBuilding,
      latest,
    }
  }, [rows])

  const highlights = useMemo(() => {
    const items = []
    if (stats.today > 0) {
      items.push(`${stats.today} new ${stats.today === 1 ? 'enquiry' : 'enquiries'} today — review in Community applications.`)
    } else {
      items.push('No new enquiries yet today. Hero and Building Creativity forms feed this inbox.')
    }
    items.push(
      `Last 30 days: ${stats.last30Days} total — home hero vs dedicated landing tracked separately.`,
    )
    if (stats.latest && Number.isFinite(submissionTimestamp(stats.latest))) {
      items.push(`Latest lead: ${stats.latest.fullName || '—'} · ${formatShortWhen(stats.latest.submittedAt || stats.latest.createdAt)}`)
    } else {
      items.push('Share the site link to start collecting community join applications.')
    }
    return items
  }, [stats])

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#d5e9e6] bg-gradient-to-br from-[#091e27] via-[#0d3d45] to-[#044b47] p-4 text-white shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Sparkles size={20} className="text-[#9af5ee]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug">Scholars Mediatech · Lead overview</p>
              <p className="mt-1 text-xs leading-relaxed text-white/80">
                Same community join forms as the public site: home hero (&quot;Join community&quot;) and{' '}
                <span className="font-medium text-[#9af5ee]">/building-creativity</span>. Counts use each submission&apos;s
                date.
              </p>
              {statsUpdatedAt ? (
                <p className="mt-2 text-[11px] text-white/55">Updated {formatShortWhen(statsUpdatedAt)}</p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setLoading(true)
              reload()
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-medium text-white hover:bg-white/15"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <article className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{error}</article>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquare size={16} className="text-[#044b47]" />
            Today&apos;s enquiries
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[#044b47]">
            {loading ? '—' : stats.today}
          </p>
          <p className="mt-1 text-sm text-slate-500">Calendar day (your local time)</p>
        </article>

        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarDays size={16} className="text-[#044b47]" />
            Last 30 days
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[#044b47]">
            {loading ? '—' : stats.last30Days}
          </p>
          <p className="mt-1 text-sm text-slate-500">Rolling month of submissions</p>
        </article>

        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Layers size={16} className="text-[#044b47]" />
            All-time total
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[#044b47]">
            {loading ? '—' : stats.total}
          </p>
          <p className="mt-1 text-sm text-slate-500">Every stored application</p>
        </article>

        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4">
          <p className="text-sm font-semibold text-slate-700">By source</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[#eef7f6] px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Home hero</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-[#044b47]">
                {loading ? '—' : stats.fromHome}
              </p>
            </div>
            <div className="rounded-xl bg-[#eef7f6] px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Building Creativity</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-[#044b47]">
                {loading ? '—' : stats.fromBuilding}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,320px)]">
        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-slate-900">What to do next</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-1">
            {highlights.map((item) => (
              <p key={item} className="rounded-xl bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-600">
                {item}
              </p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('Community applications')}
              className="inline-flex items-center gap-2 rounded-full bg-[#044b47] px-4 py-2 text-sm font-medium text-white hover:bg-[#033936]"
            >
              Open Community applications
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('Hero left CMS')}
              className="inline-flex items-center gap-2 rounded-full border border-[#d5e9e6] bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Hero left CMS
            </button>
          </div>
        </article>

        <article className="rounded-2xl border border-[#d5e9e6] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Recent enquiries</h2>
            {!loading && rows.length > 0 ? (
              <button
                type="button"
                onClick={() => onNavigate?.('Community applications')}
                className="text-xs font-semibold text-[#044b47] hover:underline"
              >
                View all
              </button>
            ) : null}
          </div>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
              No submissions yet. When visitors use the join form on the landing page, they appear here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {rows.slice(0, 5).map((row) => (
                <li
                  key={row.id || row._id || `${row.workEmail}-${row.submittedAt}`}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{row.fullName || '—'}</p>
                      <p className="truncate text-xs text-[#044b47]">{row.workEmail || '—'}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                      {row.source === 'building-creativity' ? 'Landing' : 'Home'}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{formatShortWhen(row.submittedAt || row.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  )
}

export default function MasterDashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [sectionLoading, setSectionLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [landingMenuOpen, setLandingMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const adminData = localStorage.getItem('__master_admin__')
      if (adminData) {
        const parsed = JSON.parse(adminData)
        setAdminEmail(parsed.email || '')
      }
    } catch {
      setAdminEmail('')
    }
  }, [])

  useEffect(() => {
    setSectionLoading(true)
    const timeout = window.setTimeout(() => setSectionLoading(false), 450)
    return () => window.clearTimeout(timeout)
  }, [activeSection])

  useEffect(() => {
    setSidebarOpen(false)
  }, [activeSection])

  useEffect(() => {
    if (LANDING_CMS_SECTIONS.includes(activeSection)) {
      setLandingMenuOpen(true)
    }
  }, [activeSection])

  const handleSignOut = () => {
    clearMasterAdminSession()
    window.location.href = '/master-admin'
  }

  const sectionHeading = useMemo(() => {
    if (activeSection === 'Dashboard') {
      return 'Enquiry pulse from your public site: today’s count, last 30 days, and quick links to CMS and applications.'
    }
    if (activeSection === 'Community applications') {
      return 'Review community join form submissions from public forms.'
    }
    if (activeSection === 'Hero left CMS') {
      return 'Control landing hero headline, body copy, bullets and CTAs on the left column.'
    }
    if (activeSection === 'About CMS') {
      return 'Control About section content, status and visibility from one place.'
    }
    if (activeSection === 'Expertise CMS') {
      return 'Control Expertise section cards, heading, status and visibility.'
    }
    if (activeSection === 'Process CMS') {
      return 'Control Process section steps, heading, status and visibility.'
    }
    if (activeSection === 'Services CMS') {
      return 'Control Services section cards, headings, status and visibility.'
    }
    if (activeSection === 'Case study CMS') {
      return 'Control case study highlight strip, metrics and visibility.'
    }
    if (activeSection === 'FAQ CMS') {
      return 'Control FAQ questions, answers and visibility.'
    }
    return `${activeSection} management with realistic demo data for ready frontend presentation.`
  }, [activeSection])

  const sectionComponentMap = {
    Dashboard: <DashboardHome />,
    'Hero left CMS': <HeroLeftCmsPage />,
    'About CMS': <AboutCmsPage />,
    'Expertise CMS': <ExpertiseCmsPage />,
    'Process CMS': <ProcessCmsPage />,
    'Services CMS': <ServicesCmsPage />,
    'Case study CMS': <CaseStudyCmsPage />,
    'FAQ CMS': <FaqCmsPage />,
    'Community applications': <CommunityJoinEntries />,
    Payments: <PaymentsPage />,
    Reports: <ReportsPage />,
    Settings: <SettingsPage />,
  }

  return (
    <section className="min-h-screen w-full bg-[#eef7f6]">
      <div className="relative grid min-h-screen w-full grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)] lg:h-screen">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
          />
        ) : null}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-full max-h-[100dvh] w-[82%] max-w-[320px] flex-col overflow-hidden border-r border-[#d2e8e5] bg-[#eaf6f4] p-4 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:w-72 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:p-5 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex shrink-0 items-center gap-2">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-[#48f0e7]/35 blur-md opacity-70" />
              <div className="relative rounded-xl bg-gradient-to-br from-[#091e27] via-[#1e5a68] to-[#48f0e7] p-1.5 shadow-[0_10px_40px_rgba(72,240,231,0.35)]">
                <img
                  src={logo}
                  alt="Scholars Mediatech"
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="truncate text-[15px] font-semibold leading-snug tracking-tight text-slate-900">
                Scholers Mediatech
              </p>
              <p className="mt-0.5 truncate text-[11px] leading-tight text-slate-500">
                Master Admin
              </p>
            </div>
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#cfe3e0] bg-white text-slate-700 lg:hidden"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="mt-5 min-h-0 flex-1 space-y-5 overflow-x-hidden overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(4,75,71,0.28)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#044b47]/22 hover:[&::-webkit-scrollbar-thumb]:bg-[#044b47]/38">
            {sideMenu.map((menu) => (
              <div key={menu.group}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {menu.group}
                </p>
                <div className="space-y-1.5">
                  {menu.items.map((item) => {
                    if (typeof item === 'string') {
                      const Icon = itemIcon[item]
                      const active = item === activeSection
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setActiveSection(item)}
                          className={`flex w-full min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                            active ? 'bg-[#044b47] text-white' : 'text-slate-700 hover:bg-white'
                          }`}
                        >
                          <Icon size={16} className="shrink-0" />
                          <span className="min-w-0 truncate">{item}</span>
                        </button>
                      )
                    }

                    const parentActive = item.children.includes(activeSection)
                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() => setLandingMenuOpen((prev) => !prev)}
                          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                            parentActive ? 'bg-[#044b47] text-white' : 'text-slate-700 hover:bg-white'
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <MonitorCog size={16} className="shrink-0" />
                            <span className="min-w-0 truncate">{item.label}</span>
                          </span>
                          <ChevronDown
                            size={14}
                            className={`shrink-0 opacity-90 transition-transform ${landingMenuOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {landingMenuOpen ? (
                          <div className="mt-1 ml-3 space-y-1">
                            {item.children.map((child) => {
                              const childActive = child === activeSection
                              return (
                                <button
                                  key={child}
                                  type="button"
                                  onClick={() => setActiveSection(child)}
                                  className={`flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                                    childActive
                                      ? 'bg-[#d9f2ef] text-[#044b47]'
                                      : 'text-slate-600 hover:bg-white'
                                  }`}
                                >
                                  <ClipboardList size={14} className="shrink-0" />
                                  <span className="min-w-0 truncate">{child}</span>
                                </button>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="min-h-screen w-full min-w-0 bg-[#f3fbfa] p-3 sm:p-4 lg:h-screen lg:overflow-y-auto lg:p-6">
          {/* Mobile / tablet top bar */}
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#d0e3e1] bg-white px-2.5 py-2 sm:px-3 lg:hidden">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d0e3e1] text-slate-700"
            >
              <Menu size={18} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{activeSection}</p>
              <p className="truncate text-[11px] text-slate-500">{adminEmail || 'master-admin'}</p>
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d0e3e1] bg-[#f8fcfb] text-slate-600"
            >
              <Bell size={16} />
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#044b47] px-2.5 text-xs font-medium text-white sm:px-3"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>

          {/* Desktop toolbar */}
          <div className="mb-4 hidden items-center justify-between gap-3 lg:flex">
            <div className="flex min-w-0 max-w-md flex-1 items-center gap-3 rounded-full border border-[#d0e3e1] bg-white px-3 py-2 text-sm text-slate-500">
              <Search size={16} className="shrink-0" />
              <span className="truncate">Search CMS sections, applications, payments…</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d0e3e1] bg-white text-slate-600"
              >
                <Bell size={16} />
              </button>
              <div
                className="max-w-[220px] truncate rounded-full border border-[#d0e3e1] bg-white px-3 py-2 text-sm text-slate-700"
                title={adminEmail || 'master-admin'}
              >
                {adminEmail || 'master-admin'}
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#044b47] px-4 py-2 text-sm font-medium text-white"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile / tablet search */}
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#d0e3e1] bg-white px-3 py-2.5 text-sm text-slate-500 lg:hidden">
            <Search size={16} className="shrink-0" />
            <span className="min-w-0 truncate">Search CMS sections, applications, payments…</span>
          </div>

          <div className="mb-4">
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl lg:text-2xl">{activeSection}</h1>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{sectionHeading}</p>
          </div>

          {sectionLoading ? (
            <LoadingScreen />
          ) : (
            sectionComponentMap[activeSection]
          )}
        </main>
      </div>
    </section>
  )
}
