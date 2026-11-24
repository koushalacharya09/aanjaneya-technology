import { industries, priorityIndustries, services, site } from "@/content/site";
import {
  buildLandingSlug,
  featuredLocationAreas,
} from "@/content/locations";
import { media, type MediaAsset } from "@/content/media";

export const homeHero = {
  brand: site.name,
  eyebrow: "IT company · Website & digital partner in Jaipur",
  headline: "Your customers judge you online before they ever meet you.",
  sub: "Website development, SEO and digital systems for Jaipur businesses—so your presence feels as solid as your real work and turns visits into enquiries.",
  primaryCta: site.primaryCta,
  secondaryCta: { label: "Call now", href: "tel:+918209679146" },
  image: media.hero,
} as const;

export const homeTrust = {
  eyebrow: "The truth",
  /** Single Hindi emotional hook — English carries the rest of the site */
  line: "Pehle aapki digital presence dekhi jaati hai. Uske baad bharosa banta hai.",
  lineEn:
    "People meet your website, WhatsApp reply and Google presence long before they meet you. We design that first impression so it feels premium, clear and human.",
  image: media.trust,
} as const;

export const homeProof = {
  eyebrow: "Proof without fiction",
  title: "We don’t invent clients. We show how trust is built.",
  description:
    "Case studies publish only with real outcomes. Until then, here is exactly what an engagement produces—so you can judge craft, not slogans.",
  artifacts: [
    {
      title: "Discovery notes",
      description: "Goals, constraints, customers and current systems—written in business language.",
    },
    {
      title: "Scope you can defend",
      description: "Clear deliverables, timeline and trade-offs before build starts.",
    },
    {
      title: "Reviewable stages",
      description: "Design and delivery in checkpoints you can feel—not a black box.",
    },
    {
      title: "Handoff that sticks",
      description: "You own the work. Access, docs and next steps included.",
    },
  ],
  image: media.why,
} as const;

export const homeProblems = {
  eyebrow: "Where trust breaks",
  title: "Four gaps that quietly cost enquiries",
  items: [
    {
      problem: "Customers can’t find you",
      solution: "Search, maps and pages that put you in front of the right people.",
      image: media.problemFind,
    },
    {
      problem: "The site doesn’t feel trustworthy",
      solution: "Premium craft, mobile clarity and proof that you’re serious.",
      image: media.problemTrust,
    },
    {
      problem: "Enquiries die in chat",
      solution: "Capture, routing and follow-up your team can actually run.",
      image: media.problemEnquiry,
    },
    {
      problem: "Too much manual work",
      solution: "Automation on the steps that slow every day.",
      image: media.problemManual,
    },
  ],
} as const;

export const homeObjections = {
  eyebrow: "Straight answers",
  title: "What buyers ask before they enquire",
  items: [
    {
      q: "What does a typical website cost?",
      a: "Many focused website engagements start around ₹25k–₹2L depending on scope. Software and retainers vary. We clarify before quoting.",
    },
    {
      q: "How long until we launch?",
      a: "A focused marketing site often takes a few weeks once content and feedback move. Custom software takes longer—we propose a timeline after discovery.",
    },
    {
      q: "Who owns the code and site?",
      a: "You do—on final payment and handoff, unless a third-party licence says otherwise.",
    },
  ],
} as const;

const serviceImages = [
  media.serviceWeb,
  media.serviceMarketing,
  media.serviceData,
  media.serviceAi,
  media.serviceBrand,
  media.serviceTransform,
] as const;

export const homeServices = {
  eyebrow: "Capabilities",
  title: "Six disciplines. One accountable partner.",
  description:
    "Start with presence and conversion—then extend into software, data, AI, branding or transformation when the business needs it.",
  items: services.map((service, index) => ({
    ...service,
    image: serviceImages[index]!,
  })),
} as const;

