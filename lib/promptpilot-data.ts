import { addDays, subDays, subHours } from "date-fns";

import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import { promptPilotEnv } from "@/lib/promptpilot-env";
import type {
  AnalyticsSnapshot,
  CampaignInput,
  OutputBundle,
  PromptPack,
  PromptPilotActivityItem,
  PromptPilotBrandProfile,
  PromptPilotNotification,
  PromptPilotProfile,
  PromptPilotProject,
  PromptPilotRole,
  PromptPilotTemplate,
  PromptPilotWorkspace,
  SearchItem
} from "@/lib/promptpilot-types";

const baseDate = new Date("2026-03-28T07:00:00.000Z");
const generator = getPromptPilotGenerator();

export const promptPilotWorkspace: PromptPilotWorkspace = {
  id: "workspace-1",
  name: "PromptPilot Creative Hub",
  slug: "promptpilot-creative-hub",
  plan: "Agency",
  seatCount: 14,
  companyName: "PromptPilot",
  accentHsl: promptPilotEnv.accentHsl
};

export const promptPilotProfiles: PromptPilotProfile[] = [
  {
    id: "profile-admin",
    workspaceId: promptPilotWorkspace.id,
    fullName: "Ariana Moss",
    email: promptPilotEnv.demoAdminEmail,
    title: "Studio Admin",
    avatar: "AM",
    role: "admin"
  },
  {
    id: "profile-team",
    workspaceId: promptPilotWorkspace.id,
    fullName: "Lebo Ndlovu",
    email: promptPilotEnv.demoTeamEmail,
    title: "Creative Strategist",
    avatar: "LN",
    role: "team_member"
  },
  {
    id: "profile-viewer",
    workspaceId: promptPilotWorkspace.id,
    fullName: "Mila Carter",
    email: promptPilotEnv.demoViewerEmail,
    title: "Client Viewer",
    avatar: "MC",
    role: "viewer"
  }
];

export const promptPilotDemoCredentials = {
  admin: {
    email: promptPilotEnv.demoAdminEmail,
    password: promptPilotEnv.demoAdminPassword
  },
  team_member: {
    email: promptPilotEnv.demoTeamEmail,
    password: promptPilotEnv.demoTeamPassword
  },
  viewer: {
    email: promptPilotEnv.demoViewerEmail,
    password: promptPilotEnv.demoViewerPassword
  }
};

