/**
 * Static landing CMS fallbacks.
 * Shown when the API is unreachable (offline / server down).
 * Live /active responses replace these when available.
 */

export const FALLBACK_ABOUT = {
  sectionLabel: "About Scholars Mediatech",
  heading: "A product-minded partner, not just another agency.",
  descriptionOne:
    "We blend strategy, design and engineering to help ambitious brands launch and scale digital experiences that feel sharp, fast and effortless to use. Every project is handled by a compact senior team - no unnecessary layers, no copy-paste templates.",
  descriptionTwo:
    "From early-stage startups to established enterprises, we plug into your teams as a long-term product & growth partner, shipping improvements in tight feedback loops instead of one-off campaigns.",
  stats: [
    { value: "5+", label: "Years building digital products" },
    { value: "30+", label: "Industries & categories" },
    { value: "End-to-end", label: "Strategy, design, build & grow" },
  ],
  ctaText: "Priority slots available for",
  ctaHighlightText: "Q2 2026 product launches",
  imageUrl: "",
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_HERO_LEFT = {
  sectionLabel: "Landing hero (left column)",
  badgeLabel: "Join us our team",
  headlineLine1: "Building Your Creativity",
  headlineLine2: "Connect Your Community",
  bodyParagraph1:
    "Scholars Media Tech is a collaborative digital platform designed to bring aspiring creators, students, and early-career professionals together under one community. We connect fresh talent with industry-relevant skills, expert guidance, practical projects, and a growing digital workforce. Our aim is to help individuals transform their creativity and potential into meaningful professional opportunities.",
  highlightPhrase: "Scholars Media Tech",
  bodyParagraph2:
    "Whether you are beginning your journey in technology, digital marketing, content creation, design, or social media, Scholars Media Tech provides a clear path to learn, practice, collaborate, and grow. Through our structured student internship programs, participants gain hands-on experience through live assignments, collaborative projects, mentor feedback, and community engagement. This helps them develop practical skills, create a strong portfolio, build a professional network, and become career-ready.",
  bulletPoints: [
    "Skill development and mentorship",
    "Internship and live-project experience",
    "Digital creators' community",
    "Networking and collaboration opportunities",
    "Portfolio and career-profile building",
    "Access to a skilled digital workforce",
  ],
  primaryCtaLabel: "Join the Community",
  primaryCtaHref: "#join-community",
  secondaryCtaLabel: "Apply for Internship",
  secondaryCtaPath: "#join-community",
  socialProofText:
    "At Scholars Media Tech, we believe that talent grows faster when it is supported by the right skills, the right community, and real opportunities.",
  socialProofAvatarUrls: [],
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_EXPERTISE = {
  sectionLabel: "What we are good at",
  heading: "Product, design & growth under one roof.",
  description:
    "Every engagement is led by senior talent across strategy, design and engineering - so decisions are coherent, fast and impact-driven, instead of being spread across disconnected vendors.",
  items: [
    {
      iconKey: "Code",
      title: "Product-grade engineering",
      desc: "Modern, maintainable codebases with performance budgets, CI and observability baked-in from day one.",
    },
    {
      iconKey: "Palette",
      title: "Interface & experience design",
      desc: "Interfaces that feel clean, confident and premium - always designed around business KPIs & real user journeys.",
    },
    {
      iconKey: "TrendingUp",
      title: "Acquisition & growth",
      desc: "SEO foundations, landing page experiments and analytics that tie every experiment back to revenue.",
    },
    {
      iconKey: "Smartphone",
      title: "Multi-device reality",
      desc: "From mobile-first web to native apps, we make sure your brand feels consistent and high-end everywhere.",
    },
  ],
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_PROCESS = {
  sectionLabel: "How we work",
  heading: "A calm, transparent delivery process.",
  description:
    "No chaos, no guessing. You always know what is being shipped this week, what is blocked and what the expected impact looks like.",
  steps: [
    {
      label: "01",
      title: "Discovery & alignment",
      desc: "Understand your product, market, constraints and success metrics in a structured workshop.",
    },
    {
      label: "02",
      title: "Experience & architecture",
      desc: "Translate strategy into information architecture, user journeys and a scalable design system.",
    },
    {
      label: "03",
      title: "Build, test & launch",
      desc: "Ship in iterative sprints with QA, performance checks and stakeholder reviews baked into the cadence.",
    },
    {
      label: "04",
      title: "Measure & optimise",
      desc: "Track real-world usage, identify friction and continuously refine to unlock compounding ROI.",
    },
  ],
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_SERVICES = {
  sectionBadgeLabel: "Services",
  heading: "Everything you need to go from idea to impact.",
  description:
    "We can own the full journey or plug into existing teams for specific streams like growth, design or engineering.",
  ctaLabel: "Explore this service",
  items: [
    {
      iconKey: "TrendingUp",
      title: "Digital marketing ecosystems",
      desc: "From SEO foundations to performance campaigns and CRO - everything connected to revenue.",
      features: [
        "Search & content strategy",
        "Landing page optimisation",
        "Performance marketing setups",
        "Analytics instrumentation",
      ],
    },
    {
      iconKey: "Code",
      title: "Web & web-app development",
      desc: "Robust, fast experiences on modern stacks with clean architecture and maintainable code.",
      features: [
        "Marketing & product websites",
        "Custom dashboards & portals",
        "API & third-party integrations",
        "Performance & security checks",
      ],
    },
    {
      iconKey: "Smartphone",
      title: "Mobile experiences",
      desc: "Native-feeling mobile apps and PWAs tailored to your business and user context.",
      features: [
        "iOS / Android applications",
        "React Native / hybrid apps",
        "App store optimisation",
        "Usage analytics & funnels",
      ],
    },
    {
      iconKey: "Palette",
      title: "Brand & product design",
      desc: "Interfaces and visual systems that feel premium, timeless and conversion-focused.",
      features: [
        "Design systems & UI libraries",
        "UX research & flows",
        "Interaction & motion design",
        "Brand identity refresh",
      ],
    },
  ],
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_CASE_STUDY = {
  sectionLabel: "Highlight",
  heading: "150% uplift in conversions for a marketplace within 90 days.",
  description:
    "By re-architecting the onboarding flow, speeding up the front-end and aligning landing messaging with real search intent, we helped a commerce brand unlock significantly better unit economics.",
  snapshotLabel: "Snapshot",
  metrics: [
    { value: "+150%", label: "Conversion rate" },
    { value: "-42%", label: "CAC" },
    { value: "90 days", label: "From kickoff to impact" },
  ],
  isVisible: true,
  publishStatus: "published",
};

export const FALLBACK_FAQ = {
  sectionLabel: "Questions",
  heading: "A few things teams often ask us.",
  items: [
    {
      question: "What is a typical project timeline?",
      answer:
        "Smaller marketing sites can be delivered in 3-5 weeks. Product builds and complex platforms usually run between 8-16 weeks depending on scope.",
    },
    {
      question: "Do you only work with Indian companies?",
      answer:
        "No - while a lot of our clients are India-first businesses, we also work with teams in the Middle East, Europe and South-East Asia across time zones.",
    },
    {
      question: "Can you work with our in-house dev or marketing team?",
      answer:
        "Absolutely. Many engagements are hybrid - we own UX/UI and architecture while your teams manage engineering or growth, or vice-versa.",
    },
    {
      question: "How do we get started?",
      answer:
        "Share a short brief using the form above or email us. We usually respond within 24 hours with a rough scope, ballpark and next steps.",
    },
  ],
  isVisible: true,
  publishStatus: "published",
};