const industryImageMap: Record<string, MediaAsset> = {
  jewellery: media.industryJewellery,
  "textiles-exports": media.industryTemple,
  "schools-colleges": media.industrySchools,
  "coaching-institutes": media.industryCoaching,
  healthcare: media.industryHealthcare,
  hospitality: media.industryHospitality,
  manufacturing: media.industryManufacturing,
  "real-estate": media.industryRealEstate,
  "temples-religious-trusts": media.industryTemple,
  "retail-local-business": media.industryRetail,
  "professional-services": media.why,
  "logistics-ecommerce": media.industryManufacturing,
  startups: media.industryStartup,
};

export const homeIndustries = {
  eyebrow: "Focus industries",
  title: "Where we go deep first",
  description:
    "Jewellery, textiles, education, healthcare, manufacturing, retail and professional firms in Jaipur—plus more when the fit is clear.",
  featured: priorityIndustries.slice(0, 5).map((industry) => ({
    ...industry,
    image: industryImageMap[industry.slug] ?? media.industryRetail,
  })),
  allCount: industries.length,
} as const;

export const homeAreas = {
  eyebrow: "Serving Jaipur",
  title: "Website & SEO for your locality",
  description:
    "Local pages for Malviya Nagar, Vaishali Nagar, C-Scheme, Mansarovar, Sitapura, MI Road and more—built for Jaipur search intent, not copy-paste doorway spam.",
  items: featuredLocationAreas.map((area) => ({
    name: area.name,
    pincode: area.pincode,
    websiteHref: `/${buildLandingSlug("website", area.slug)}`,
    seoHref: `/${buildLandingSlug("seo", area.slug)}`,
  })),
} as const;

export const homeProcess = {
  eyebrow: "How we work",
  title: "Discover → Plan → Build → Launch → Grow",
  image: media.process,
  steps: [
    { number: "01", title: "Discover", description: "Where trust is earned—and where it leaks." },
    { number: "02", title: "Plan", description: "Priorities, scope and honest trade-offs." },
    { number: "03", title: "Build", description: "Reviewable stages you can feel." },
    { number: "04", title: "Launch", description: "QA, handoff and day-one readiness." },
    { number: "05", title: "Grow", description: "Measure, refine and expand what works." },
  ],
} as const;

export const homeWhy = {
  eyebrow: "Why Aanjaneya",
  title: "Local partnership. Consulting discipline.",
  points: [
    {
      title: "Business before technology",
      description: "We start with the problem, not a product pitch.",
    },
    {
      title: "Transparent scope",
      description: "Clear timelines. Honest trade-offs. No invented claims.",
    },
    {
      title: "Jaipur base, national bar",
      description: "Local partnership with serious delivery standards.",
    },
    {
      title: "You own the work",
      description: "Handoff includes access, docs and next steps—not silence.",
    },
  ],
} as const;

export const homeAudit = {
  eyebrow: "Free assessment",
  title: "Does your website earn trust—or quietly lose it?",
  description:
    "Share your URL. We review clarity, mobile experience, speed signals and conversion basics—then send practical next steps.",
  image: media.audit,
} as const;

export const homeFaq = {
  eyebrow: "FAQ",
  title: "More detail if you need it",
  items: [
    {
      question: "Do you guarantee SEO rankings?",
      answer:
        "No. Meaningful SEO usually takes months. We focus on durable technical, content and local improvements with honest reporting.",
    },
    {
      question: "Do you offer maintenance after launch?",
      answer:
        "Yes—updates, monitoring, content changes and iterative improvements so the work keeps earning its keep.",
    },
    {
      question: "Do you work outside Jaipur?",
      answer:
        "Yes. Based in Jaipur, serving businesses everywhere. Most collaboration is online; on-site when needed.",
    },
    {
      question: "How do we start?",
      answer:
        "Get a quote, request a free website audit, call or WhatsApp. We reply with clear next steps.",
    },
  ],
} as const;

export const homeFinal = {
  title: "Ready to tighten your digital trust?",
  description:
    "Tell us what you want customers to feel when they find you online. We’ll respond with precise questions—not a fake fixed pitch.",
  image: media.final,
} as const;