const businessSeeds = [
  {
    clientName: "BluePeak Property Group",
    businessName: "BluePeak Property Group",
    industry: "Real estate",
    businessType: "Real estate brokerage",
    productService: "luxury property launches",
    audience: "upscale sellers and buyers in Johannesburg",
    goal: "book seller strategy consultations",
    platform: "Instagram",
    tone: "Premium, assured, city-smart",
    offer: "Complimentary listing strategy session",
    preferredOutput: "Launch pack",
    tags: ["real estate", "launch"],
    campaigns: ["Spring Listing Sprint", "Luxury Buyer Social Push"]
  },
  {
    clientName: "North Ridge Accounting",
    businessName: "North Ridge Accounting",
    industry: "Accounting",
    businessType: "Accounting and advisory firm",
    productService: "tax planning packages",
    audience: "SME owners preparing for year-end tax pressure",
    goal: "generate qualified advisory calls",
    platform: "LinkedIn",
    tone: "Clear, credible, senior",
    offer: "Free tax readiness review",
    preferredOutput: "Campaign pack",
    tags: ["accounting", "lead gen"],
    campaigns: ["Tax Season Lead Wave", "CFO Confidence Campaign"]
  },
  {
    clientName: "FlowFix Plumbing",
    businessName: "FlowFix Plumbing",
    industry: "Field services",
    businessType: "Residential plumbing service",
    productService: "same-day emergency plumbing",
    audience: "homeowners needing urgent repair help",
    goal: "drive more booked service calls",
    platform: "Facebook",
    tone: "Fast, trustworthy, local",
    offer: "No-callout-fee booking today",
    preferredOutput: "Content pack",
    tags: ["plumbing", "local service"],
    campaigns: ["Burst Pipe Rescue Push", "Neighborhood Service Trust Drive"]
  },
  {
    clientName: "Maison Ember",
    businessName: "Maison Ember",
    industry: "Hospitality",
    businessType: "Boutique restaurant group",
    productService: "seasonal dining experiences",
    audience: "urban diners seeking premium nights out",
    goal: "increase reservations for a seasonal menu launch",
    platform: "Instagram",
    tone: "Atmospheric, indulgent, polished",
    offer: "Chef's tasting menu reservation",
    preferredOutput: "Image prompt pack",
    tags: ["restaurant", "hospitality"],
    campaigns: ["Autumn Tasting Launch", "Weekend Table Demand Builder"]
  },
  {
    clientName: "Ledger Lane Advisory",
    businessName: "Ledger Lane Advisory",
    industry: "Finance",
    businessType: "Accounting growth consultancy",
    productService: "fractional finance leadership",
    audience: "founders with growing teams and messy reporting",
    goal: "increase discovery call conversions",
    platform: "LinkedIn",
    tone: "Direct, executive, premium",
    offer: "Free finance systems audit",
    preferredOutput: "Landing page copy",
    tags: ["finance", "b2b"],
    campaigns: ["Founder Reporting Reset", "Scale-Ready Finance Story"]
  },
  {
    clientName: "Vista Local Market",
    businessName: "Vista Local Market",
    industry: "Retail",
    businessType: "Independent lifestyle retailer",
    productService: "curated home and gifting collections",
    audience: "style-conscious local shoppers",
    goal: "increase foot traffic and social saves",
    platform: "Instagram",
    tone: "Warm, curated, playful",
    offer: "Weekend in-store styling event",
    preferredOutput: "Content calendar",
    tags: ["retail", "local"],
    campaigns: ["Weekend Foot Traffic Builder", "Gift Edit Launch"]
  },
  {
    clientName: "Signal Harbor Agency",
    businessName: "Signal Harbor Agency",
    industry: "Agency",
    businessType: "Performance marketing agency",
    productService: "creative strategy retainers",
    audience: "founders and marketing leads at challenger brands",
    goal: "position the agency as a premium growth partner",
    platform: "LinkedIn",
    tone: "Sharp, strategic, modern",
    offer: "Creative audit session",
    preferredOutput: "Prompt pack",
    tags: ["agency", "creative strategy"],
    campaigns: ["Agency Authority Series", "Creative Audit Conversion Push"]
  },
  {
    clientName: "OrbitOps",
    businessName: "OrbitOps",
    industry: "SaaS",
    businessType: "Revenue operations SaaS",
    productService: "pipeline forecasting platform",
    audience: "revenue leaders frustrated by manual reporting",
    goal: "increase demo requests",
    platform: "LinkedIn",
    tone: "Intelligent, premium, no-fluff",
    offer: "Forecasting maturity assessment",
    preferredOutput: "Video prompt pack",
    tags: ["saas", "b2b"],
    campaigns: ["Forecasting Confidence Launch", "Pipeline Visibility Demand Gen"]
  },
  {
    clientName: "Harbor Stay Suites",
    businessName: "Harbor Stay Suites",
    industry: "Hospitality",
    businessType: "Boutique aparthotel brand",
    productService: "premium short-stay experiences",
    audience: "business travelers and design-led weekend guests",
    goal: "boost direct bookings",
    platform: "Instagram",
    tone: "Elevated, calm, inviting",
    offer: "Direct booking welcome perk",
    preferredOutput: "Storyboard pack",
    tags: ["hotel", "direct booking"],
    campaigns: ["Direct Booking Upgrade", "Designer Weekend Escape Push"]
  },
  {
    clientName: "Everline Legal",
    businessName: "Everline Legal",
    industry: "Professional services",
    businessType: "Modern legal advisory firm",
    productService: "startup legal retainers",
    audience: "venture-backed founders who need ongoing counsel",
    goal: "build trust and consultation volume",
    platform: "LinkedIn",
    tone: "Calm, authoritative, modern",
    offer: "Startup legal strategy consult",
    preferredOutput: "Campaign pack",
    tags: ["legal", "professional services"],
    campaigns: ["Founder Counsel Series", "Retainer Trust Launch"]
  }
] as const;

