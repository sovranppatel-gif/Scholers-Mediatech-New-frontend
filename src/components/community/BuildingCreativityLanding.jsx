import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import landingbg from "../../assets/images/landing-bg.jpg";
import CommunityJoinForm from "./CommunityJoinForm.jsx";

export default function BuildingCreativityLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#091e27] text-slate-100 font-sans selection:bg-[#48f0e7]/40 selection:text-[#091e27]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,240,231,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(233,188,139,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      <header className="border-b border-[#48f0e7]/20 bg-[#091e27]/90 backdrop-blur-xl">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative bg-gradient-to-br from-[#091e27] via-[#1e5a68] to-[#48f0e7] p-1.5 rounded-xl shadow-[0_10px_40px_rgba(72,240,231,0.35)]">
              <img src={logo} alt="Scholars Mediatech" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            </div>
            <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Scholars Mediatech
            </span>
          </Link>
          <Link
            to="/"
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-[#48f0e7] transition"
          >
            ← Home
          </Link>
        </div>
      </header>

      <main className="relative isolate z-10 max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 sm:-inset-6 z-0 rounded-3xl overflow-hidden">
          <img src={landingbg} alt="" className="h-full w-full object-cover opacity-90" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#091e27]/60" />
        </div>

        <section className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-12 items-start">
          <div className="space-y-5 sm:space-y-6 pt-2">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#48f0e7]">
              Building Your Creativity
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-white leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
              Connect Your Community
            </h1>
            <p className="text-sm sm:text-base text-slate-100/95 leading-relaxed max-w-xl">
              Join our team and help shape one connected digital and tech community. Share your details on the
              right — we read every application and respond personally.
            </p>
          </div>
          <CommunityJoinForm source="building-creativity" />
        </section>
      </main>
    </div>
  );
}
