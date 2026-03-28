export type PromptPilotRole = "admin" | "team_member" | "viewer";

export interface PromptPilotBrandingSettings {
  portalName: string;
  workspaceName: string;
  companyName: string;
  logoPlaceholder: string;
  accentHsl: string;
  supportEmail: string;
  defaultTone: string;
  defaultPlatform: string;
  defaultCtaStyle: string;
}

export interface PromptPilotWorkspace {
  id: string;
  name: string;
  slug: string;
  plan: "Starter" | "Studio" | "Agency";
  seatCount: number;
  companyName: string;
  accentHsl: string;
}

export interface PromptPilotProfile {
  id: string;
  workspaceId: string;
  fullName: string;
  email: string;
  title: string;
  avatar: string;
  role: PromptPilotRole;
}

export interface PromptPilotNotification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  unread: boolean;
  audience: PromptPilotRole | "all";
}

export interface PromptPilotActivityItem {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  category:
    | "campaign"
    | "storyboard"
    | "prompt_pack"
    | "brand_profile"
    | "project"
    | "export";
}

export type PromptPilotProjectStatus =
  | "Draft"
  | "Generating"
  | "Review"
  | "Ready"
  | "Archived";

export interface PromptPilotProject {
  id: string;
  workspaceId: string;
  name: string;
  clientName: string;
  industry: string;
  businessType: string;
  businessName: string;
  productService: string;
  audience: string;
  goal: string;
  platform: string;
  tone: string;
  offer: string;
  preferredOutput: string;
  status: PromptPilotProjectStatus;
  owner: string;
  lastUpdated: string;
  description: string;
  tags: string[];
  favorite: boolean;
  archived: boolean;
  templateId?: string;
}

export interface PromptPilotTemplate {
  id: string;
  name: string;
  industry: string;
  summary: string;
  bestFor: string;
  deliverables: string[];
  stylePreset: string;
  platformFocus: string[];
  category: "Launch" | "Lead Gen" | "Local Growth" | "Awareness" | "Retention";
}

export interface PromptPilotBrandProfile {
  id: string;
  workspaceId: string;
  name: string;
  industry: string;
  personality: string;
  audience: string;
  contentStyle: string;
  colorSystem: string[];
  toneSummary: string;
  messagingRules: string[];
  typographyMood: string[];
  lastUpdated: string;
}

export interface PromptPack {
  id: string;
  workspaceId: string;
  projectId: string;
  name: string;
  type: "Campaign" | "Image Prompt" | "Video Prompt" | "Content" | "Launch";
  sections: string[];
  owner: string;
  status: "Ready" | "Draft" | "Shared";
  createdAt: string;
  updatedAt: string;
  exportedAt?: string;
}

export interface SearchItem {
  id: string;
  label: string;
  type: string;
  href: string;
  meta?: string;
}

export interface CampaignInput {
  businessType: string;
  businessName: string;
  productService: string;
  audience: string;
  platform: string;
  campaignObjective: string;
  offer: string;
  tone: string;
  visualStyle: string;
  ctaPreference: string;
}

export interface CampaignConcept {
  title: string;
  summary: string;
  heroAngle: string;
  channelStrategy: string;
}

export interface CampaignOutput {
  concepts: CampaignConcept[];
  adHooks: string[];
  ctaIdeas: string[];
  messagingPillars: string[];
  audiencePainPoints: string[];
  valuePropositionSummary: string;
}

export interface StoryboardInput {
  campaignConcept: string;
  duration: string;
  style: string;
  platform: string;
  pacing: string;
  emotionalTone: string;
}

export interface StoryboardScene {
  sceneNumber: number;
  title: string;
  shotDescription: string;
  textOverlay: string;
  voiceover: string;
  transition: string;
  goal: string;
}

export interface StoryboardOutput {
  threeSceneConcept: StoryboardScene[];
  fiveSceneConcept: StoryboardScene[];
  tenSceneConcept: StoryboardScene[];
}

export interface ImagePromptInput {
  brandStyle: string;
  subject: string;
  mood: string;
  lighting: string;
  colorStyle: string;
  composition: string;
  platform: string;
  realismLevel: string;
}

export interface ImagePromptVariation {
  title: string;
  shortPrompt: string;
  advancedPrompt: string;
  variationPrompt: string;
}

export interface ImagePromptOutput {
  prompts: ImagePromptVariation[];
  alternateDirections: string[];
}

export interface VideoPromptInput {
  productService: string;
  campaignAngle: string;
  style: string;
  duration: string;
  cameraFeel: string;
  motionType: string;
  emotionalTone: string;
  ctaType: string;
}

export interface VideoPromptOutput {
  cinematicPrompt: string;
  productDemoPrompt: string;
  socialAdPrompt: string;
  alternateHookVersions: string[];
  textOverlayIdeas: string[];
}

export interface BrandVisualizerInput {
  industry: string;
  brandPersonality: string;
  colorPreference: string;
  targetAudience: string;
  marketPosition: string;
  contentStyle: string;
}

export interface BrandDirectionOutput {
  brandToneSummary: string;
  visualIdentityDirection: string;
  campaignLookAndFeel: string;
  suggestedColorSystem: string[];
  typographyMood: string[];
  contentThemes: string[];
  brandSafeMessagingRules: string[];
}

export interface ContentCalendarInput {
  businessType: string;
  audience: string;
  campaignTheme: string;
  primaryPlatform: string;
  cadence: string;
  offer: string;
}

export interface CalendarDayPlan {
  day: string;
  theme: string;
  format: string;
  hook: string;
  cta: string;
}

export interface ContentCalendarOutput {
  sevenDayPlan: CalendarDayPlan[];
  thirtyDayPlan: CalendarDayPlan[];
  campaignSequence: string[];
}

export interface LandingCopyInput {
  businessName: string;
  productService: string;
  audience: string;
  offer: string;
  tone: string;
  primaryGoal: string;
}

export interface LandingCopyOutput {
  headline: string;
  subheadline: string;
  benefits: string[];
  featureBlurbs: string[];
  ctaVariations: string[];
  proofSectionIdeas: string[];
  faqPrompts: string[];
}

export interface OutputBundle {
  id: string;
  projectId: string;
  stylePreset: string;
  updatedAt: string;
  campaign: CampaignOutput;
  storyboard: StoryboardOutput;
  imagePrompts: ImagePromptOutput;
  videoPrompts: VideoPromptOutput;
  brandDirection: BrandDirectionOutput;
  contentCalendar: ContentCalendarOutput;
  landingCopy: LandingCopyOutput;
}

export interface AnalyticsMetricCard {
  label: string;
  value: string;
  change: string;
  tone: "brand" | "success" | "warning";
}

export interface AnalyticsSnapshot {
  metrics: AnalyticsMetricCard[];
  templateUsage: Array<{ label: string; value: number }>;
  platformUsage: Array<{ label: string; value: number }>;
  outputCategoryUsage: Array<{ label: string; value: number }>;
  campaignTypeUsage: Array<{ label: string; value: number }>;
}
