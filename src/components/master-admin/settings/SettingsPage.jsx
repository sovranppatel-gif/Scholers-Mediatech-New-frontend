import { useEffect, useState } from 'react'
import { Globe, Save, Phone, Mail, ShieldCheck } from 'lucide-react'
import {
  defaultLandingSettings,
  getLandingSettings,
  updateLandingSettings,
} from '../../../utils/siteSettings.js'

function toForm(settings = defaultLandingSettings) {
  return {
    companyName: settings.companyName || '',
    tagline: settings.tagline || '',
    contactPhone: settings.contactPhone || '',
    contactEmail: settings.contactEmail || '',
    facebook: settings.socialLinks?.facebook || '',
    instagram: settings.socialLinks?.instagram || '',
    linkedin: settings.socialLinks?.linkedin || '',
    twitter: settings.socialLinks?.twitter || '',
    youtube: settings.socialLinks?.youtube || '',
    privacy: settings.legalLinks?.privacy || '#',
    terms: settings.legalLinks?.terms || '#',
  }
}

export default function SettingsPage() {
  const [form, setForm] = useState(toForm(defaultLandingSettings))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getLandingSettings()
        setForm(toForm(settings))
      } catch (err) {
        setError(err?.message || 'Unable to load settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('')
    setSaving(true)
    try {
      await updateLandingSettings({
        companyName: form.companyName,
        tagline: form.tagline,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
        socialLinks: {
          facebook: form.facebook,
          instagram: form.instagram,
          linkedin: form.linkedin,
          twitter: form.twitter,
          youtube: form.youtube,
        },
        legalLinks: {
          privacy: form.privacy || '#',
          terms: form.terms || '#',
        },
      })
      setStatus('Landing settings updated successfully.')
    } catch (err) {
      setError(err?.message || 'Unable to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <article className="rounded-2xl border border-dashed border-[#c5ddd9] bg-white/80 p-8 text-center text-sm text-slate-600">
        Loading settings...
      </article>
    )
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Social Channels', '5', Globe],
          ['Contact Touchpoints', '2', Phone],
          ['Legal Pages', '2', ShieldCheck],
        ].map(([label, value, Icon]) => (
          <article key={label} className="rounded-2xl border border-[#d5e9e6] bg-white p-4">
            <Icon size={16} className="text-[#044b47]" />
            <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#d5e9e6] bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-slate-900">Landing Page Settings</h2>
        <p className="text-sm text-slate-500">
          Update footer/header phone, social links, and legal links shown on the public landing page.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-700">
            <span>Company Name</span>
            <input value={form.companyName} onChange={handleChange('companyName')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Tagline</span>
            <input value={form.tagline} onChange={handleChange('tagline')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Contact Phone</span>
            <input value={form.contactPhone} onChange={handleChange('contactPhone')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Contact Email</span>
            <input value={form.contactEmail} onChange={handleChange('contactEmail')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Facebook Link</span>
            <input value={form.facebook} onChange={handleChange('facebook')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Instagram Link</span>
            <input value={form.instagram} onChange={handleChange('instagram')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>LinkedIn Link</span>
            <input value={form.linkedin} onChange={handleChange('linkedin')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Twitter Link</span>
            <input value={form.twitter} onChange={handleChange('twitter')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>YouTube Link</span>
            <input value={form.youtube} onChange={handleChange('youtube')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Privacy Link</span>
            <input value={form.privacy} onChange={handleChange('privacy')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            <span>Terms Link</span>
            <input value={form.terms} onChange={handleChange('terms')} className="h-10 w-full rounded-lg border border-[#d5e9e6] px-3 outline-none focus:border-[#48f0e7]" />
          </label>
        </div>

        {error ? <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{error}</p> : null}
        {status ? <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{status}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#044b47] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </section>
  )
}
