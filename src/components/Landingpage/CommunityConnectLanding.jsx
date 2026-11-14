import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/hero/community-connect-hero.png";
import creatorProfileImage from "../../assets/hero/Creator Profile.png";
import photographyIcon from "../../assets/services/photography.webp";
import videoIcon from "../../assets/services/video.webp";
import websiteIcon from "../../assets/services/website.webp";
import designIcon from "../../assets/services/design.webp";
import contentIcon from "../../assets/services/content.webp";
import socialMediaIcon from "../../assets/services/socilmedia.webp";
import adsSeoIcon from "../../assets/services/adsandseo.webp";
import influencerIcon from "../../assets/services/influencer.webp";
import newsIcon from "../../assets/services/news.webp";
import beginnersIcon from "../../assets/services/begineers.webp";
import processSearchIcon from "../../assets/working-process/search.webp";
import processCompareIcon from "../../assets/working-process/compare.webp";
import processBookIcon from "../../assets/working-process/book.webp";
import processDeliveryIcon from "../../assets/working-process/delivery.webp";
import processReviewIcon from "../../assets/working-process/review.webp";
import arjunCreatorPhoto from "../../assets/featured_creator_photos/Arjun_Verma.png";
import nehaCreatorPhoto from "../../assets/featured_creator_photos/Neha_Sharma.png";
import rohitCreatorPhoto from "../../assets/featured_creator_photos/Rohit_Das.png";
import priyaCreatorPhoto from "../../assets/featured_creator_photos/Priya_Nair.png";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Camera,
  CheckCircle2,
  ChevronDown,
  Code2,
  Coins,
  Facebook,
  Globe2,
  Headset,
  Instagram,
  Layout,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  MessageSquareText,
  PenTool,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Twitter,
  UserRound,
  Users,
  Wand2,
  X,
  Youtube,
} from "lucide-react";
import { defaultLandingSettings, getLandingSettings } from "../../utils/siteSettings.js";

const serviceCategories = [
  { name: "Photography & Production", image: photographyIcon, description: "Photo shoots, event coverage, product shots, drone & more." },
  { name: "Video & Audio", image: videoIcon, description: "Video editing, production, animation, voiceover, podcast and audio services." },
  { name: "Website & App", image: websiteIcon, description: "Websites, web apps, mobile apps, e-commerce and maintenance." },
  { name: "Design & Technology", image: designIcon, description: "Graphics, UI/UX, branding, illustration, automation and tech design." },
  { name: "Content Writing", image: contentIcon, description: "Articles, blog content, translations, SEO content and more." },
  { name: "Social Media Management", image: socialMediaIcon, description: "Strategy, posting, community management and growth." },
  { name: "Ads & SEO", image: adsSeoIcon, description: "Google/Meta ads, SEO, campaign setup, performance tracking and optimization." },
  { name: "Influencers & UGC", image: influencerIcon, description: "Influencer collaborations, UGC campaigns, product reviews and brand promotions." },
  { name: "News Portals / Publishers", image: newsIcon, description: "Sponsored articles, banner ads, interviews and media coverage." },
  { name: "Beginners & Trainees", image: beginnersIcon, description: "Entry-level tasks, internships, training projects and mentorship." },
];

