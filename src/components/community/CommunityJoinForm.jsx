import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { addCommunityJoinSubmission } from "../../utils/communityJoinStorage.js";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Outside India",
];

const roles = [
  "Community Manager",
  "Content Writer",
  "Graphic Designer",
  "Video Editor",
  "Photographer",
  "Social Media Manager",
  "UI/UX Designer",
  "Web Developer",
  "App Developer",
  "Product Manager",
  "Digital Marketer",
  "Performance Marketer (Ads)",
  "SEO Specialist",
  "Data Analyst",
  "AI/ML Enthusiast",
  "Cybersecurity Enthusiast",
  "Investor / Sponsor",
  "Other",
];

const experienceLevels = [
  "Beginner (0–1 yr)",
  "Intermediate (1–3 yrs)",
  "Advanced (3–7 yrs)",
  "Expert (7+ yrs)",
];

export { indianStates, roles, experienceLevels };

const emptyForm = {
  fullName: "",
  workEmail: "",
  mobile: "",
  city: "",
  state: "",
  primaryRole: "",
  experienceLevel: "",
  whyJoin: "",
  projectIdea: "",
  agreeGuidelines: false,
  allowUpdates: false,
};

export default function CommunityJoinForm({ source = "home", variant = "default" }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const successToastTimerRef = useRef(null);
  const isPremium = variant === "premium";

  const inputBase = isPremium
    ? "w-full rounded-xl border border-[#091e27]/10 bg-[#f7fafb] px-3.5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#48f0e7]/35 focus:border-[#1e5a68]/40 transition touch-manipulation shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
    : "w-full rounded-lg border border-slate-200 bg-white px-3 py-3 sm:py-2.5 text-base sm:text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#48f0e7]/40 focus:border-[#48f0e7] transition touch-manipulation";

  const labelBase = isPremium
    ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2 block"
    : "text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.22em] text-slate-500 mb-1 flex items-center justify-between";

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  useEffect(() => {
    return () => {
      if (successToastTimerRef.current) {
        clearTimeout(successToastTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.workEmail.trim()) {
      setStatus({ type: "error", message: "Please enter your full name and work email." });
      return;
    }
    if (!form.agreeGuidelines) {
      setStatus({ type: "error", message: "Please agree to the community guidelines to continue." });
      return;
    }

    try {
      setSubmitting(true);
      await addCommunityJoinSubmission({
        source,
        ...form,
      });
      setForm(emptyForm);
      setStatus({
        type: "success",
        message: "Thank you — your application was submitted. Our team will reach out soon.",
      });
      if (successToastTimerRef.current) {
        clearTimeout(successToastTimerRef.current);
      }
      setShowSuccessToast(true);
      successToastTimerRef.current = setTimeout(() => {
        setShowSuccessToast(false);
      }, 1500);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Unable to submit right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isPremium) {
    return (
      <div className="relative z-10">
        <div
          className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#48f0e7]/50 via-[#e9bc8b]/35 to-[#091e27]/20 opacity-90 blur-2xl -z-10"
          aria-hidden
        />

        <div className="relative isolate overflow-hidden rounded-[22px] border border-white/70 bg-white/95 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl pointer-events-auto">
          <div className="h-[3px] w-full bg-gradient-to-r from-[#091e27] via-[#48f0e7] to-[#e9bc8b]" />

          <div className="relative px-5 sm:px-8 pt-7 sm:pt-8 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1e5a68]">
              Application
            </p>
            <h2
              className="mt-1.5 text-2xl sm:text-[1.75rem] font-semibold tracking-tight text-[#091e27]"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Tell us about you
            </h2>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed max-w-lg">
              Complete the form below. We read every submission and respond personally.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 px-5 sm:px-8 pb-8 pt-5 space-y-7 touch-manipulation"
          >
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span>Basic Details</span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelBase}>Full Name</label>
                  <input
                    type="text"
                    className={inputBase}
                    placeholder="Enter full name"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelBase}>Work Email</label>
                  <input
                    type="email"
                    className={inputBase}
                    placeholder="email@example.com"
                    value={form.workEmail}
                    onChange={(e) => setField("workEmail", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelBase}>Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    className={inputBase}
                    placeholder="+91 XXXXX XXXXX"
                    value={form.mobile}
                    onChange={(e) => setField("mobile", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelBase}>City</label>
                  <input
                    type="text"
                    className={inputBase}
                    placeholder="Your City"
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelBase}>State</label>
                <select
                  className={inputBase}
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value)}
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span>Role & Experience</span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelBase}>Primary Role</label>
                  <select
                    className={inputBase}
                    value={form.primaryRole}
                    onChange={(e) => setField("primaryRole", e.target.value)}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelBase}>Experience Level</label>
                  <div className="grid grid-cols-1 gap-2 pt-0.5">
                    {experienceLevels.map((level) => {
                      const active = form.experienceLevel === level;
                      return (
                        <label
                          key={level}
                          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] cursor-pointer transition touch-manipulation ${
                            active
                              ? "border-[#48f0e7]/60 bg-[#e8fbfa] text-[#091e27] shadow-[0_0_0_1px_rgba(72,240,231,0.25)]"
                              : "border-slate-200/80 bg-[#f7fafb] text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceLevel"
                            className="h-4 w-4 shrink-0 text-[#1e5a68] focus:ring-[#48f0e7]/20"
                            checked={active}
                            onChange={() => setField("experienceLevel", level)}
                          />
                          {level}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span>Your Vision</span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </h3>

              <div>
                <label className={labelBase}>Why do you want to join?</label>
                <textarea
                  rows={3}
                  className={`${inputBase} resize-none`}
                  placeholder="Tell us about your motivation..."
                  value={form.whyJoin}
                  onChange={(e) => setField("whyJoin", e.target.value)}
                />
              </div>
              <div>
                <label className={labelBase}>
                  Any specific idea/project you want to start with us?
                </label>
                <textarea
                  rows={3}
                  className={`${inputBase} resize-none`}
                  placeholder="Share your vision or project idea..."
                  value={form.projectIdea}
                  onChange={(e) => setField("projectIdea", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-5 pt-1">
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-[#f7fafb] px-4 py-4">
                <label className="flex items-start gap-3 text-[13px] text-slate-600 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#1e5a68] focus:ring-[#48f0e7]/20"
                    checked={form.agreeGuidelines}
                    onChange={(e) => setField("agreeGuidelines", e.target.checked)}
                  />
                  <span>I agree to community guidelines</span>
                </label>
                <label className="flex items-start gap-3 text-[13px] text-slate-600 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#1e5a68] focus:ring-[#48f0e7]/20"
                    checked={form.allowUpdates}
                    onChange={(e) => setField("allowUpdates", e.target.checked)}
                  />
                  <span>I allow updates on WhatsApp/Email</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#091e27] via-[#14505c] to-[#1e7a82] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_20px_50px_rgba(9,30,39,0.35)] hover:-translate-y-0.5 hover:shadow-[0_26px_60px_rgba(72,240,231,0.28)] disabled:opacity-70 disabled:hover:translate-y-0 transition duration-300"
              >
                {submitting ? "Submitting..." : "Submit Application"}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>

              {status.message && (
                <div
                  role="status"
                  className={`rounded-xl px-4 py-3 text-[13px] ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-amber-50 text-amber-900 border border-amber-200"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>

        {showSuccessToast && (
          <div className="fixed top-4 right-4 z-[70] max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-900 shadow-[0_16px_40px_rgba(16,185,129,0.28)]">
            Thank you — your application was submitted. Our team will reach out soon.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div
        className="pointer-events-none absolute -inset-0.5 bg-gradient-to-br from-[#091e27]/65 via-[#48f0e7]/30 to-[#e9bc8b]/30 opacity-80 blur-3xl -z-10"
        aria-hidden
      />

      <div className="relative isolate rounded-2xl border border-slate-200 bg-white backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.16)] overflow-hidden pointer-events-auto">
        <div
          className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-[#48f0e7]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-[#e9bc8b]/15 blur-3xl"
          aria-hidden
        />

        <div className="relative px-4 sm:px-6 py-5 sm:py-6 border-b border-slate-100 flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.26em] text-[#091e27]">
            Building Your Creativity
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Connect Your Community
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">
            Join our team and help shape one connected digital and tech community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 px-4 sm:px-6 pb-6 pt-5 space-y-5 text-xs sm:text-[13px] touch-manipulation"
        >
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b pb-1">
              Basic Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Full Name</label>
                <input
                  type="text"
                  className={inputBase}
                  placeholder="Enter full name"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelBase}>Work Email</label>
                <input
                  type="email"
                  className={inputBase}
                  placeholder="email@example.com"
                  value={form.workEmail}
                  onChange={(e) => setField("workEmail", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Mobile / WhatsApp</label>
                <input
                  type="tel"
                  className={inputBase}
                  placeholder="+91 XXXXX XXXXX"
                  value={form.mobile}
                  onChange={(e) => setField("mobile", e.target.value)}
                />
              </div>
              <div>
                <label className={labelBase}>City</label>
                <input
                  type="text"
                  className={inputBase}
                  placeholder="Your City"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>State</label>
              <select
                className={inputBase}
                value={form.state}
                onChange={(e) => setField("state", e.target.value)}
              >
                <option value="" disabled>
                  Select state
                </option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Primary Role</label>
                <select
                  className={inputBase}
                  value={form.primaryRole}
                  onChange={(e) => setField("primaryRole", e.target.value)}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelBase}>Experience Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {experienceLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 py-1.5 sm:py-0 text-[10px] sm:text-[10px] text-slate-600 cursor-pointer touch-manipulation"
                    >
                      <input
                        type="radio"
                        name="experienceLevel"
                        className="h-4 w-4 shrink-0 text-[#48f0e7] focus:ring-[#48f0e7]/20"
                        checked={form.experienceLevel === level}
                        onChange={() => setField("experienceLevel", level)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelBase}>Why do you want to join?</label>
              <textarea
                rows={2}
                className={`${inputBase} resize-none`}
                placeholder="Tell us about your motivation..."
                value={form.whyJoin}
                onChange={(e) => setField("whyJoin", e.target.value)}
              />
            </div>
            <div>
              <label className={labelBase}>
                Any specific idea/project you want to start with us?
              </label>
              <textarea
                rows={2}
                className={`${inputBase} resize-none`}
                placeholder="Share your vision or project idea..."
                value={form.projectIdea}
                onChange={(e) => setField("projectIdea", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="flex items-start gap-3 text-[11px] text-slate-600 cursor-pointer touch-manipulation py-1">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#48f0e7] focus:ring-[#48f0e7]/20"
                  checked={form.agreeGuidelines}
                  onChange={(e) => setField("agreeGuidelines", e.target.checked)}
                />
                <span>I agree to community guidelines</span>
              </label>
              <label className="flex items-start gap-3 text-[11px] text-slate-600 cursor-pointer touch-manipulation py-1">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#48f0e7] focus:ring-[#48f0e7]/20"
                  checked={form.allowUpdates}
                  onChange={(e) => setField("allowUpdates", e.target.checked)}
                />
                <span>I allow updates on WhatsApp/Email</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#091e27] via-[#1e5a68] to-[#48f0e7] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(72,240,231,0.35)] hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(72,240,231,0.55)] transition"
            >
              {submitting ? "Submitting..." : "Submit Application"}
              <ArrowRight size={16} />
            </button>
            {status.message && (
              <div
                role="status"
                className={`rounded-lg px-3 py-2 text-[11px] sm:text-xs ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                    : "bg-amber-50 text-amber-900 border border-amber-200"
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </form>
      </div>
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[70] max-w-sm rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] sm:text-xs font-medium text-emerald-900 shadow-[0_12px_35px_rgba(16,185,129,0.25)]">
          Thank you — your application was submitted. Our team will reach out soon.
        </div>
      )}
    </div>
  );
}
