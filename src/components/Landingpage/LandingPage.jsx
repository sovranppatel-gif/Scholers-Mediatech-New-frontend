import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import landingbg from "../../assets/images/landing-bg.jpg";
import {
  CheckCircle2,
  Phone,
  Mail,
  Target,
  Zap,
  Lightbulb,
  Award,
  Users,
  Globe,
  TrendingUp,
  Code,
  Smartphone,
  Search,
  Palette,
  ArrowRight,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  ChevronDown,
  Star,
} from "lucide-react";
import CommunityJoinForm from "../community/CommunityJoinForm.jsx";
import { defaultLandingSettings, getLandingSettings } from "../../utils/siteSettings.js";
import { API_URL } from "../../utils/api.js";
import { FALLBACK_HERO_LEFT } from "../../data/landingFallbacks.js";
import { useAboutSection } from "../../hooks/useAboutSection.js";
import { useExpertiseSection } from "../../hooks/useExpertiseSection.js";
import { useProcessSection } from "../../hooks/useProcessSection.js";
import { useServicesSection } from "../../hooks/useServicesSection.js";
import { useCaseStudyStrip } from "../../hooks/useCaseStudyStrip.js";
import { useFaqSection } from "../../hooks/useFaqSection.js";
import { useHeroLeftSection } from "../../hooks/useHeroLeftSection.js";

/** ["Building Your Creativity-", "Connect your community"] — mobile/tablet par do lines ke liye */
function splitTaglineAtHyphen(tagline) {
  const t = tagline || "";
  const i = t.indexOf("-");
  if (i === -1) return null;
  const rest = t.slice(i + 1).trimStart();
  return [t.slice(0, i + 1), rest].filter(Boolean);
}