export const promptPilotTemplates: PromptPilotTemplate[] = [
  {
    id: "template-1",
    name: "Real Estate Launch Campaign",
    industry: "Real estate",
    summary: "Premium launch angles for listings, buyer demand, and agent authority.",
    bestFor: "Agencies and broker teams launching high-value listings.",
    deliverables: ["Campaign concepts", "Storyboard", "Listing hooks", "Content calendar"],
    stylePreset: "Architectural editorial",
    platformFocus: ["Instagram", "Facebook"],
    category: "Launch"
  },
  {
    id: "template-2",
    name: "Property Listing Ad Pack",
    industry: "Real estate",
    summary: "Built to move listings from static posts into high-intent ad assets.",
    bestFor: "Brokerages needing more polish in paid social creative.",
    deliverables: ["Ad hooks", "Image prompts", "Copy pack", "CTA set"],
    stylePreset: "Luxury commercial",
    platformFocus: ["Instagram", "Facebook"],
    category: "Lead Gen"
  },
  {
    id: "template-3",
    name: "Plumbing Service Campaign",
    industry: "Field services",
    summary: "Trust-building local service creative for urgent repairs and call volume.",
    bestFor: "Home service brands with fast-response offers.",
    deliverables: ["Campaign angles", "Offer hooks", "Landing copy", "7-day sequence"],
    stylePreset: "High-clarity local trust",
    platformFocus: ["Facebook", "Google Business"],
    category: "Local Growth"
  },
  {
    id: "template-4",
    name: "Restaurant Promo Pack",
    industry: "Hospitality",
    summary: "Atmospheric creative direction for launches, menus, and reservation growth.",
    bestFor: "Restaurants and hospitality groups with premium dining offers.",
    deliverables: ["Storyboard", "Image prompt set", "Reservation CTA copy", "30-day calendar"],
    stylePreset: "Editorial nightlife",
    platformFocus: ["Instagram", "TikTok"],
    category: "Awareness"
  },
  {
    id: "template-5",
    name: "Accounting Firm Lead Campaign",
    industry: "Accounting",
    summary: "Proof-led messaging for firms selling clarity, planning, and advisory confidence.",
    bestFor: "Advisory firms moving beyond compliance-only positioning.",
    deliverables: ["Campaign concepts", "LinkedIn hooks", "Landing copy", "FAQ prompts"],
    stylePreset: "Executive clarity",
    platformFocus: ["LinkedIn", "Email"],
    category: "Lead Gen"
  },
  {
    id: "template-6",
    name: "SaaS Product Awareness Campaign",
    industry: "SaaS",
    summary: "Modern product storytelling for demos, launches, and demand generation.",
    bestFor: "B2B software teams that need a sharper narrative.",
    deliverables: ["Video prompts", "Storyboard", "Headline bank", "Proof section ideas"],
    stylePreset: "Future-facing premium",
    platformFocus: ["LinkedIn", "YouTube"],
    category: "Awareness"
  },
  {
    id: "template-7",
    name: "Local Business Social Boost Campaign",
    industry: "Retail",
    summary: "Repeatable social content for local discovery, events, and in-store conversion.",
    bestFor: "Independent retailers and service brands.",
    deliverables: ["Content calendar", "Hooks", "CTA bank", "Offer direction"],
    stylePreset: "Warm modern local",
    platformFocus: ["Instagram", "Facebook"],
    category: "Local Growth"
  },
  {
    id: "template-8",
    name: "Agency Authority Builder",
    industry: "Agency",
    summary: "Founder-led authority content and conversion messaging for agency pipelines.",
    bestFor: "Agencies selling strategy retainers or premium creative services.",
    deliverables: ["Thought leadership themes", "Campaign pack", "Landing page copy", "Prompt pack"],
    stylePreset: "Sharp consultancy",
    platformFocus: ["LinkedIn", "Email"],
    category: "Awareness"
  },
  {
    id: "template-9",
    name: "Hospitality Direct Booking Push",
    industry: "Hospitality",
    summary: "Brand-safe campaigns built to lift direct booking and premium stay demand.",
    bestFor: "Hotels and aparthotels reducing OTA dependence.",
    deliverables: ["Storyboard", "Offer hooks", "Image prompts", "Booking CTA copy"],
    stylePreset: "Quiet luxury travel",
    platformFocus: ["Instagram", "Meta Ads"],
    category: "Retention"
  },
  {
    id: "template-10",
    name: "Professional Services Trust Builder",
    industry: "Professional services",
    summary: "Clean, modern messaging for firms that need authority without sounding cold.",
    bestFor: "Legal, advisory, and consulting practices.",
    deliverables: ["Campaign angles", "Thought leadership hooks", "FAQ prompts", "Proof ideas"],
    stylePreset: "Modern authority",
    platformFocus: ["LinkedIn", "Web"],
    category: "Lead Gen"
  }
];

