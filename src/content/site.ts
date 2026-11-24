export const site = {
  name: "Aanjaneya Technology",
  shortName: "Aanjaneya",
  legalName: "Aanjaneya Technology",
  tagline: "Digital presence that earns trust—and enquiries.",
  supportingLine:
    "Websites, software and growth systems for Jaipur businesses that want to look as serious online as they are offline.",
  description:
    "Aanjaneya Technology helps jewellery, education, healthcare, retail and manufacturing businesses in Jaipur get found, convert enquiries, and run clearer digital systems with durable craft.",
  locationLine: "Based in Jaipur, Rajasthan · Serving clients across India.",
  phoneDisplay: "+91 8209679146",
  phoneE164: "+918209679146",
  whatsappNumber: "918209679146",
  /** Set a real inbox when ready; empty hides mailto until then */
  email: "",
  domain: "",
  address: "Jaipur, Rajasthan, India",
  addressLocality: "Jaipur",
  addressRegion: "Rajasthan",
  addressCountry: "IN",
  postalCode: "",
  geo: {
    latitude: 26.9124,
    longitude: 75.7873,
  },
  hoursDisplay: "Mon–Sat · 10:00–19:00 IST",
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",
  copyrightYear: 2026,
  /** Empty URLs are hidden in UI until published */
  socials: {
    linkedin: "",
    instagram: "",
    facebook: "",
    x: "",
  },
  /** Single primary close CTA — use everywhere */
  primaryCta: { label: "Get a quote", href: "/get-a-quote" },
  secondaryCta: { label: "WhatsApp us", href: "whatsapp" as const },
} as const;

export const contactLinks = {
  phoneHref: `tel:${site.phoneE164}`,
  whatsappHref: `https://wa.me/${site.whatsappNumber}`,
  whatsappWithMessage: (message: string) =>
    `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`,
  emailHref: site.email ? `mailto:${site.email}` : "",
} as const;

export const publishedSocials = (
  [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Instagram", href: site.socials.instagram },
    { label: "Facebook", href: site.socials.facebook },
    { label: "X", href: site.socials.x },
  ] as const
).filter((item) => Boolean(item.href));

export const services = [
  {
    slug: "website-software-development",
    name: "Website & Software Development",
    summary:
      "Custom websites and software built around how your business actually works.",
    deliverables: [
      "Business websites & landing pages",
      "Custom web apps & portals",
      "E-commerce & enquiry systems",
    ],
  },
  {
    slug: "digital-marketing-seo",
    name: "Digital Marketing & SEO",
    summary:
      "Get found by the right customers in Jaipur, Rajasthan, and beyond.",
    deliverables: [
      "Technical & local SEO",
      "Content & landing pages",
      "Campaign measurement",
    ],
  },
  {
    slug: "data-science-analytics",
    name: "Data Science & Analytics",
    summary:
      "Turn business data into clearer decisions and measurable outcomes.",
    deliverables: [
      "Dashboards & reporting",
      "Pipeline hygiene",
      "Decision models",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    summary:
      "Reduce manual work with practical AI and automation for your team.",
    deliverables: [
      "Workflow automation",
      "AI assistants for ops",
      "Lead routing & follow-ups",
    ],
  },
  {
    slug: "branding-creative",
    name: "Branding & Creative Solutions",
    summary:
      "A clear brand identity that feels premium and consistent across every touchpoint.",
    deliverables: [
      "Brand identity systems",
      "Creative for web & social",
      "Guidelines & templates",
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    summary:
      "Modernise operations with the right digital systems—not tools for their own sake.",
    deliverables: [
      "Systems roadmap",
      "Process digitisation",
      "Tooling & change support",
    ],
  },
] as const;

export const industries = [
  {
    slug: "jewellery",
    name: "Jewellery Brands & Showrooms",
    hoverSolution: "Premium catalogue sites and WhatsApp enquiry flows",
    priority: true,
  },
  {
    slug: "textiles-exports",
    name: "Textiles, Handicrafts & Exports",
    hoverSolution: "Catalogue sites and wholesale enquiry systems",
    priority: true,
  },
  {
    slug: "schools-colleges",
    name: "Schools & Colleges",
    hoverSolution: "Admission enquiries, notices, and parent-facing portals",
    priority: true,
  },
  {
    slug: "coaching-institutes",
    name: "Coaching Institutes",
    hoverSolution: "Course pages, lead capture, and batch communication",
    priority: false,
  },
  {
    slug: "healthcare",
    name: "Hospitals & Healthcare",
    hoverSolution: "Doctor profiles, appointment intent, and trust-first design",
    priority: true,
  },
  {
    slug: "hospitality",
    name: "Hotels & Restaurants",
    hoverSolution: "Booking intent, menus, and local discovery",
    priority: false,
  },
  {
    slug: "manufacturing",
    name: "Manufacturers & Factories",
    hoverSolution: "Capability sites, RFQ flows, and B2B credibility",
    priority: true,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    hoverSolution: "Project pages, lead qualification, and listing clarity",
    priority: false,
  },
  {
    slug: "temples-religious-trusts",
    name: "Temples & Religious Trusts",
    hoverSolution: "Donation clarity, event updates, and community trust",
    priority: false,
  },
  {
    slug: "retail-local-business",
    name: "Retail & Local Businesses",
    hoverSolution: "Google presence, offers, and enquiry conversion",
    priority: false,
  },
  {
    slug: "professional-services",
    name: "CA, Law & Professional Firms",
    hoverSolution: "Credibility sites and discreet enquiry routing",
    priority: false,
  },
  {
    slug: "logistics-ecommerce",
    name: "Logistics, Ecommerce & D2C",
    hoverSolution: "Storefronts, lane pages, and ops-ready lead flows",
    priority: false,
  },
  {
    slug: "startups",
    name: "Startups & Enterprises",
    hoverSolution: "Product sites, MVPs, and scalable digital systems",
    priority: false,
  },
] as const;

export const priorityIndustries = industries.filter((i) => i.priority);

export type ServiceSlug = (typeof services)[number]["slug"];
export type IndustrySlug = (typeof industries)[number]["slug"];

export const primaryNav = [
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
      description: service.summary,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: priorityIndustries.map((industry) => ({
      label: industry.name,
      href: `/industries/${industry.slug}`,
      description: industry.hoverSolution,
    })),
  },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
    { label: "Get a quote", href: "/get-a-quote" },
    { label: "Free website audit", href: "/free-website-audit" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
  "SPAM",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const budgetRanges = [
  "Under ₹25k",
  "₹25k–75k",
  "₹75k–2L",
  "₹2L+",
  "Not sure",
] as const;

export const preferredContactMethods = ["Call", "WhatsApp", "Email"] as const;

export const marqueeCapabilities = [
  "Website Development",
  "Custom Software",
  "SEO",
  "AI Automation",
  "Data Analytics",
  "Branding",
  "Digital Transformation",
  "E-commerce",
  "CRM Solutions",
] as const;

export const techStackGroups = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "Prisma", "REST / Route Handlers"],
  },
  {
    label: "Data & AI",
    items: ["Analytics dashboards", "Automation workflows", "Practical AI assistants"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Vercel", "CI/CD", "Monitoring basics"],
  },
  {
    label: "Marketing tools",
    items: ["GA4", "Search Console", "Tag hygiene", "CRM stubs"],
  },
] as const;