// ================= MAIN LAYOUT =================
export default function LandingPage() {
  const [settings, setSettings] = useState(defaultLandingSettings);
  const { aboutData, shouldRender } = useAboutSection();
  const { expertiseData, shouldRender: shouldRenderExpertise } = useExpertiseSection();
  const { processData, shouldRender: shouldRenderProcess } = useProcessSection();
  const { servicesData, shouldRender: shouldRenderServices } = useServicesSection();
  const { caseStudyData, shouldRender: shouldRenderCaseStudy } = useCaseStudyStrip();
  const { faqData, shouldRender: shouldRenderFaq } = useFaqSection();
  const { heroLeftData, shouldRender: shouldRenderHeroLeft } = useHeroLeftSection();

  useEffect(() => {
    let mounted = true;
    getLandingSettings()
      .then((data) => {
        if (mounted) setSettings(data);
      })
      .catch(() => {
        if (mounted) setSettings(defaultLandingSettings);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#091e27] text-slate-100 font-sans selection:bg-[#48f0e7]/40 selection:text-[#091e27]">
      {/* Soft gradient halo in background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,240,231,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(233,188,139,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      <Header
        settings={settings}
        visibility={{
          about: shouldRender,
          expertise: shouldRenderExpertise,
          services: shouldRenderServices,
          process: shouldRenderProcess,
          caseStudy: shouldRenderCaseStudy,
          faq: shouldRenderFaq,
        }}
      />

      {/* 1) About — top of landing */}
      {shouldRender ? <AboutSection content={aboutData} /> : null}

      {/* 2) Join community — left (hero) + right (form), same page */}
      <main
        id="join-community"
        className="relative isolate z-10 scroll-mt-24 max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-24 rounded-2xl sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute inset-0 sm:-inset-8 z-0">
          <img
            src={landingbg}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#091e27]/55" />
        </div>
        <section className="relative z-10 grid lg:grid-cols-[1.15fr_0.95fr] gap-6 sm:gap-10 lg:gap-14 items-start">
          {shouldRenderHeroLeft ? <HeroLeft content={heroLeftData} /> : null}
          <div className="relative z-10 min-w-0 w-full">
            <CommunityJoinForm source="home" />
          </div>
        </section>

        <div className="relative z-10">
          <HeroMetrics />
        </div>
      </main>

      {/* CONTENT SECTIONS */}
      {shouldRenderExpertise ? <ExpertiseSection content={expertiseData} /> : null}
      {shouldRenderProcess ? <ProcessSection content={processData} /> : null}
      {shouldRenderServices ? <ServicesSection content={servicesData} /> : null}
      {shouldRenderCaseStudy ? <CaseStudyStrip content={caseStudyData} /> : null}
      {shouldRenderFaq ? <FAQSection content={faqData} /> : null}
      <FooterSection
        settings={settings}
        visibility={{
          about: shouldRender,
          expertise: shouldRenderExpertise,
          services: shouldRenderServices,
          process: shouldRenderProcess,
          caseStudy: shouldRenderCaseStudy,
          faq: shouldRenderFaq,
        }}
      />
    </div>
  );
}

// ================= HEADER =================
function Header({ settings, visibility = {} }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    visibility.about && { label: "About", href: "#about" },
    { label: "Join community", href: "#join-community" },
    visibility.expertise && { label: "Expertise", href: "#expertise" },
    visibility.services && { label: "Services", href: "#services" },
    visibility.process && { label: "Process", href: "#process" },
  ].filter(Boolean);

  const taglineText =
    settings.tagline || "Building Your Creativity - Connect Your Community";
  const taglineLines = splitTaglineAtHyphen(taglineText);
  const taglineClass =
    "text-[9px] sm:text-[10px] md:text-[11px] text-[#e9bc8b] tracking-[0.08em] uppercase leading-tight";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#091e27]/90 backdrop-blur-xl border-b border-[#48f0e7]/20 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-b from-[#091e27]/95 via-[#091e27]/75 to-[#091e27]/0 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-16 lg:h-[4.5rem] flex items-center justify-between gap-2">
        {/* Logo + Brand */}
        <a href="#top" className="flex min-w-0 flex-1 md:flex-initial items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-[#48f0e7]/40 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
            <div className="relative bg-gradient-to-br from-[#dffcff] via-[#9af5ee] to-[#48f0e7] p-1.5 rounded-xl border border-white/60 shadow-[0_12px_45px_rgba(72,240,231,0.55)]">
              <img
                src={logo}
                alt="Scholars Mediatech"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] sm:text-xs lg:text-base font-semibold uppercase tracking-[0.04em] sm:tracking-[0.08em] lg:tracking-[0.16em] leading-tight text-white">
              {settings.companyName || "Scholars Mediatech"}
            </span>
            {taglineLines ? (
              <>
                <span
                  className={`lg:hidden flex min-w-0 flex-col gap-0.5 ${taglineClass}`}
                >
                  <span className="block">{taglineLines[0]}</span>
                  {taglineLines[1] ? (
                    <span className="block">{taglineLines[1]}</span>
                  ) : null}
                </span>
                <span
                  className={`hidden lg:block min-w-0 truncate ${taglineClass}`}
                >
                  {taglineText}
                </span>
              </>
            ) : (
              <span className={`block min-w-0 truncate ${taglineClass}`}>
                {taglineText}
              </span>
            )}
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-[10px] lg:text-[11px] font-semibold tracking-[0.08em] lg:tracking-[0.16em] uppercase text-slate-300">
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="relative hover:text-[#48f0e7] transition-colors"
              >
                <span>{item.label}</span>
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative hover:text-[#48f0e7] transition-colors"
              >
                <span>{item.label}</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-[#48f0e7] to-[#e9bc8b] transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
        </nav>

        {/* Right: Contact */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-[#48f0e7]/25 bg-[#091e27]/55 px-3 py-1.5 shadow-sm">
            <Phone size={14} className="text-[#48f0e7]" />
            <span className="text-[11px] tracking-[0.16em] uppercase text-white font-medium">
              {settings.contactPhone || "+919340065550"}
            </span>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#091e27] via-[#1e5a68] to-[#48f0e7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_35px_rgba(72,240,231,0.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(72,240,231,0.55)] transition">
            Let&apos;s Talk
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#48f0e7]/35 bg-[#091e27]/70 text-white hover:border-[#48f0e7] hover:text-[#48f0e7] transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#48f0e7]/20 bg-[#091e27]/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-3">
            {navItems.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-slate-200 hover:bg-white/10 hover:text-[#48f0e7] transition"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-slate-200 hover:bg-white/10 hover:text-[#48f0e7] transition"
                >
                  {item.label}
                </a>
              )
            )}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#48f0e7]/20 mt-2">
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#091e27] to-[#48f0e7] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Let&apos;s Talk
                <ArrowRight size={14} />
              </button>
              <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#48f0e7]/25 bg-[#091e27]/70 px-3 py-2 text-[11px] tracking-[0.16em] uppercase text-slate-100">
                <Phone size={14} className="text-[#48f0e7]" />
                {settings.contactPhone || "+919340065550"}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ================= HERO LEFT =================
const SOCIAL_PROOF_GRADIENT_FALLBACKS = [
  "h-7 w-7 rounded-full border-2 border-white bg-gradient-to-tr from-[#091e27] to-[#48f0e7]",
  "h-7 w-7 rounded-full border-2 border-white bg-gradient-to-tr from-[#48f0e7] to-[#e9bc8b]",
  "h-7 w-7 rounded-full border-2 border-white bg-gradient-to-tr from-[#091e27] to-[#e9bc8b]",
];

function resolveHeroAssetUrl(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `${API_URL}${u.startsWith("/") ? "" : "/"}${u}`;
}

function renderParagraphWithHighlight(text, phrase) {
  const t = text || "";
  const p = (phrase || "").trim();
  if (!p || !t.includes(p)) {
    return t;
  }
  const i = t.indexOf(p);
  return (
    <>
      {t.slice(0, i)}
      <strong>{p}</strong>
      {t.slice(i + p.length)}
    </>
  );
}

function HeroPrimaryCta({ label, href }) {
  const h = href || "#top";
  const isInternalAppPath = h.startsWith("/") && !h.startsWith("//");
  const className =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#091e27] via-[#1e5a68] to-[#48f0e7] px-5 py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(72,240,231,0.4)] hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(72,240,231,0.6)] transition";
  if (isInternalAppPath) {
    return (
      <Link to={h} className={className}>
        {label}
        <ArrowRight size={16} />
      </Link>
    );
  }
  return (
    <a href={h} className={className}>
      {label}
      <ArrowRight size={16} />
    </a>
  );
}

function HeroLeft({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const c = content;
  const badgeLabel = c?.badgeLabel ?? FALLBACK_HERO_LEFT.badgeLabel;
  const headlineLine1 = c?.headlineLine1 ?? FALLBACK_HERO_LEFT.headlineLine1;
  const headlineLine2 = c?.headlineLine2 ?? FALLBACK_HERO_LEFT.headlineLine2;
  const bodyParagraph1 = c?.bodyParagraph1 ?? FALLBACK_HERO_LEFT.bodyParagraph1;
  const highlightPhrase = c?.highlightPhrase ?? FALLBACK_HERO_LEFT.highlightPhrase;
  const bodyParagraph2 = c?.bodyParagraph2 ?? FALLBACK_HERO_LEFT.bodyParagraph2;
  const points =
    Array.isArray(c?.bulletPoints) && c.bulletPoints.length > 0
      ? c.bulletPoints
      : FALLBACK_HERO_LEFT.bulletPoints;
  const primaryCtaLabel = c?.primaryCtaLabel ?? FALLBACK_HERO_LEFT.primaryCtaLabel;
  const primaryCtaHref = c?.primaryCtaHref ?? FALLBACK_HERO_LEFT.primaryCtaHref;
  const secondaryCtaLabel = c?.secondaryCtaLabel ?? FALLBACK_HERO_LEFT.secondaryCtaLabel;
  const rawSecondaryPath = c?.secondaryCtaPath ?? FALLBACK_HERO_LEFT.secondaryCtaPath;
  const secondaryCtaPath =
    String(rawSecondaryPath || "").trim() === "/building-creativity"
      ? "#join-community"
      : rawSecondaryPath;
  const socialProofText = c?.socialProofText ?? FALLBACK_HERO_LEFT.socialProofText;
  const rawAvatarPaths =
    Array.isArray(c?.socialProofAvatarUrls) && c.socialProofAvatarUrls.length > 0
      ? c.socialProofAvatarUrls
      : FALLBACK_HERO_LEFT.socialProofAvatarUrls;
  const avatarSlots = [0, 1, 2].map((i) => {
    const path = String(rawAvatarPaths?.[i] || "").trim();
    return path ? resolveHeroAssetUrl(path) : null;
  });

  return (
    <div className="space-y-6 sm:space-y-7 lg:space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 shadow-sm backdrop-blur-sm">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.24em] text-white">
            {badgeLabel}
          </span>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-5">
        <h1 className="text-[1.8rem] sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          <span className="text-white">{headlineLine1}</span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#48f0e7] to-[#e9bc8b] bg-clip-text text-transparent">
            {headlineLine2}
          </span>
        </h1>

        <div className="max-w-xl space-y-4">
          <p className="text-sm sm:text-base md:text-[15px] text-slate-100 leading-relaxed">
            {renderParagraphWithHighlight(bodyParagraph1, highlightPhrase)}
          </p>
          <p className="text-sm sm:text-base md:text-[15px] text-slate-200 leading-relaxed italic border-l-2 border-[#48f0e7]/70 pl-4">
            {bodyParagraph2}
          </p>
        </div>
      </div>

      <ul className="space-y-3 sm:space-y-4">
        {points.map((text, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-100"
          >
            <span className="mt-0.5">
              <CheckCircle2
                size={18}
                className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              />
            </span>
            <span className="leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2">
        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
          <HeroPrimaryCta label={primaryCtaLabel} href={primaryCtaHref} />

          {String(secondaryCtaPath || "").startsWith("#") ? (
            <a
              href={secondaryCtaPath}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#e9bc8b]/50 bg-[#e9bc8b]/15 px-5 py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#e9bc8b] hover:bg-[#e9bc8b]/25 transition"
            >
              <Users size={16} />
              {secondaryCtaLabel}
            </a>
          ) : (
            <Link
              to={secondaryCtaPath}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#e9bc8b]/50 bg-[#e9bc8b]/15 px-5 py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#e9bc8b] hover:bg-[#e9bc8b]/25 transition"
            >
              <Users size={16} />
              {secondaryCtaLabel}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatarSlots.map((src, i) =>
              src ? (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div key={i} className={SOCIAL_PROOF_GRADIENT_FALLBACKS[i]} />
              )
            )}
          </div>
          <p className="text-[11px] text-slate-200 font-medium leading-snug max-w-full sm:max-w-[170px]">
            {socialProofText}
          </p>
        </div>
      </div>
    </div>
  );
}

// ================= HERO METRICS STRIP =================
function HeroMetrics() {
  const items = [
    { label: "Projects shipped", value: "120+" },
    { label: "Average uplift in conversions", value: "38%" },
    { label: "Client retention", value: "92%" },
    { label: "Countries served", value: "7+" },
  ];

  return (
    <section className="mt-10 lg:mt-14">
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="border-t border-slate-200 pt-3 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 sm:border-l sm:border-slate-800/80 sm:pl-4 sm:first:border-l-0 sm:first:pl-0"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                {item.label}
              </p>
              <p className="text-lg sm:text-xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= ABOUT =================
function AboutSection({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const stats = Array.isArray(content?.stats) ? content.stats : [];

  return (
    <section
      id="about"
      className="relative isolate z-10 scroll-mt-24 max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 rounded-2xl sm:rounded-3xl"
    >
      <div className="pointer-events-none absolute inset-0 sm:-inset-8 z-0">
        <img
          src={landingbg}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#091e27]/55" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-14">
          <div className="flex-1 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#48f0e7]">
              {content?.sectionLabel || "About Scholars Mediatech"}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold tracking-tight text-white">
              {content?.heading || "A product-minded partner, not just another agency."}
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-100 leading-relaxed">
              {content?.descriptionOne}
            </p>
            <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed">
              {content?.descriptionTwo}
            </p>
          </div>

          <div className="w-full md:w-[40%] space-y-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-4 sm:py-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300 mb-2">
                Studio Snapshot
              </p>
              <div className="space-y-3">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-xl bg-gradient-to-br from-[#091e27] to-[#48f0e7] flex items-center justify-center text-[11px] font-semibold text-white">
                      ●
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.value}
                      </p>
                      <p className="text-[12px] text-slate-300">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 backdrop-blur-sm px-4 py-3 flex items-start gap-3">
              <div className="mt-0.5">
                <Zap size={18} className="text-emerald-400" />
              </div>
              <p className="text-[12px] text-emerald-100 leading-relaxed">
                {content?.ctaText || "Priority slots available for"}{" "}
                <span className="font-semibold text-emerald-300">
                  {content?.ctaHighlightText || "Q2 2026 product launches"}
                </span>
                . Reach out early to reserve your timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= EXPERTISE GRID =================
function ExpertiseSection({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const iconMap = {
    Code,
    Palette,
    TrendingUp,
    Smartphone,
    Target,
    Lightbulb,
    Users,
    Globe,
  };
  const items = Array.isArray(content?.items) ? content.items : [];

  return (
    <section
      id="expertise"
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#48f0e7] mb-2">
              {content?.sectionLabel || "What we are good at"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              {content?.heading || "Product, design & growth under one roof."}
            </h2>
          </div>
          <p className="max-w-xl text-[13px] sm:text-sm text-slate-600 leading-relaxed">
            {content?.description || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {items.map((item) => {
            const Icon = iconMap[item.iconKey] || Code;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-[#48f0e7]/50 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,23,42,0.12)] transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#091e27] via-[#1e5a68] to-[#48f0e7] flex items-center justify-center text-white shadow-[0_12px_35px_rgba(72,240,231,0.45)] group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= PROCESS =================
function ProcessSection({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const steps = Array.isArray(content?.steps) ? content.steps : [];
  return (
    <section
      id="process"
      className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#48f0e7] mb-2">
              {content?.sectionLabel || "How we work"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              {content?.heading || "A calm, transparent delivery process."}
            </h2>
          </div>
          <p className="max-w-xl text-[13px] sm:text-sm text-slate-600 leading-relaxed">
            {content?.description || ""}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.label}
              className="group rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-4 sm:py-5 hover:border-[#48f0e7]/50 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,23,42,0.12)] transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  {step.label}
                </span>
                <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-[#091e27] to-[#48f0e7] group-hover:w-16 transition-all" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1.5">
                {step.title}
              </h3>
              <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= SERVICES =================
function ServicesSection({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const iconMap = {
    Code,
    Palette,
    TrendingUp,
    Smartphone,
    Target,
    Lightbulb,
    Users,
    Globe,
  };
  const services = Array.isArray(content?.items) ? content.items : [];
  const ctaLabel = content?.ctaLabel || "Explore this service";

  return (
    <section
      id="services"
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
            <span>{content?.sectionBadgeLabel || "Services"}</span>
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {content?.heading || "Everything you need to go from idea to impact."}
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
            {content?.description || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconKey] || Code;
            const features = Array.isArray(service.features) ? service.features : [];
            return (
            <div
              key={`${service.title}-${index}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#48f0e7]/50 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,23,42,0.12)] transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#091e27] via-[#1e5a68] to-[#48f0e7] flex items-center justify-center text-white shadow-[0_12px_35px_rgba(72,240,231,0.45)] group-hover:scale-105 transition-transform">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed mb-3">
                {service.desc}
              </p>

              <ul className="flex-1 space-y-1.5 mb-4">
                {features.map((feature, fi) => (
                  <li
                    key={`${feature}-${fi}`}
                    className="flex items-start gap-2 text-[12px] sm:text-[13px] text-slate-700"
                  >
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#48f0e7]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#091e27] hover:text-[#1e5a68]">
                {ctaLabel}
                <ArrowRight size={14} />
              </button>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= CASE STUDY STRIP =================
const CASE_STUDY_VALUE_CLASSES = [
  "text-sm sm:text-base font-semibold text-emerald-300",
  "text-sm sm:text-base font-semibold text-[#1e5a68]",
  "text-sm sm:text-base font-semibold text-[#48f0e7]",
];

function CaseStudyStrip({ content }) {
  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const metrics = Array.isArray(content?.metrics) ? content.metrics : [];

  return (
    <section
      id="case-study"
      className="border-t border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-100 py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-400">
              {content?.sectionLabel || "Highlight"}
            </p>
            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-slate-900">
              {content?.heading || ""}
            </h3>
            <p className="mt-2 text-[13px] sm:text-sm text-slate-600 leading-relaxed">
              {content?.description || ""}
            </p>
          </div>
          <div className="w-full lg:w-[38%] rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-4 sm:py-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                {content?.snapshotLabel || "Snapshot"}
              </span>
              <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-[#e9bc8b] to-[#48f0e7]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {metrics.map((m, index) => (
                <div key={`${m.label}-${index}`}>
                  <p className={CASE_STUDY_VALUE_CLASSES[index % CASE_STUDY_VALUE_CLASSES.length]}>
                    {m.value}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= TESTIMONIALS =================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Shruti Kushwaha",
      role: "Founder",
      text: "Scholars Mediatech completely transformed our digital presence. Their product thinking + design quality is on par with top global studios.",
    },
    {
      name: "Deepak Patel",
      role: "CEO, SynciMart",
      text: "From SEO to CRO and dashboarding, everything was planned and executed with clarity. We saw a noticeable impact on leads in the first quarter.",
    },
    {
      name: "Usha Singh",
      role: "Director,Quntom Boot  ",
      text: "The team delivered a robust mobile app and admin panel ahead of schedule. Clean code, strong UX and zero deployment drama.",
    },
  ];

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#48f0e7] mb-2">
            Client words
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Teams that ship with us, stay with us.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="relative rounded-2xl border border-slate-200 bg-white p-5 flex flex-col hover:-translate-y-1.5 hover:border-[#48f0e7]/50 hover:shadow-[0_22px_40px_rgba(15,23,42,0.12)] transition"
            >
              <div className="absolute -top-3 left-5 flex gap-0.5 text-amber-300">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                “{t.text}”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-[12px] text-slate-500">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FAQ =================
function FAQSection({ content }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (
    !content ||
    content.isVisible === false ||
    String(content.publishStatus || "").toLowerCase() !== "published"
  ) {
    return null;
  }

  const faqs = Array.isArray(content?.items) ? content.items : [];

  return (
    <section id="faq" className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#48f0e7] mb-2">
            {content?.sectionLabel || "Questions"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {content?.heading || "A few things teams often ask us."}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const q = faq.question || "";
            const a = faq.answer || "";
            return (
              <div
                key={`${q}-${i}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 text-left"
                >
                  <span className="text-sm sm:text-[15px] font-medium text-slate-900">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#48f0e7]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-4 sm:px-5 pb-3 sm:pb-4">
                    <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= FOOTER =================
function FooterSection({ settings, visibility = {} }) {
  const socialIcons = [
    { Icon: Facebook, href: settings.socialLinks?.facebook || "#", label: "Facebook" },
    { Icon: Instagram, href: settings.socialLinks?.instagram || "#", label: "Instagram" },
    { Icon: Linkedin, href: settings.socialLinks?.linkedin || "#", label: "LinkedIn" },
    { Icon: Twitter, href: settings.socialLinks?.twitter || "#", label: "Twitter" },
    { Icon: Youtube, href: settings.socialLinks?.youtube || "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-black py-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#091e27] to-[#48f0e7] p-1.5 rounded-xl">
                <img
                  src={logo}
                  alt="Scholars Mediatech"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white uppercase tracking-[0.12em] sm:tracking-[0.18em]">
                  {settings.companyName || "Scholars Mediatech"}
                </p>
                <p className="hidden sm:block text-[11px] text-slate-400 tracking-[0.22em] uppercase">
                  {settings.tagline || "Building Your Creativity - Connect Your Community"}
                </p>
              </div>
            </div>
            <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed max-w-md">
              We help ambitious teams design, build and grow digital products and
              experiences that feel premium, modern and conversion‑focused.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="inline-flex items-center gap-2">
                <Phone size={13} className="text-[#48f0e7]" />
                {settings.contactPhone || "+919340065550"}
              </p>
              <p className="inline-flex items-center gap-2 pl-1">
                <Mail size={13} className="text-[#48f0e7]" />
                {settings.contactEmail || "scholarsmediatech@gmail.com"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {socialIcons.map(({ Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-[#48f0e7] hover:text-[#48f0e7] transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Navigation
            </p>
            <ul className="space-y-1.5 text-[13px] sm:text-sm text-slate-300">
              {visibility.about ? (
                <li>
                  <a href="#about" className="hover:text-[#48f0e7] transition">
                    About
                  </a>
                </li>
              ) : null}
              <li>
                <a href="#join-community" className="hover:text-[#48f0e7] transition">
                  Join community
                </a>
              </li>
              {visibility.expertise ? (
                <li>
                  <a href="#expertise" className="hover:text-[#48f0e7] transition">
                    Expertise
                  </a>
                </li>
              ) : null}
              {visibility.services ? (
                <li>
                  <a href="#services" className="hover:text-[#48f0e7] transition">
                    Services
                  </a>
                </li>
              ) : null}
              {visibility.process ? (
                <li>
                  <a href="#process" className="hover:text-[#48f0e7] transition">
                    Process
                  </a>
                </li>
              ) : null}
              {visibility.caseStudy ? (
                <li>
                  <a href="#case-study" className="hover:text-[#48f0e7] transition">
                    Work
                  </a>
                </li>
              ) : null}
              {visibility.faq ? (
                <li>
                  <a href="#faq" className="hover:text-[#48f0e7] transition">
                    FAQ
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Stay in the loop
            </p>
            <p className="text-[13px] sm:text-sm text-slate-300">
              Monthly digest of product, design & growth insights. No spam.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Work email"
                  className="!h-[44px] !min-h-[44px] flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm leading-[44px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#48f0e7]/30 focus:border-[#48f0e7]"
                />
                <button
                  type="button"
                  className="!h-[44px] !min-h-[44px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#091e27] to-[#48f0e7] px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Scholars Mediatech. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a href={settings.legalLinks?.privacy || "#"} className="hover:text-[#48f0e7] transition">
              Privacy
            </a>
            <a href={settings.legalLinks?.terms || "#"} className="hover:text-[#48f0e7] transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}