const popularSearches = ["Photography", "Video Editing", "Website Development", "Content Writing", "SEO"];
const stats = [
  { label: "Verified Creators & Professionals", icon: Users },
  { label: "Creative Service Categories", icon: Layout },
  { label: "Project Collaboration", icon: CheckCircle2 },
  { label: "Community Connections", icon: Star },
];
const creatorCards = [
  { title: "Photography & Cinematography", category: "Photography & Production", image: arjunCreatorPhoto },
  { title: "UI/UX Design", category: "Design & Technology", image: nehaCreatorPhoto },
  { title: "Web & App Development", category: "Website & App", image: rohitCreatorPhoto },
  { title: "Content Creation", category: "Video & Audio", image: priyaCreatorPhoto },
];
const processSteps = [
  { title: "Search", description: "Find services or creators for your requirement.", image: processSearchIcon, accent: "teal" },
  { title: "Compare", description: "Check profiles, portfolios, ratings and pricing.", image: processCompareIcon, accent: "amber" },
  { title: "Book", description: "Select a creator, share details and place an order.", image: processBookIcon, accent: "purple" },
  { title: "Get Delivery", description: "The creator works and delivers as per agreement.", image: processDeliveryIcon, accent: "blue" },
  { title: "Review", description: "Rate, review and build long-term collaboration.", image: processReviewIcon, accent: "green" },
];
const whyChoose = [
  { title: "Verified Creators", description: "Work with genuine, reviewed professionals and agencies.", icon: ShieldCheck, color: "text-[#13aaa8]", surface: "bg-[#e9fbf8]" },
  { title: "Transparent Pricing", description: "Clear, upfront pricing with no hidden charges.", icon: Coins, color: "text-[#f4a20b]", surface: "bg-[#fff8e9]" },
  { title: "Secure Payments", description: "Safe and reliable payment flow with order protection.", icon: LockKeyhole, color: "text-[#2878ed]", surface: "bg-[#edf4ff]" },
  { title: "Easy Communication", description: "Stay connected, share files and track progress in one place.", icon: MessageSquareText, color: "text-[#16aaa3]", surface: "bg-[#e9fbf8]" },
  { title: "Dedicated Support", description: "Get quick help from our support team whenever needed.", icon: Headset, color: "text-[#bd63e6]", surface: "bg-[#fbf0ff]" },
];
const testimonials = [
  { name: "Karan Mehta", role: "Business Owner", quote: "The platform made it easy to find the right creative partner for our launch campaign and we moved faster than expected.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Sonal Kapoor", role: "Content Creator", quote: "As a creative professional, Community Connect helped me reach clients who genuinely fit my expertise and work style.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" },
  { name: "Amit Roy", role: "Startup Founder", quote: "From concept to launch, the process stayed transparent and organized, which made the collaboration far smoother.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80" },
];
const faqItems = [
  { question: "What is Community Connect?", answer: "Community Connect is a marketplace by Scholars Mediatech to discover, compare and hire creators, professionals and agencies for creative and digital services." },
  { question: "How do I hire a creator or agency?", answer: "Search by skill or category, compare profiles, review examples, and contact the professional whose fit best matches your goals." },
  { question: "Is the pricing fixed or negotiable?", answer: "Pricing can vary by creator and project scope. Review the listed price and confirm deliverables and any additional costs with the creator before placing an order." },
  { question: "How do payments and refunds work?", answer: "Review the payment and refund terms shown for your order before confirming. For help with a specific payment or refund, contact the Community Connect support team." },
  { question: "Can I register as a creator?", answer: "Yes. Use the creator registration form to submit your profile and work details. Select “Become a Creator” and follow the registration steps." },
];

