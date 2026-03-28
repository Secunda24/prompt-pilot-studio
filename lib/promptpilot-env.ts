export const promptPilotEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "PromptPilot Studio",
  workspaceName: process.env.NEXT_PUBLIC_WORKSPACE_NAME ?? "PromptPilot Creative Hub",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "PromptPilot",
  logoPlaceholder: process.env.NEXT_PUBLIC_LOGO_PLACEHOLDER ?? "PP",
  accentHsl: process.env.NEXT_PUBLIC_ACCENT_HSL ?? "174 74% 41%",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@promptpilot.studio",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultTone: process.env.NEXT_PUBLIC_DEFAULT_TONE ?? "Confident, premium, clear",
  defaultPlatform: process.env.NEXT_PUBLIC_DEFAULT_PLATFORM ?? "Instagram",
  defaultCtaStyle: process.env.NEXT_PUBLIC_DEFAULT_CTA_STYLE ?? "Book a strategy call",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  demoAdminEmail: process.env.DEMO_ADMIN_EMAIL ?? "admin@promptpilot.studio",
  demoAdminPassword: process.env.DEMO_ADMIN_PASSWORD ?? "AdminPrompt123!",
  demoTeamEmail: process.env.DEMO_TEAM_EMAIL ?? "team@promptpilot.studio",
  demoTeamPassword: process.env.DEMO_TEAM_PASSWORD ?? "TeamPrompt123!",
  demoViewerEmail: process.env.DEMO_VIEWER_EMAIL ?? "viewer@promptpilot.studio",
  demoViewerPassword: process.env.DEMO_VIEWER_PASSWORD ?? "ViewerPrompt123!"
};

export const isSupabaseConfigured = Boolean(
  promptPilotEnv.supabaseUrl &&
    promptPilotEnv.supabaseAnonKey &&
    promptPilotEnv.supabaseServiceRoleKey
);