const owners = [
  "Ariana Moss",
  "Lebo Ndlovu",
  "Jonas Reed",
  "Priya Sharma",
  "Noah Bennett",
  "Talia Mbeki"
] as const;

export const promptPilotProjects: PromptPilotProject[] = businessSeeds.flatMap((seed, seedIndex) =>
  seed.campaigns.map((campaignName, variantIndex) => ({
    id: `project-${seedIndex * 2 + variantIndex + 1}`,
    workspaceId: promptPilotWorkspace.id,
    name: `${seed.businessName} ${campaignName}`,
    clientName: seed.clientName,
    industry: seed.industry,
    businessType: seed.businessType,
    businessName: seed.businessName,
    productService: seed.productService,
    audience: seed.audience,
    goal: seed.goal,
    platform: seed.platform,
    tone: seed.tone,
    offer: seed.offer,
    preferredOutput: seed.preferredOutput,
    status: (["Ready", "Review", "Generating", "Draft"] as const)[(seedIndex + variantIndex) % 4],
    owner: owners[(seedIndex + variantIndex) % owners.length],
    lastUpdated: subHours(baseDate, seedIndex * 5 + variantIndex * 7).toISOString(),
    description: `${campaignName} for ${seed.businessName}, built to turn strategy briefs into campaign-ready concepts, prompt packs, and rollout assets.`,
    tags: [...seed.tags, variantIndex === 0 ? "core demo" : "variation"],
    favorite: seedIndex % 3 === 0 && variantIndex === 0,
    archived: seedIndex === 8 && variantIndex === 1,
    templateId: promptPilotTemplates[seedIndex]?.id
  }))
);

function toCampaignInput(project: PromptPilotProject): CampaignInput {
  return {
    businessType: project.businessType,
    businessName: project.businessName,
    productService: project.productService,
    audience: project.audience,
    platform: project.platform,
    campaignObjective: project.goal,
    offer: project.offer,
    tone: project.tone,
    visualStyle:
      project.industry === "Hospitality"
        ? "Editorial cinematic"
        : project.industry === "SaaS"
          ? "Future-facing product polish"
          : project.industry === "Accounting"
            ? "Executive clarity"
            : "Premium conversion storytelling",
    ctaPreference:
      project.industry === "Retail"
        ? "Visit the store"
        : project.industry === "Hospitality"
          ? "Book now"
          : "Book a strategy call"
  };
}

export const promptPilotOutputs: OutputBundle[] = promptPilotProjects.map((project) => {
  const bundle = generator.generateBundle(toCampaignInput(project));
  return {
    ...bundle,
    id: `bundle-${project.id}`,
    projectId: project.id,
    stylePreset:
      project.industry === "Real estate"
        ? "Architectural editorial"
        : project.industry === "Field services"
          ? "High-clarity local trust"
          : bundle.stylePreset,
    updatedAt: project.lastUpdated
  };
});

