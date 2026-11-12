import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/hero/community-connect-hero.png";
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
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Camera,
  CheckCircle2,
  ChevronDown,
  Code2,
  Instagram,
  Layout,
  Linkedin,
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
  { name: "Arjun Verma", title: "Photographer", location: "Mumbai, India", price: "₹5,000", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Neha Sharma", title: "UI/UX Designer", location: "Bengaluru, India", price: "₹8,000", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" },
  { name: "Rehit Das", title: "Web Developer", location: "Kolkata, India", price: "₹15,000", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80" },
  { name: "Priya Nair", title: "Content Strategist", location: "Delhi, India", price: "₹6,000", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80" },
];
const processSteps = [
  { title: "Search", description: "Explore services, portfolios, and specialists that match your goals.", icon: Search },
  { title: "Compare", description: "Review work quality, pricing, and experience before you choose.", icon: Layout },
  { title: "Book", description: "Start the project with a clear brief and milestone-based collaboration.", icon: Briefcase },
  { title: "Deliver", description: "Get polished deliverables and ongoing support when you need it.", icon: Wand2 },
];
const whyChoose = [
  { title: "Verified Experts", description: "Access trusted specialists with quality-focused profiles.", icon: ShieldCheck },
  { title: "Transparent Pricing", description: "Understand costs clearly before committing to a project.", icon: TrendingUp },
  { title: "Secure Payments", description: "Safer workflows with clear milestones and protected payments.", icon: BadgeCheck },
  { title: "Simple Communication", description: "Message teams quickly and stay aligned from day one.", icon: MessageSquareText },
  { title: "Dedicated Support", description: "Get guidance and help when your requirements evolve.", icon: Users },
];
const testimonials = [
  { name: "Karan Mehta", role: "Business Owner", quote: "The platform made it easy to find the right creative partner for our launch campaign and we moved faster than expected.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Sonal Kapoor", role: "Content Creator", quote: "As a creative professional, Community Connect helped me reach clients who genuinely fit my expertise and work style.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" },
  { name: "Amit Roy", role: "Startup Founder", quote: "From concept to launch, the process stayed transparent and organized, which made the collaboration far smoother.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80" },
];
const faqItems = [
  { question: "What is Community Connect?", answer: "Community Connect is a marketplace for discovering creative and digital experts from photography and video to design, marketing, and web development." },
  { question: "How do I hire a creator or agency?", answer: "Search by skill or category, compare profiles, review examples, and contact the professional whose fit best matches your goals." },
  { question: "How do I create or register?", answer: "Use the creator registration form from the homepage and share your work details so the team can review your profile." },
  { question: "Can I pay safely?", answer: "Yes. Transparent pricing and clear milestones are designed to keep project scopes and payments easier to manage." },
  { question: "What services are available?", answer: "The marketplace supports creative, digital, and marketing services including photography, website development, video editing, SEO, and more." },
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
      <div className="mx-auto flex min-h-[88px] max-w-[1900px] items-center justify-between gap-3 px-3 sm:px-5 xl:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <img src={logo} alt="Scholars Mediatech logo" className="h-[68px] w-[82px] shrink-0 object-contain sm:h-[74px] sm:w-[94px]" />
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

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 xl:hidden" aria-label="Toggle mobile menu" onClick={() => setMenuOpen((prev) => !prev)}>
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
            <h1 className="max-w-[720px] text-[2.4rem] font-bold leading-[1.08] tracking-[-0.045em] text-[#101b3d] sm:text-5xl lg:text-[2.61rem] xl:text-[2.87rem]">
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

        <div className="mt-5 grid overflow-hidden rounded-[22px] border border-white bg-white/90 py-2 shadow-[0_15px_40px_rgba(32,88,143,0.12)] backdrop-blur sm:grid-cols-2 lg:mt-3 lg:grid-cols-4">
          {stats.map(({ label, icon: Icon }, index) => (
            <div key={label} className={`flex min-h-[76px] items-center gap-4 px-5 py-3 sm:px-7 lg:px-8 ${index ? "border-t border-slate-200 sm:border-t-0 lg:border-l" : ""} ${index === 2 ? "sm:border-l" : ""}`}>
              <Icon size={34} strokeWidth={1.8} className="shrink-0 text-[#12b9b1]" />
              <div className="text-sm font-semibold leading-5 text-[#14213d] sm:text-base">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[linear-gradient(115deg,#f3f5ff_0%,#f7fbff_48%,#edfbff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#b9efff] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#cbf8f2] opacity-70 blur-3xl" />
      <div className="relative mx-auto max-w-[1800px]">
        <div className="mb-7 text-center sm:mb-9">
          <h2 className="flex items-center justify-center gap-4 text-3xl font-bold tracking-[-0.045em] text-[#101b3d] sm:text-4xl lg:text-5xl">
            <span className="hidden h-[3px] w-12 rounded-full bg-[#078c98] sm:block" />
            Explore Our Services
            <span className="hidden h-[3px] w-12 rounded-full bg-[#078c98] sm:block" />
          </h2>
          <p className="mt-2 text-sm text-[#3d4964] sm:text-base lg:text-lg">
            A wide range of creative and digital services for individuals, businesses, brands and organizations.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {serviceCategories.map(({ name, image, description }) => (
            <article key={name} className="group flex min-h-[150px] gap-3 rounded-[22px] border border-[#e1e9fa] bg-white/80 p-3.5 shadow-[0_8px_18px_rgba(37,79,141,0.09)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(37,79,141,0.14)] sm:gap-4 sm:p-4">
              <img src={image} alt="" aria-hidden="true" className="h-[58px] w-[58px] shrink-0 object-contain sm:h-[68px] sm:w-[68px]" />
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <h3 className="text-base font-bold leading-5 tracking-tight text-[#101b3d] sm:text-lg">{name}</h3>
                <p className="mt-1.5 text-xs leading-[1.4] text-[#35415b] sm:text-[13px]">{description}</p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("community-connect-search", { detail: name }))}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-[#078b96] transition group-hover:text-[#1265b8] sm:text-sm"
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
    <section id="creators" className="bg-[#f6fbff] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a5d68]">Featured Creators</div><h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">Top-rated experts ready for your next project.</h2></div><button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#14213d] transition hover:border-[#089eaa]/40 hover:text-[#089eaa]">Explore All Creators <ArrowRight size={15} /></button></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {creatorCards.map((creator) => (
            <article key={creator.name} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <div className="relative"><img src={creator.image} alt={creator.name} className="h-64 w-full rounded-[22px] object-cover" /><div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[#14213d] backdrop-blur-sm">4.9 ★</div></div>
              <div className="p-3 pb-2">
                <div className="flex items-center justify-between gap-3"><div><h3 className="text-xl font-semibold text-[#14213d]">{creator.title}</h3><p className="mt-1 text-sm text-slate-600">{creator.name}</p></div><div className="rounded-full bg-[#edfaff] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a6b74]">300+ reviews</div></div>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><MapPinIcon />{creator.location}</div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4"><div><div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Starting at</div><div className="text-lg font-bold text-[#14213d]">{creator.price}</div></div><button type="button" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#089eaa] to-[#2355cf] px-4 py-2 text-sm font-semibold text-white shadow-[0_15px_25px_rgba(8,158,170,0.25)]">View profile <ArrowRight size={15} /></button></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center"><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-[#edfaff] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">How Community Connect Works</div><h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">A simple path from idea to delivery.</h2></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ title, description, icon: Icon }, index) => (
            <div key={title} className="rounded-[28px] border border-slate-200 bg-[#f9fbff] p-5 shadow-[0_18px_35px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#089eaa] to-[#2355cf] text-white shadow-md"><Icon size={18} /></div><div className="text-sm font-semibold text-slate-400">0{index + 1}</div></div>
              <h3 className="text-xl font-semibold text-[#14213d]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[#f3fbff] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl"><div className="mb-10 text-center"><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">Why Choose Community Connect</div><h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">Smart collaboration for businesses, creators, and growing teams.</h2></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{whyChoose.map(({ title, description, icon: Icon }) => (<div key={title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_35px_rgba(15,23,42,0.04)]"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#e7faff] to-[#eae8ff] text-[#089eaa]"><Icon size={20} /></div><h3 className="text-lg font-semibold text-[#14213d]">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></div>))}</div>
      </div>
    </section>
  );
}

function BecomeCreator() {
  return (
    <section id="become-creator" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#edf7ff_0%,#f5f5ff_100%)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Creator working on a laptop" className="h-[420px] w-full rounded-[30px] object-cover shadow-[0_25px_60px_rgba(15,23,42,0.12)]" /></div>
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">Become a Creator</div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">Showcase your skills, grow your business, and connect with the right clients.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Showcase your work, build your profile, and grow your client base with trusted connections and a premium marketplace experience.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/CommunityJoinForm" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#089eaa] to-[#2355cf] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_25px_rgba(8,158,170,0.25)]">Register as a Creator <ArrowRight size={16} /></Link>
              <Link to="/CommunityJoinForm" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#14213d] hover:border-[#089eaa]/40 hover:text-[#089eaa]">Showcase your work</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-[#ffffff] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex justify-center lg:justify-start"><div className="flex h-52 w-52 items-center justify-center rounded-[30px] bg-[radial-gradient(circle_at_top,_rgba(8,158,170,0.25),rgba(255,255,255,0)_50%),linear-gradient(135deg,#f5f9ff,#dbeaff)] p-8 shadow-[0_25px_50px_rgba(17,91,117,0.12)] ring-1 ring-[#d9efff]"><div className="rounded-[28px] bg-[#f7efce] px-5 py-3 text-center shadow-inner ring-1 ring-[#e7d297]"><div className="text-2xl font-black tracking-tight text-[#1d2640]">SCHOLARS</div><div className="text-2xl font-black tracking-tight text-[#1d2640]">MEDIATECH</div></div></div></div>
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-[#edfaff] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">About Scholars Mediatech</div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">A product-minded partner for the creative economy.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Scholars Mediatech Pvt. Ltd. builds technology platforms that connect businesses, creators, and digital specialists with the opportunities they need to grow intelligently.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4"><div className="text-3xl font-bold text-[#14213d]">120+</div><div className="mt-1 text-sm text-slate-600">Projects delivered</div></div>
              <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4"><div className="text-3xl font-bold text-[#14213d]">38</div><div className="mt-1 text-sm text-slate-600">Expert teams</div></div>
              <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4"><div className="text-3xl font-bold text-[#14213d]">92%</div><div className="mt-1 text-sm text-slate-600">Client retention</div></div>
              <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4"><div className="text-3xl font-bold text-[#14213d]">74</div><div className="mt-1 text-sm text-slate-600">Countries served</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="community" className="bg-[#f8fbff] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center"><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">Community Feedback</div><h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">Real stories from clients and creatives.</h2></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((person) => (
            <article key={person.name} className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-4"><img src={person.image} alt={person.name} className="h-14 w-14 rounded-full object-cover" /><div><h3 className="text-lg font-semibold text-[#14213d]">{person.name}</h3><p className="text-sm text-slate-500">{person.role}</p></div></div>
              <div className="mt-4 flex items-center gap-1 text-[#f59e0b]">{Array.from({ length: 5 }).map((_, index) => <Star key={`${person.name}-${index}`} size={15} fill="currentColor" />)}</div>
              <p className="mt-4 text-base leading-7 text-slate-600">“{person.quote}”</p>
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
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center"><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#089eaa]/20 bg-[#edfaff] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0a5d68]">Frequently Asked Questions</div><h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#14213d] sm:text-4xl">Quick answers for creators and clients.</h2></div>
        <div className="mx-auto max-w-4xl space-y-4">{faqItems.map((item, index) => (<div key={item.question} className="overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8fbff]"><button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-[#14213d]">{item.question}<span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#089eaa] transition ${openIndex === index ? "rotate-180" : ""}`}><ChevronDown size={18} /></span></button>{openIndex === index && <div className="px-5 pb-5 text-base leading-7 text-slate-600">{item.answer}</div>}</div>))}</div>
      </div>
    </section>
  );
}

function FooterSection({ settings }) {
  const socialLinks = [
    { label: "Instagram", href: settings.socialLinks.instagram, icon: Instagram },
    { label: "LinkedIn", href: settings.socialLinks.linkedin, icon: Linkedin },
    { label: "Twitter / X", href: settings.socialLinks.twitter, icon: Twitter },
    { label: "YouTube", href: settings.socialLinks.youtube, icon: Youtube },
  ];

  return (
    <footer id="contact" className="bg-[#0d1a2a] px-4 pb-10 pt-16 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f3d06d] to-[#d7a83b] p-1.5"><img src={logo} alt="Scholars Mediatech logo" className="h-full w-full object-contain" /></div><div><div className="text-lg font-semibold text-white">Scholars Mediatech Pvt. Ltd.</div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Building Your Creativity</div></div></div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">A technology-driven company building creative and digital platforms that help communities, businesses, and professionals grow together.</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white"><Phone size={16} /></span>{settings.contactPhone || "+919340065550"}</div>
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-300"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white"><Mail size={16} /></span>{settings.contactEmail || "scholarsmediatech@gmail.com"}</div>
          </div>
          <div><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Quick Links</h3><ul className="mt-5 space-y-3 text-sm text-slate-300"><li><a href="#home" className="hover:text-white">Home</a></li><li><a href="#services" className="hover:text-white">Services</a></li><li><a href="#creators" className="hover:text-white">Explore Creators</a></li><li><a href="#how-it-works" className="hover:text-white">How It Works</a></li></ul></div>
          <div><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">For Users</h3><ul className="mt-5 space-y-3 text-sm text-slate-300"><li><a href="#services" className="hover:text-white">Browse Services</a></li><li><a href="#creators" className="hover:text-white">Find Creators</a></li><li><a href="#become-creator" className="hover:text-white">Become a Creator</a></li><li><a href="#community" className="hover:text-white">Community</a></li></ul></div>
          <div><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Company</h3><ul className="mt-5 space-y-3 text-sm text-slate-300"><li><a href="#about" className="hover:text-white">About Us</a></li><li><a href="#faq" className="hover:text-white">FAQs</a></li><li><a href="#community" className="hover:text-white">Testimonials</a></li><li><a href="/master-admin" className="hover:text-white">Admin</a></li></ul></div>
          <div><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Stay Updated</h3><div className="mt-5 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 p-2"><input type="email" placeholder="Enter your email" className="w-full border-0 bg-transparent px-2 py-2 text-sm text-white placeholder:text-slate-400 outline-none" /><button type="button" className="rounded-full bg-gradient-to-r from-[#089eaa] to-[#2355cf] px-4 py-2 text-sm font-semibold text-white">Submit</button></div><div className="mt-6 flex items-center gap-3">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-[#089eaa] hover:text-white"><Icon size={16} /></a>)}</div></div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"><div>© 2025 Scholars Mediatech Pvt. Ltd. All rights reserved.</div><div className="flex items-center gap-4"><a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms & Conditions</a></div></div>
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

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-4.35 6-10.5A6 6 0 1 0 6 10.5C6 16.65 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  );
}
