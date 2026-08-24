import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import landingbg from "../../assets/images/landing-bg.jpg";
import CommunityJoinForm from "./CommunityJoinForm.jsx";

/**
 * Standalone shareable form — premium Google Forms–style link.
 * Route: /CommunityJoinForm
 */
export default function CommunityJoinFormPage() {
  return (
    <div className="cjf-page relative min-h-screen overflow-x-hidden text-slate-100 selection:bg-[#48f0e7]/35 selection:text-[#091e27]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

        .cjf-page {
          --cjf-display: "Cormorant Garamond", Georgia, "Times New Roman", serif;
          --cjf-ui: "Outfit", system-ui, sans-serif;
          font-family: var(--cjf-ui);
          background: #06141a;
        }
        .cjf-page .cjf-display {
          font-family: var(--cjf-display);
        }
        @keyframes cjf-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate3d(2%, -3%, 0) scale(1.06); opacity: 0.85; }
        }
        @keyframes cjf-line {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .cjf-glow {
          animation: cjf-drift 14s ease-in-out infinite;
        }
        .cjf-rule {
          transform-origin: left center;
          animation: cjf-line 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }
      `}</style>

      {/* Full-bleed atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={landingbg}
          alt=""
          className="h-full w-full object-cover scale-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#06141a]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(72,240,231,0.18),transparent_50%),radial-gradient(ellipse_at_90%_100%,rgba(233,188,139,0.2),transparent_45%)]" />
        <div className="cjf-glow absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#48f0e7]/20 blur-[100px]" />
        <div className="cjf-glow absolute bottom-0 right-1/5 h-80 w-80 rounded-full bg-[#e9bc8b]/18 blur-[110px]" style={{ animationDelay: "-6s" }} />
      </div>

      <header className="relative z-20">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-[#0a2430] via-[#1a5c68] to-[#48f0e7] p-[2px] shadow-[0_12px_40px_rgba(72,240,231,0.28)]">
              <div className="rounded-[14px] bg-[#06141a]/80 p-1.5 backdrop-blur-md">
                <img src={logo} alt="Scholars Mediatech" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
              </div>
            </div>
            <div className="leading-tight">
              <p className="cjf-display text-lg sm:text-xl font-semibold tracking-wide text-white">
                Scholars Mediatech
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#e9bc8b]/80 font-medium">
                Private Limited
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pb-16 sm:pb-24 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 text-center"
        >
          <p className="mb-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.32em] text-[#48f0e7]">
            Building your creativity
          </p>
          <h1 className="cjf-display text-[2.35rem] sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.08] tracking-tight text-white">
            Connect Your Community
          </h1>
          <div className="cjf-rule mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#e9bc8b] to-transparent" />
          <p className="mx-auto mt-5 max-w-md text-sm sm:text-[15px] font-light leading-relaxed text-slate-300/95">
            A curated application for creators, builders, and collaborators joining our digital community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <CommunityJoinForm source="community-join-form" variant="premium" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 text-center text-[11px] tracking-wide text-slate-400/80"
        >
          Your details stay private. Our team reviews every application personally.
        </motion.p>
      </main>
    </div>
  );
}