export const promptPilotPromptPacks: PromptPack[] = promptPilotProjects.slice(0, 12).map((project, index) => ({
  id: `pack-${index + 1}`,
  workspaceId: promptPilotWorkspace.id,
  projectId: project.id,
  name: `${project.clientName} ${project.preferredOutput}`,
  type: (["Campaign", "Image Prompt", "Video Prompt", "Content", "Launch"] as const)[index % 5],
  sections: [
    "Campaign concepts",
    "Storyboard notes",
    "Prompt directions",
    "CTA bank"
  ].slice(0, 3 + (index % 2)),
  owner: project.owner,
  status: (["Ready", "Draft", "Shared"] as const)[index % 3],
  createdAt: subDays(baseDate, index + 4).toISOString(),
  updatedAt: subHours(baseDate, index * 6 + 3).toISOString(),
  exportedAt: index % 3 === 0 ? subDays(baseDate, index).toISOString() : undefined
}));

export const promptPilotBrandProfiles: PromptPilotBrandProfile[] = promptPilotProjects
  .slice(0, 15)
  .map((project, index) => {
    const bundle = promptPilotOutputs[index];
    return {
      id: `brand-${index + 1}`,
      workspaceId: promptPilotWorkspace.id,
      name: `${project.clientName} Brand System`,
      industry: project.industry,
      personality: project.tone,
      audience: project.audience,
      contentStyle: bundle.stylePreset,
      colorSystem: bundle.brandDirection.suggestedColorSystem,
      toneSummary: bundle.brandDirection.brandToneSummary,
      messagingRules: bundle.brandDirection.brandSafeMessagingRules,
      typographyMood: bundle.brandDirection.typographyMood,
      lastUpdated: subDays(baseDate, index).toISOString()
    };
  });

export const promptPilotNotifications: PromptPilotNotification[] = [
  {
    id: "notification-1",
    title: "New export ready for BluePeak Property Group",
    description: "The launch summary PDF preview is available in Export Center.",
    createdAt: subHours(baseDate, 2).toISOString(),
    unread: true,
    audience: "all"
  },
  {
    id: "notification-2",
    title: "Prompt pack duplicated",
    description: "A variant pack was created for OrbitOps Forecasting Confidence Launch.",
    createdAt: subHours(baseDate, 5).toISOString(),
    unread: true,
    audience: "admin"
  },
  {
    id: "notification-3",
    title: "Storyboard review requested",
    description: "Harbor Stay Suites requested a calmer pacing option for scene three.",
    createdAt: subHours(baseDate, 8).toISOString(),
    unread: false,
    audience: "team_member"
  },
  {
    id: "notification-4",
    title: "Brand profile approved",
    description: "Maison Ember approved the tonal direction for the autumn menu launch.",
    createdAt: subHours(baseDate, 11).toISOString(),
    unread: false,
    audience: "viewer"
  }
];

export const promptPilotActivity: PromptPilotActivityItem[] = [
  {
    id: "activity-1",
    title: "Campaign bundle generated",
    detail: "BluePeak Property Group received 3 campaign concepts, 5 hooks, and a launch CTA bank.",
    createdAt: subHours(baseDate, 1).toISOString(),
    category: "campaign"
  },
  {
    id: "activity-2",
    title: "Storyboard version exported",
    detail: "Harbor Stay Suites exported a 5-scene direct-booking storyboard summary.",
    createdAt: subHours(baseDate, 4).toISOString(),
    category: "storyboard"
  },
  {
    id: "activity-3",
    title: "Prompt pack shared",
    detail: "Signal Harbor Agency shared the authority builder prompt pack with the client viewer role.",
    createdAt: subHours(baseDate, 7).toISOString(),
    category: "prompt_pack"
  },
  {
    id: "activity-4",
    title: "Brand profile updated",
    detail: "North Ridge Accounting refined its content themes and proof rules.",
    createdAt: subHours(baseDate, 10).toISOString(),
    category: "brand_profile"
  },
  {
    id: "activity-5",
    title: "Project duplicated",
    detail: "FlowFix Plumbing duplicated its service campaign to create a weekend offer variant.",
    createdAt: subHours(baseDate, 14).toISOString(),
    category: "project"
  },
  {
    id: "activity-6",
    title: "Export center updated",
    detail: "A campaign summary preview was regenerated with the Architectural Editorial preset.",
    createdAt: subHours(baseDate, 18).toISOString(),
    category: "export"
  }
];