function Header({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const companyName = (settings.companyName || "Scholars Mediatech Pvt Ltd")
    .replace(/\s+pvt\.?\s*ltd\.?$/i, "")
    .trim();
  const companyNameParts = companyName.match(/^(.*?)(mediatech)(.*)$/i);
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Explore Creators", href: "#creators" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Community", href: "#community" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-[0_3px_14px_rgba(20,33,61,0.05)]">
      <div className="mx-auto flex min-h-[76px] max-w-[1900px] items-center justify-between gap-2 px-3 sm:min-h-[88px] sm:gap-3 sm:px-5 xl:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <img src={logo} alt="Scholars Mediatech logo" className="h-[58px] w-[68px] shrink-0 object-contain sm:h-[74px] sm:w-[94px]" />
          <div className="min-w-0">
            <div className="truncate text-[12px] font-extrabold uppercase tracking-[0.04em] text-[#101b3d] sm:text-sm xl:text-base 2xl:text-lg">
              {companyNameParts ? (
                <>
                  {companyNameParts[1]}
                  <span className="text-[#078f96]">{companyNameParts[2]}</span>
                  {companyNameParts[3]}
                </>
              ) : companyName}
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.025em] text-slate-600 sm:text-[9px] xl:text-[10px]">
              <span className="block whitespace-nowrap">Building Your Creativity</span>
              <span className="block whitespace-nowrap">Connect Your Community</span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 xl:flex 2xl:gap-5">
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <div key={item.label} className="relative">
                  <button type="button" onClick={() => setServicesOpen((prev) => !prev)} className="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-semibold text-[#101b3d] transition hover:text-[#089eaa] 2xl:text-sm">
                    {item.label}
                    <ChevronDown size={15} className={servicesOpen ? "rotate-180" : ""} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full mt-3 max-h-[70vh] w-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                      {serviceCategories.map(({ name, image }) => (
                        <button key={name} type="button" onClick={() => { setServicesOpen(false); window.dispatchEvent(new CustomEvent("community-connect-search", { detail: name })); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50">
                          <img src={image} alt="" className="h-8 w-8 object-contain" />
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-semibold transition 2xl:text-sm ${item.label === "Home" ? "bg-[#079da3] px-4 text-white hover:bg-[#07888e]" : "text-[#101b3d] hover:text-[#089eaa]"}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link to="/master-admin" className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[#079da3] px-5 text-sm font-bold text-white transition hover:bg-[#07888e] 2xl:px-7">
            Login <UserRound size={19} />
          </Link>
        </div>

        <button type="button" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 xl:hidden" aria-label="Toggle mobile menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#089eaa]">{item.label}</a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
              <Link to="/master-admin" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div>
      <div className="flex flex-col gap-2 rounded-[18px] border border-[#dbe7f6] bg-white p-2 shadow-[0_16px_40px_rgba(25,75,125,0.12)] sm:flex-row sm:items-center">
        <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl px-3 text-slate-500 sm:px-4">
          <Search size={18} className="text-[#089eaa]" />
          <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSearch()} placeholder="Search services, creators or skills (e.g. photography, web design, video editing...)" className="w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500" aria-label="Search services, creators or skills" />
        </div>
        <button type="button" onClick={onSearch} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#089eaa] px-6 text-sm font-semibold text-white transition hover:bg-[#078b96]">Search <ArrowRight size={16} /></button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-600">
        <span className="mr-1 font-semibold text-[#14213d]">Popular Searches:</span>
        {popularSearches.map((item) => (
          <button key={item} type="button" onClick={() => { setSearchTerm(item); onSearch(item); }} className="rounded-full bg-[#f0f2ff] px-3 py-1.5 text-[#14213d] transition hover:bg-[#e3e8ff] hover:text-[#089eaa]">{item}</button>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const handleServiceSearch = (event) => {
      setSearchTerm(event.detail);
      setQuery(event.detail);
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("community-connect-search", handleServiceSearch);
    return () => window.removeEventListener("community-connect-search", handleServiceSearch);
  }, []);

  const matches = useMemo(() => {
    if (!query.trim()) return serviceCategories;
    const normalized = query.trim().toLowerCase();
    return serviceCategories.filter((service) => service.name.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(115deg,#f7f6ff_0%,#f4fbff_46%,#e9f9ff_100%)] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-56 w-56 rounded-full bg-[#dceaff] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#c4f5ff] opacity-60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-5 lg:grid-cols-[1.03fr_0.97fr] lg:gap-2">
          <div className="relative z-10 py-4 lg:py-6">
            <div className="mb-5 inline-flex items-center rounded-full bg-[#e6edff] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#14213d] sm:text-xs">
              COMMUNITY CONNECT BY SCHOLARS MEDIATECH
            </div>
            <h1 className="max-w-[720px] text-[clamp(2rem,8vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#101b3d] sm:text-5xl lg:text-[2.61rem] xl:text-[2.87rem]">
              Find the Right <span className="bg-gradient-to-r from-[#099ca5] to-[#18b4b1] bg-clip-text text-transparent">Creative &amp;</span>
              <br className="hidden sm:block" /> <span className="bg-gradient-to-r from-[#2675e8] to-[#00a3d8] bg-clip-text text-transparent">Digital Experts</span> for Your Needs
            </h1>
            <p className="mt-4 max-w-[690px] text-base leading-7 text-[#26334f] sm:text-lg sm:leading-[1.55]">
              Discover, compare, and book verified creators, professionals, and agencies for photography, video, design, websites, content, marketing and more ? all in one trusted marketplace.
            </p>
            <div className="mt-6 max-w-[700px]">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={(next) => setQuery(next || searchTerm)} />
            </div>
            {query && (
              <div className="mt-3 text-sm text-slate-600" role="status">
                {matches.length
                  ? `Matching service categories: ${matches.map((service) => service.name).join(", ")}`
                  : `No matching service categories found for ?${query}?.`}
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[760px] lg:-mr-4">
            <img
              src={heroImage}
              alt="Photographers, content creators, designers, and developers working together"
              className="relative z-10 block h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-[22px] border border-white bg-white/90 py-2 shadow-[0_15px_40px_rgba(32,88,143,0.12)] backdrop-blur lg:mt-3 lg:grid-cols-4">
          {stats.map(({ label, icon: Icon }, index) => (
            <div key={label} className={`flex min-h-[76px] min-w-0 items-center gap-2 px-2.5 py-3 sm:gap-4 sm:px-5 lg:px-8 ${index > 1 ? "border-t border-slate-200 lg:border-t-0" : ""} ${index % 2 === 1 ? "border-l border-slate-200 lg:border-l" : ""} ${index > 0 && index % 2 === 0 ? "lg:border-l lg:border-slate-200" : ""}`}>
              <Icon size={28} strokeWidth={1.8} className="shrink-0 text-[#12b9b1] sm:h-[34px] sm:w-[34px]" />
              <div className="min-w-0 text-xs font-semibold leading-4 text-[#14213d] sm:text-sm sm:leading-5 lg:text-base">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[linear-gradient(115deg,#f3f5ff_0%,#f7fbff_48%,#edfbff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:py-11">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#b9efff] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#cbf8f2] opacity-70 blur-3xl" />
      <div className="relative mx-auto max-w-[1800px]">
        <div className="mb-7 text-center sm:mb-9 xl:mb-5">
          <h2 className="flex items-center justify-center gap-2 text-[clamp(1.65rem,7vw,1.875rem)] font-bold tracking-[-0.045em] text-[#101b3d] sm:gap-4 sm:text-4xl lg:text-5xl xl:text-[34px]">
            <span className="hidden h-[3px] w-12 rounded-full bg-[#078c98] sm:block" />
            Explore Our Services
            <span className="hidden h-[3px] w-12 rounded-full bg-[#078c98] sm:block" />
          </h2>
          <p className="mt-2 text-sm text-[#3d4964] sm:text-base lg:text-lg xl:mt-1 xl:text-sm">
            A wide range of creative and digital services for individuals, businesses, brands and organizations.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3">
          {serviceCategories.map(({ name, image, description }) => (
            <article key={name} className="group flex min-h-[150px] gap-3 rounded-[22px] border border-[#e1e9fa] bg-white/80 p-3.5 shadow-[0_8px_18px_rgba(37,79,141,0.09)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(37,79,141,0.14)] sm:gap-4 sm:p-4 xl:min-h-[118px] xl:gap-2.5 xl:rounded-[16px] xl:p-3 2xl:min-h-[124px]">
              <img src={image} alt="" aria-hidden="true" className="h-[58px] w-[58px] shrink-0 object-contain sm:h-[68px] sm:w-[68px] xl:h-10 xl:w-10" />
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <h3 className="text-base font-bold leading-5 tracking-tight text-[#101b3d] sm:text-lg xl:text-[13px] xl:leading-[1.2] 2xl:text-sm">{name}</h3>
                <p className="mt-1.5 text-xs leading-[1.4] text-[#35415b] sm:text-[13px] xl:mt-1 xl:text-[10px] xl:leading-[1.35] 2xl:text-[11px]">{description}</p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("community-connect-search", { detail: name }))}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-[#078b96] transition group-hover:text-[#1265b8] sm:text-sm xl:gap-1 xl:pt-1.5 xl:text-[10px] 2xl:text-[11px]"
                >
                  Explore Services <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturedCreators() {
  return (
    <section id="creators" className="relative overflow-hidden bg-[linear-gradient(115deg,#f3f5ff_0%,#fbfcff_50%,#effbff_100%)] px-4 py-14 sm:px-6 lg:px-8 lg:py-[72px]">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-72 rounded-full bg-[#c4f4ff]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-72 rounded-full bg-[#d9f7f2]/70 blur-3xl" />
      <div className="relative mx-auto max-w-[1900px]">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex flex-wrap items-center gap-x-4 text-3xl font-extrabold tracking-[-0.045em] text-[#101b3d] sm:text-4xl lg:text-5xl">
              Featured Creators
              <span className="hidden h-[3px] w-16 rounded-full bg-gradient-to-r from-[#079da3] to-[#b4f0e9] sm:inline-block" />
            </h2>
            <p className="mt-2 text-base text-[#596276] sm:text-lg">
              Explore creative professionals from the Community Connect marketplace.
            </p>
            <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
              Creator profiles are previews; ratings, reviews, and pricing will appear with verified listings.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#078b96] sm:text-base">
            Creator listings coming soon <ArrowRight size={19} />
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {creatorCards.map((creator) => (
            <article key={creator.title} className="group rounded-[28px] border border-[#e2eafa] bg-white/90 p-3 shadow-[0_12px_30px_rgba(37,79,141,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(37,79,141,0.14)] sm:p-3.5">
              <div className="flex h-full min-h-[186px] gap-3 sm:gap-4">
                <img
                  src={creator.image}
                  alt=""
                  aria-hidden="true"
                  className="h-[184px] w-[38%] shrink-0 rounded-[20px] object-cover sm:w-[42%]"
                />
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <span className="mb-2 inline-flex w-fit rounded-full bg-[#edfaff] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#078b96]">
                    Profile preview
                  </span>
                  <h3 className="text-base font-extrabold leading-5 tracking-tight text-[#101b3d] sm:text-lg">
                    {creator.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#596276] sm:text-sm">
                    Discover professionals offering {creator.category.toLowerCase()} services.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("community-connect-search", { detail: creator.category }))}
                    className="mt-auto inline-flex items-center justify-between gap-1.5 whitespace-nowrap rounded-full bg-[#d9f5f2] px-2.5 py-2 text-xs font-bold text-[#08757b] transition hover:bg-[#c4eeeb] sm:text-[11px] xl:text-xs"
                  >
                    Explore services <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const accentStyles = {
    teal: {
      card: "border-[#d9eeee]",
      icon: "bg-[#e8f8f6]",
      label: "text-[#078b8c]",
      rule: "bg-[#0a9c9b]",
    },
    amber: {
      card: "border-[#f1e7d0]",
      icon: "bg-[#fff5df]",
      label: "text-[#bd7909]",
      rule: "bg-[#e9a324]",
    },
    purple: {
      card: "border-[#e9def5]",
      icon: "bg-[#f5edff]",
      label: "text-[#8b50bf]",
      rule: "bg-[#a66bd1]",
    },
    blue: {
      card: "border-[#dce8f6]",
      icon: "bg-[#eaf3ff]",
      label: "text-[#3478bd]",
      rule: "bg-[#498bd0]",
    },
    green: {
      card: "border-[#dfedda]",
      icon: "bg-[#eff9e9]",
      label: "text-[#4d933e]",
      rule: "bg-[#68ad55]",
    },
  };

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#f7fbff] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative mx-auto max-w-[1900px]">
        <div className="mb-8 text-center lg:mb-10">
          <span className="inline-flex rounded-full border border-[#d7eeee] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#078b8c] shadow-sm">Our Working Process</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#101b3d] sm:text-3xl lg:text-4xl">How Community Connect Works</h2>
          <p className="mt-2 text-sm text-[#596276] sm:text-base">From finding the right expert to getting your work done.</p>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {processSteps.map(({ title, description, image, accent }, index) => {
            const colors = accentStyles[accent];
            return (
              <div key={title} className="relative">
                <article className={`relative flex h-full min-h-[214px] flex-col overflow-hidden rounded-[22px] border bg-white px-4 py-4 shadow-[0_10px_28px_rgba(28,66,103,0.06)] sm:min-h-[220px] sm:px-5 sm:py-5 ${colors.card}`}>
                  <span className={`absolute inset-x-0 top-0 h-1 ${colors.rule}`} />
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase tracking-[0.13em] ${colors.label}`}>Step {String(index + 1).padStart(2, "0")}</span>
                    <span className={`flex h-[54px] w-[54px] items-center justify-center rounded-2xl ${colors.icon}`}>
                      <img src={image} alt="" aria-hidden="true" className="h-11 w-11 object-contain" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-extrabold leading-tight tracking-tight text-[#101b3d] sm:text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.55] text-[#596276]">{description}</p>
                  </div>
                </article>
                {index < processSteps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                    strokeWidth={2.4}
                    className="absolute -right-[22px] top-1/2 z-10 hidden -translate-y-1/2 text-[#89a6b8] xl:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1740px]">
        <div className="mb-7 text-center sm:mb-8">
          <h2 className="flex items-center justify-center gap-3 text-2xl font-extrabold tracking-[-0.04em] text-[#101b3d] sm:text-3xl lg:text-4xl">
            <span className="hidden h-[2px] w-10 rounded-full bg-[#39b8b8] sm:block" />
            Why Choose Community Connect
            <span className="hidden h-[2px] w-10 rounded-full bg-[#39b8b8] sm:block" />
          </h2>
          <p className="mt-2 text-sm text-[#596276] sm:text-base">A trusted, creator-first marketplace by Scholars Mediatech.</p>
        </div>
        <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {whyChoose.map(({ title, description, icon: Icon, color, surface }) => (
            <article key={title} className="flex min-h-[104px] items-center gap-3 rounded-[20px] border border-[#e7edf4] bg-white px-3.5 py-4 shadow-[0_8px_20px_rgba(27,57,87,0.07)] sm:gap-3.5 sm:px-4">
              <span className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full ${surface} ${color}`}>
                <Icon size={29} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold leading-tight text-[#101b3d] sm:text-base">{title}</h3>
                <p className="mt-1.5 text-xs leading-[1.4] text-[#454e60] sm:text-[13px]">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BecomeCreator() {
  return (
    <section id="become-creator" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1740px] overflow-hidden rounded-[24px] border border-[#e1ebf5] bg-[linear-gradient(110deg,#edf0ff_0%,#f5fbff_48%,#ddfbf7_100%)] shadow-[0_16px_45px_rgba(22,67,103,0.1)] sm:rounded-[30px]">
        <div className="grid items-center lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[220px] overflow-hidden sm:min-h-[290px] lg:min-h-[300px]">
            <img src={creatorProfileImage} alt="Creator building a profile and growing their business" className="absolute inset-0 h-full w-full object-contain object-center" />
          </div>
          <div className="px-6 pb-7 pt-2 sm:px-9 sm:pb-9 lg:px-10 lg:py-8 xl:px-14">
            <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.035em] text-[#101b3d] sm:text-3xl lg:text-[34px]">Become a Creator on Community Connect</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3d485c] sm:text-base sm:leading-7">Showcase your skills, build your portfolio, get discovered by real clients and grow your business with Scholars Mediatech.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#26334a] sm:gap-x-8 sm:text-sm">
              {["Create your profile", "Showcase your work", "Get bookings & grow"].map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={18} className="shrink-0 fill-[#079da3] text-white" aria-hidden="true" />
                  {benefit}
                </span>
              ))}
            </div>
            <Link to="/CommunityJoinForm" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#079da3] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(7,157,163,0.25)] transition-colors hover:bg-[#087f89]">
              Register as a Creator <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const aboutMetrics = [
    { value: "120+", label: "Projects Delivered", icon: Users },
    { value: "38%", label: "Avg. Uplift in Conversions", icon: TrendingUp },
    { value: "92%", label: "Client Retention", icon: Layout },
    { value: "7+", label: "Countries Served", icon: Globe2 },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-12 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[#d9cbff]/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[#c4f6f1]/50 blur-3xl" />
      <div className="relative mx-auto max-w-[1740px]">
        <div className="grid items-center gap-7 lg:grid-cols-[0.72fr_1.55fr_1fr] lg:gap-8">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Scholars Mediatech" className="h-36 w-56 object-contain sm:h-40 sm:w-64 lg:h-44 lg:w-full" />
          </div>
          <div className="border-y border-[#d9e1eb] py-6 text-center sm:py-7 lg:border-y-0 lg:border-l lg:py-1 lg:pl-8 lg:text-left xl:pl-12">
            <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#0c9d9e]">About Scholars Mediatech</div>
            <h2 className="text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#101b3d] sm:text-2xl">A product-minded partner for the creative economy.</h2>
            <p className="mt-2 text-sm leading-[1.55] text-[#454e60] sm:text-[15px]">Scholars Mediatech Pvt. Ltd. is a technology-driven company building platforms, marketplaces and digital solutions that connect creators, professionals, businesses and communities. With Community Connect, we aim to make creative and digital services more accessible, transparent and impactful for everyone.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-3 lg:border-l lg:border-[#d9e1eb] lg:pl-7 xl:pl-9">
            {aboutMetrics.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex min-w-0 items-center gap-2.5">
                <Icon size={23} strokeWidth={2.2} className="shrink-0 text-[#18a9a9]" aria-hidden="true" />
                <div className="flex min-w-0 items-baseline gap-2">
                  <span className="shrink-0 text-lg font-extrabold leading-none text-[#101b3d] sm:text-xl">{value}</span>
                  <span className="min-w-0 text-[10px] font-medium leading-tight text-[#454e60] sm:text-[11px]">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonialsTrack = useRef(null);
  const scrollTestimonials = (direction) => {
    if (!testimonialsTrack.current) return;
    const cardWidth = testimonialsTrack.current.firstElementChild?.getBoundingClientRect().width ?? 0;
    testimonialsTrack.current.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <section id="community" className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1740px]">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <h2 className="text-xl font-extrabold tracking-[-0.035em] text-[#101b3d] sm:text-2xl">What Our Community Says</h2>
            <p className="mt-1 text-xs text-[#596276] sm:text-sm">Real stories from clients and creators on Community Connect.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" aria-label="Scroll testimonials left" onClick={() => scrollTestimonials(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e1eaf2] bg-white text-[#16899b] shadow-sm transition hover:bg-[#effafa]">
              <ArrowRight size={17} className="rotate-180" />
            </button>
            <button type="button" aria-label="Scroll testimonials right" onClick={() => scrollTestimonials(1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d6eeee] bg-[#e8f8f7] text-[#16899b] shadow-sm transition hover:bg-[#d9f2f0]">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <div ref={testimonialsTrack} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((person) => (
            <article key={person.name} className="flex min-h-[150px] w-full shrink-0 snap-start flex-col rounded-[20px] border border-[#e5ebf2] bg-white p-4 shadow-[0_8px_22px_rgba(25,57,90,0.07)] sm:min-h-[160px] sm:basis-[calc(50%-0.5rem)] sm:p-5 xl:basis-[calc(33.333%-0.67rem)]">
              <div className="flex items-center gap-3">
                <img src={person.image} alt={person.name} className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-extrabold leading-tight text-[#101b3d] sm:text-base">{person.name}</h3>
                  <p className="mt-0.5 text-xs text-[#596276]">{person.role}</p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5 text-[#f5a500]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={`${person.name}-${index}`} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="mt-3 text-xs leading-[1.55] text-[#30394e] sm:text-sm">“{person.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-[1740px] items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#101b3d] sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-1.5 text-sm text-[#596276] sm:text-base">Quick answers to common questions about Community Connect.</p>
          <svg viewBox="0 0 300 240" role="img" aria-label="Question and answer chat bubbles" className="mt-5 h-48 w-full max-w-[300px] sm:h-56 lg:mt-7 lg:h-60">
            <defs>
              <linearGradient id="faqQuestionGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8295ff" />
                <stop offset="100%" stopColor="#5559e8" />
              </linearGradient>
              <linearGradient id="faqAnswerGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bc77f2" />
                <stop offset="100%" stopColor="#873de1" />
              </linearGradient>
              <filter id="faqBubbleShadow" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#4f46e5" floodOpacity=".2" />
              </filter>
            </defs>
            <path d="M66 33c-4-10-2-17 1-24M88 30c2-9 7-14 12-19M221 58c5-9 11-13 18-15M244 77c7-5 14-7 21-7M38 176c-9 2-15 7-20 13M52 194c-8 5-12 11-14 18" fill="none" stroke="#22c6d0" strokeLinecap="round" strokeWidth="7" />
            <path d="M49 53a20 20 0 0 1 20-20h91a20 20 0 0 1 20 20v91a20 20 0 0 1-20 20h-35l-32 28v-28H69a20 20 0 0 1-20-20z" fill="url(#faqQuestionGradient)" filter="url(#faqBubbleShadow)" />
            <text x="114" y="126" fill="white" fontFamily="Arial, sans-serif" fontSize="83" fontWeight="800" textAnchor="middle">Q</text>
            <path d="M134 130a19 19 0 0 1 19-19h87a19 19 0 0 1 19 19v65a19 19 0 0 1-19 19h-21v24l-29-24h-37a19 19 0 0 1-19-19z" fill="url(#faqAnswerGradient)" filter="url(#faqBubbleShadow)" />
            <text x="196" y="187" fill="white" fontFamily="Arial, sans-serif" fontSize="61" fontWeight="800" textAnchor="middle">A</text>
          </svg>
        </div>
        <div className="space-y-2.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.question} className={`overflow-hidden rounded-[17px] border bg-white shadow-[0_5px_13px_rgba(27,57,87,0.07)] transition-colors ${isOpen ? "border-[#cfe6f8] bg-[#f7fbff]" : "border-[#e8edf3]"}`}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-5 sm:py-3.5">
                  <span className={`text-sm font-extrabold leading-snug sm:text-base ${isOpen ? "text-[#078b91]" : "text-[#101b3d]"}`}>{item.question}</span>
                  <ChevronDown size={19} className={`shrink-0 text-[#26344c] transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {isOpen && <p className="px-4 pb-4 text-xs leading-[1.55] text-[#454e60] sm:px-5 sm:pb-4 sm:text-sm">{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterSection({ settings }) {
  const socialLinks = [
    { label: "YouTube", href: settings.socialLinks?.youtube || defaultLandingSettings.socialLinks.youtube, icon: Youtube, color: "text-[#f32929]" },
    { label: "Instagram", href: settings.socialLinks?.instagram || defaultLandingSettings.socialLinks.instagram, icon: Instagram },
    { label: "Facebook", href: settings.socialLinks?.facebook || defaultLandingSettings.socialLinks.facebook, icon: Facebook, color: "text-[#1877f2]" },
    { label: "LinkedIn", href: settings.socialLinks?.linkedin || defaultLandingSettings.socialLinks.linkedin, icon: Linkedin },
    { label: "X", href: settings.socialLinks?.twitter || defaultLandingSettings.socialLinks.twitter, icon: Twitter, color: "text-[#111827]" },
  ];

  return (
    <footer id="contact" className="border-t border-[#e7edf3] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 pb-5 pt-9 text-[#253047] sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-[1740px]">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6 xl:grid-cols-[1.65fr_.72fr_.78fr_.95fr_.9fr_1.25fr]">
          <div className="col-span-2 border-b border-[#e1e8f0] pb-6 sm:col-span-3 lg:col-span-1 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Scholars Mediatech logo" className="h-14 w-[76px] shrink-0 object-contain" />
              <div className="min-w-0">
                <div className="text-sm font-extrabold leading-tight text-[#101b3d] sm:text-base">Scholars Mediatech Pvt Ltd</div>
                <div className="mt-1 text-[11px] leading-4 text-[#596276]">Building Your Creativity · Connect Your Community</div>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-[1.6] text-[#596276] sm:text-sm">A technology-driven company creating platforms and digital solutions for creators, businesses and communities.</p>
            <div className="mt-4 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon, color = "text-[#e044a0]" }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7edf3] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${color}`}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#101b3d]">Quick Links</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[#4c566a] sm:text-sm">
              <li><a href="#home" className="hover:text-[#078b91]">Home</a></li>
              <li><a href="#services" className="hover:text-[#078b91]">Services</a></li>
              <li><a href="#creators" className="hover:text-[#078b91]">Explore Creators</a></li>
              <li><a href="#how-it-works" className="hover:text-[#078b91]">How It Works</a></li>
              <li><a href="#about" className="hover:text-[#078b91]">About</a></li>
              <li><a href="#community" className="hover:text-[#078b91]">Community</a></li>
              <li><a href="#contact" className="hover:text-[#078b91]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#101b3d]">For Users</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[#4c566a] sm:text-sm">
              <li><a href="#creators" className="hover:text-[#078b91]">Find Creators</a></li>
              <li><a href="#services" className="hover:text-[#078b91]">Browse Services</a></li>
              <li><a href="#how-it-works" className="hover:text-[#078b91]">Place an Order</a></li>
              <li><a href="#how-it-works" className="hover:text-[#078b91]">Track Order</a></li>
              <li><a href="#community" className="hover:text-[#078b91]">Leave a Review</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#101b3d]">For Creators</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[#4c566a] sm:text-sm">
              <li><a href="#become-creator" className="hover:text-[#078b91]">Become a Creator</a></li>
              <li><a href="/CommunityJoinForm" className="hover:text-[#078b91]">Create Profile</a></li>
              <li><a href="#become-creator" className="hover:text-[#078b91]">Manage Orders</a></li>
              <li><a href="#become-creator" className="hover:text-[#078b91]">Earnings & Payouts</a></li>
              <li><a href="#faq" className="hover:text-[#078b91]">Creator Guidelines</a></li>
            </ul>
          </div>
          <div className="border-r-0 lg:border-r lg:border-[#e1e8f0] lg:pr-5">
            <h3 className="text-sm font-extrabold text-[#101b3d]">Company</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[#4c566a] sm:text-sm">
              <li><a href="#about" className="hover:text-[#078b91]">About Us</a></li>
              <li><a href="#about" className="hover:text-[#078b91]">Our Team</a></li>
              <li><a href="#contact" className="hover:text-[#078b91]">Careers</a></li>
              <li><a href="#contact" className="hover:text-[#078b91]">Press & Media</a></li>
              <li><a href={settings.legalLinks?.privacy || defaultLandingSettings.legalLinks.privacy} className="hover:text-[#078b91]">Privacy Policy</a></li>
              <li><a href={settings.legalLinks?.terms || defaultLandingSettings.legalLinks.terms} className="hover:text-[#078b91]">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-sm font-extrabold text-[#101b3d]">Stay Updated</h3>
            <p className="mt-2 text-xs leading-[1.55] text-[#596276] sm:text-sm">Get the latest updates, new services and opportunities from Scholars Mediatech.</p>
            <form onSubmit={(event) => event.preventDefault()} className="mt-3 flex items-center rounded-full border border-[#dfe7ef] bg-white p-1 shadow-sm">
              <input type="email" aria-label="Email address" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-[#253047] outline-none placeholder:text-[#8993a3] sm:text-sm" />
              <button type="submit" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#079da3] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#087f89] sm:px-4 sm:text-sm">Subscribe <ArrowRight size={14} /></button>
            </form>
            <div className="mt-4 border-t border-[#e1e8f0] pt-3 text-[10px] leading-4 text-[#727d8f] sm:text-xs">© 2025 Scholars Mediatech Pvt Ltd. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [settings, setSettings] = useState(defaultLandingSettings);
  useEffect(() => {
    let mounted = true;
    getLandingSettings().then((data) => { if (mounted) setSettings(data); }).catch(() => { if (mounted) setSettings(defaultLandingSettings); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Header settings={settings} />
      <HeroSection />
      <ServicesSection />
      <FeaturedCreators />
      <HowItWorks />
      <WhyChooseUs />
      <BecomeCreator />
      <AboutSection />
      <Testimonials />
      <FaqSection />
      <FooterSection settings={settings} />
    </div>
  );
}