export const landingFeatures = [
  {
    title: "Concept-to-campaign engine",
    description: "Turn a basic business brief into structured campaigns, hooks, CTAs, and messaging pillars."
  },
  {
    title: "Story-to-media builder",
    description: "Move from campaign concept to shot lists, scene goals, voiceovers, and polished prompt directions."
  },
  {
    title: "Prompt labs that feel production-ready",
    description: "Generate premium image and video prompts without paying for generation APIs in v1."
  },
  {
    title: "Brand visualizer and content studio",
    description: "Create brand tone systems, content themes, landing copy, and campaign calendars in one workspace."
  },
  {
    title: "White-label ready",
    description: "Swap branding, accent colors, support email, and logo placeholder without refactoring the app."
  },
  {
    title: "Future API-ready architecture",
    description: "All structured generation logic lives in a provider-style service layer built for later upgrades."
  }
];

export const workflowShowcase = [
  {
    title: "1. Enter the brief",
    description: "Business type, product, audience, platform, tone, offer, and output preferences."
  },
  {
    title: "2. Generate structured outputs",
    description: "Campaign concepts, storyboard sequences, prompt labs, copy packs, and content plans."
  },
  {
    title: "3. Review the workspace",
    description: "Move through campaign tabs, compare prompt directions, and refine style presets."
  },
  {
    title: "4. Export for clients",
    description: "Create text exports and polished preview pages for demos, pitches, and handoff."
  }
];

export const outputExamples = [
  {
    title: "Launch Campaign Pack",
    description: "3 concepts, 5 hooks, value prop summary, CTA bank, and proof-led messaging pillars."
  },
  {
    title: "Storyboard Direction",
    description: "3-scene, 5-scene, and 10-scene concepts with overlays, transitions, and narration cues."
  },
  {
    title: "Brand and Content Suite",
    description: "Color system, typography mood, messaging rules, landing copy, and a 30-day calendar."
  }
];

export const landingTestimonials = [
  {
    quote:
      "PromptPilot Studio feels like a real AI creative operating system. It makes strategy work easier to sell to clients.",
    name: "Maya Thompson",
    title: "Founder, Signal Harbor Agency"
  },
  {
    quote:
      "The output workspace is polished enough for live demos. We can walk clients from brief to concept without apologizing for the UI.",
    name: "James Patel",
    title: "Director, North Ridge Accounting"
  },
  {
    quote:
      "It gives our team a premium way to package campaign thinking, visual direction, and content planning in one place.",
    name: "Amara Okafor",
    title: "Marketing Lead, BluePeak Property Group"
  }
];

export const promptPilotFaqs = [
  {
    question: "Does PromptPilot generate images or videos in v1?",
    answer:
      "No. Version 1 is deliberately built as a no-paid-API demo. It generates structured concepts, storyboards, and prompts only."
  },
  {
    question: "Can real AI providers be plugged in later?",
    answer:
      "Yes. The generation layer is isolated behind a provider-style interface so API-backed providers can be added with minimal refactoring."
  },
  {
    question: "Is the app white-label ready?",
    answer:
      "Yes. Branding, accent color, logo placeholder, support email, and workspace naming are all configurable."
  },
  {
    question: "Who is this demo built for?",
    answer:
      "Agencies, consultants, SaaS teams, local businesses, and service brands that want a premium creative campaign planning experience."
  },
  {
    question: "Does it include auth and database scaffolding?",
    answer:
      "Yes. Demo auth is included in-app, and the repo ships with a Supabase schema plus a seed script for production-ready persistence later."
  }
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "$39/mo",
    description: "For solo operators building campaign concepts and copy packs fast.",
    features: ["3 active projects", "Campaign builder", "Prompt labs", "Text exports"]
  },
  {
    name: "Studio",
    price: "$99/mo",
    description: "For creative teams packaging campaigns, storyboards, and content calendars together.",
    features: ["Unlimited projects", "Brand visualizer", "Prompt packs", "Workspace analytics"]
  },
  {
    name: "Agency",
    price: "$249/mo",
    description: "For agencies needing white-label settings, client-ready outputs, and future integration hooks.",
    features: ["White-label branding", "Client viewers", "Export center", "Priority support"]
  }
];

export const integrationCards = [
  {
    name: "OpenAI",
    description: "Future LLM provider slot for live prompt and copy generation.",
    status: "Planned"
  },
  {
    name: "Image Generation",
    description: "Reserved for future connection to image platforms once v2 unlocks media generation.",
    status: "Coming soon"
  },
  {
    name: "Video Generation",
    description: "Placeholder for cinematic prompt-to-video workflows and render pipelines.",
    status: "Coming soon"
  },
  {
    name: "Publishing Tools",
    description: "Future export-to-publisher bridges for campaign approvals and scheduling.",
    status: "Connected later"
  },
  {
    name: "Social Schedulers",
    description: "Planned sync points for social calendar handoff and multi-channel queues.",
    status: "Planned"
  },
  {
    name: "CRM",
    description: "Reserved CRM sync points for contacts, campaign context, and opportunity mapping.",
    status: "Connected later"
  },
  {
    name: "Storage Providers",
    description: "Future attachment and asset sync for briefs, exports, and media placeholders.",
    status: "Planned"
  }
];

export function getPromptPilotProfileById(id: string) {
  return promptPilotProfiles.find((profile) => profile.id === id) ?? null;
}

export function getPromptPilotProfileByEmail(email: string) {
  return (
    promptPilotProfiles.find((profile) => profile.email.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

export function getPromptPilotDemoProfile(role: PromptPilotRole) {
  return promptPilotProfiles.find((profile) => profile.role === role) ?? promptPilotProfiles[0];
}

export function getProjectById(id: string) {
  return promptPilotProjects.find((project) => project.id === id) ?? null;
}

export function getOutputBundleForProject(projectId: string) {
  return (
    promptPilotOutputs.find((bundle) => bundle.projectId === projectId) ?? promptPilotOutputs[0]
  );
}

export function getSearchItems(): SearchItem[] {
  return [
    ...promptPilotProjects.map((project) => ({
      id: project.id,
      label: project.name,
      type: "Project",
      href: "/workspace/projects",
      meta: project.clientName
    })),
    ...promptPilotPromptPacks.map((pack) => ({
      id: pack.id,
      label: pack.name,
      type: "Prompt pack",
      href: "/workspace/prompt-packs",
      meta: pack.type
    })),
    ...promptPilotTemplates.map((template) => ({
      id: template.id,
      label: template.name,
      type: "Template",
      href: "/workspace/templates",
      meta: template.industry
    })),
    ...promptPilotBrandProfiles.map((profile) => ({
      id: profile.id,
      label: profile.name,
      type: "Brand profile",
      href: "/workspace/brand-visualizer",
      meta: profile.industry
    }))
  ];
}

export function getDashboardSnapshot() {
  const readyProjects = promptPilotProjects.filter((project) => project.status === "Ready").length;
  const generatingProjects = promptPilotProjects.filter(
    (project) => project.status === "Generating"
  ).length;
  const favoriteTemplates = promptPilotTemplates.slice(0, 4);
  const recentProjects = [...promptPilotProjects]
    .sort((left, right) => new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime())
    .slice(0, 6);

  return {
    metrics: [
      {
        label: "Projects created",
        value: String(promptPilotProjects.length),
        change: "+5 this week",
        tone: "brand" as const
      },
      {
        label: "Campaigns generated",
        value: String(promptPilotOutputs.length),
        change: `${readyProjects} ready to present`,
        tone: "success" as const
      },
      {
        label: "Prompt packs generated",
        value: String(promptPilotPromptPacks.length),
        change: `${promptPilotPromptPacks.filter((pack) => pack.status === "Shared").length} shared`,
        tone: "brand" as const
      },
      {
        label: "Storyboards generated",
        value: String(promptPilotOutputs.length),
        change: `${generatingProjects} still processing`,
        tone: "warning" as const
      },
      {
        label: "Brand profiles created",
        value: String(promptPilotBrandProfiles.length),
        change: "2 updated today",
        tone: "success" as const
      }
    ],
    recentActivity: promptPilotActivity,
    favoriteTemplates,
    outputDistribution: [
      {
        label: "Campaign",
        value: promptPilotProjects.filter((project) => project.preferredOutput.includes("Campaign")).length + 4
      },
      {
        label: "Prompt",
        value: promptPilotProjects.filter((project) => project.preferredOutput.includes("Prompt")).length + 3
      },
      {
        label: "Content",
        value: promptPilotProjects.filter((project) => project.preferredOutput.includes("Content")).length + 2
      },
      {
        label: "Brand",
        value: promptPilotBrandProfiles.length
      }
    ],
    recentProjects,
    quickActions: [
      { label: "Start campaign builder", href: "/workspace/campaign-builder" },
      { label: "Open storyboard studio", href: "/workspace/storyboards" },
      { label: "Review output workspace", href: "/workspace/outputs" },
      { label: "Browse templates", href: "/workspace/templates" }
    ]
  };
}

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  const templateUsage = promptPilotTemplates.map((template) => ({
    label: template.name.replace(" Campaign", "").replace(" Pack", ""),
    value: promptPilotProjects.filter((project) => project.templateId === template.id).length
  }));

  const platformMap = new Map<string, number>();
  promptPilotProjects.forEach((project) => {
    platformMap.set(project.platform, (platformMap.get(project.platform) ?? 0) + 1);
  });

  const typeMap = new Map<string, number>();
  promptPilotPromptPacks.forEach((pack) => {
    typeMap.set(pack.type, (typeMap.get(pack.type) ?? 0) + 1);
  });

  const industryMap = new Map<string, number>();
  promptPilotProjects.forEach((project) => {
    industryMap.set(project.industry, (industryMap.get(project.industry) ?? 0) + 1);
  });

  return {
    metrics: [
      {
        label: "Most-used template",
        value: templateUsage.sort((left, right) => right.value - left.value)[0]?.label ?? "Real Estate",
        change: "Used across 2 active projects",
        tone: "brand"
      },
      {
        label: "Most-used platform",
        value: [...platformMap.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? "Instagram",
        change: "Lead channel for current workspace",
        tone: "success"
      },
      {
        label: "Prompt packs generated",
        value: String(promptPilotPromptPacks.length),
        change: "4 exported this week",
        tone: "brand"
      },
      {
        label: "Campaign types tracked",
        value: String(industryMap.size),
        change: "Across service, SaaS, and local business verticals",
        tone: "warning"
      }
    ],
    templateUsage,
    platformUsage: [...platformMap.entries()].map(([label, value]) => ({ label, value })),
    outputCategoryUsage: [...typeMap.entries()].map(([label, value]) => ({ label, value })),
    campaignTypeUsage: [...industryMap.entries()].map(([label, value]) => ({ label, value }))
  };
}

export function getProjectsForRole(role: PromptPilotRole) {
  if (role === "viewer") {
    return promptPilotProjects.filter((project) => !project.archived);
  }

  return promptPilotProjects;
}

export function getProjectInput(projectId: string): CampaignInput {
  const project = getProjectById(projectId) ?? promptPilotProjects[0];
  return toCampaignInput(project);
}

export function getPackById(id: string) {
  return promptPilotPromptPacks.find((pack) => pack.id === id) ?? null;
}

export function getBrandProfileById(id: string) {
  return promptPilotBrandProfiles.find((profile) => profile.id === id) ?? null;
}

export function getUpcomingExports() {
  return promptPilotPromptPacks
    .filter((pack) => pack.status !== "Draft")
    .slice(0, 5)
    .map((pack, index) => ({
      id: `export-${pack.id}`,
      title: `${pack.name} Summary`,
      project: getProjectById(pack.projectId)?.name ?? "Project",
      format: index % 2 === 0 ? "PDF preview" : "TXT export",
      scheduledFor: addDays(baseDate, index).toISOString()
    }));
}
