import "dotenv/config";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  getUpcomingExports,
  promptPilotActivity,
  promptPilotBrandProfiles,
  promptPilotDemoCredentials,
  promptPilotNotifications,
  promptPilotOutputs,
  promptPilotProfiles,
  promptPilotProjects,
  promptPilotPromptPacks,
  promptPilotTemplates,
  promptPilotWorkspace
} from "@/lib/promptpilot-data";
import { promptPilotEnv } from "@/lib/promptpilot-env";

async function main() {
  if (!promptPilotEnv.supabaseUrl || !promptPilotEnv.supabaseServiceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const supabase = createClient(
    promptPilotEnv.supabaseUrl,
    promptPilotEnv.supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const authMap = await ensureDemoUsers(supabase);
  const branding = {
    portalName: promptPilotEnv.appName,
    workspaceName: promptPilotEnv.workspaceName,
    companyName: promptPilotEnv.companyName,
    logoPlaceholder: promptPilotEnv.logoPlaceholder,
    accentHsl: promptPilotEnv.accentHsl,
    supportEmail: promptPilotEnv.supportEmail,
    defaultTone: promptPilotEnv.defaultTone,
    defaultPlatform: promptPilotEnv.defaultPlatform,
    defaultCtaStyle: promptPilotEnv.defaultCtaStyle
  };

  await upsert(supabase, "workspaces", [promptPilotWorkspace]);
  await upsert(supabase, "settings", [
    {
      id: "settings-1",
      workspace_id: promptPilotWorkspace.id,
      portal_name: branding.portalName,
      workspace_name: branding.workspaceName,
      company_name: branding.companyName,
      logo_placeholder: branding.logoPlaceholder,
      accent_hsl: branding.accentHsl,
      support_email: branding.supportEmail,
      default_tone: branding.defaultTone,
      default_platform: branding.defaultPlatform,
      default_cta_style: branding.defaultCtaStyle,
      future_api_settings: {
        openai: "disabled",
        image: "disabled",
        video: "disabled",
        publishing: "disabled"
      }
    }
  ]);

  await upsert(supabase, "profiles", promptPilotProfiles.map((profile) => ({
    id: profile.id,
    auth_user_id: authMap.get(profile.email) ?? null,
    workspace_id: profile.workspaceId,
    full_name: profile.fullName,
    email: profile.email,
    title: profile.title,
    avatar: profile.avatar,
    role: profile.role
  })));

  await upsert(supabase, "templates", promptPilotTemplates.map((template) => ({
    id: template.id,
    workspace_id: promptPilotWorkspace.id,
    name: template.name,
    industry: template.industry,
    summary: template.summary,
    best_for: template.bestFor,
    deliverables: template.deliverables,
    style_preset: template.stylePreset,
    platform_focus: template.platformFocus,
    category: template.category
  })));

  await upsert(supabase, "projects", promptPilotProjects.map((project) => ({
    id: project.id,
    workspace_id: project.workspaceId,
    template_id: project.templateId ?? null,
    name: project.name,
    client_name: project.clientName,
    industry: project.industry,
    business_type: project.businessType,
    business_name: project.businessName,
    product_service: project.productService,
    audience: project.audience,
    goal: project.goal,
    platform: project.platform,
    tone: project.tone,
    offer: project.offer,
    preferred_output: project.preferredOutput,
    owner_name: project.owner,
    description: project.description,
    tags: project.tags,
    favorite: project.favorite,
    archived: project.archived,
    status: project.status
  })));

  await upsert(supabase, "campaigns", promptPilotOutputs.map((bundle, index) => ({
    id: `campaign-${index + 1}`,
    workspace_id: promptPilotWorkspace.id,
    project_id: bundle.projectId,
    input_payload: {
      source: "mock-generator",
      stylePreset: bundle.stylePreset
    },
    output_payload: bundle.campaign,
    summary: bundle.campaign.valuePropositionSummary
  })));

  await upsert(supabase, "storyboards", promptPilotOutputs.map((bundle, index) => ({
    id: `storyboard-${index + 1}`,
    workspace_id: promptPilotWorkspace.id,
    project_id: bundle.projectId,
    output_payload: bundle.storyboard
  })));

  await upsert(supabase, "image_prompts", promptPilotOutputs.map((bundle, index) => ({
    id: `image-prompts-${index + 1}`,
    workspace_id: promptPilotWorkspace.id,
    project_id: bundle.projectId,
    output_payload: bundle.imagePrompts
  })));

  await upsert(supabase, "video_prompts", promptPilotOutputs.map((bundle, index) => ({
    id: `video-prompts-${index + 1}`,
    workspace_id: promptPilotWorkspace.id,
    project_id: bundle.projectId,
    output_payload: bundle.videoPrompts
  })));

  await upsert(supabase, "content_calendars", promptPilotOutputs.map((bundle, index) => ({
    id: `calendar-${index + 1}`,
    workspace_id: promptPilotWorkspace.id,
    project_id: bundle.projectId,
    output_payload: bundle.contentCalendar
  })));

  await upsert(supabase, "brand_profiles", promptPilotBrandProfiles.map((profile) => ({
    id: profile.id,
    workspace_id: profile.workspaceId,
    project_id:
      promptPilotProjects.find((project) => project.clientName === profile.name.replace(" Brand System", ""))?.id ??
      null,
    name: profile.name,
    industry: profile.industry,
    personality: profile.personality,
    audience: profile.audience,
    content_style: profile.contentStyle,
    color_system: profile.colorSystem,
    tone_summary: profile.toneSummary,
    messaging_rules: profile.messagingRules,
    typography_mood: profile.typographyMood
  })));

  await upsert(supabase, "prompt_packs", promptPilotPromptPacks.map((pack) => ({
    id: pack.id,
    workspace_id: pack.workspaceId,
    project_id: pack.projectId,
    name: pack.name,
    pack_type: pack.type,
    owner_name: pack.owner,
    sections: pack.sections,
    status: pack.status,
    exported_at: pack.exportedAt ?? null
  })));

  await upsert(supabase, "exports", getUpcomingExports().map((item) => ({
    id: item.id,
    workspace_id: promptPilotWorkspace.id,
    project_id: promptPilotProjects.find((project) => project.name === item.project)?.id ?? null,
    title: item.title,
    export_type: item.format,
    payload: item
  })));

  await upsert(supabase, "notifications", promptPilotNotifications.map((notification) => ({
    id: notification.id,
    workspace_id: promptPilotWorkspace.id,
    profile_id: null,
    title: notification.title,
    description: notification.description,
    unread: notification.unread,
    audience: notification.audience
  })));

  await upsert(supabase, "activity_logs", promptPilotActivity.map((item) => ({
    id: item.id,
    workspace_id: promptPilotWorkspace.id,
    profile_id: null,
    project_id: null,
    category: item.category,
    title: item.title,
    detail: item.detail,
    created_at: item.createdAt
  })));

  console.log("PromptPilot Studio demo seed complete.");
}

async function ensureDemoUsers(
  supabase: SupabaseClient
) {
  const credentials = [
    promptPilotDemoCredentials.admin,
    promptPilotDemoCredentials.team_member,
    promptPilotDemoCredentials.viewer
  ];

  const existing = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });

  if (existing.error) {
    throw existing.error;
  }

  const authMap = new Map<string, string>();

  for (const credential of credentials) {
    const found = existing.data.users.find(
      (user) => user.email?.toLowerCase() === credential.email.toLowerCase()
    );

    if (found?.id) {
      authMap.set(credential.email, found.id);
      continue;
    }

    const created = await supabase.auth.admin.createUser({
      email: credential.email,
      password: credential.password,
      email_confirm: true
    });

    if (created.error) {
      throw created.error;
    }

    if (created.data.user?.id) {
      authMap.set(credential.email, created.data.user.id);
    }
  }

  return authMap;
}

async function upsert(
  supabase: SupabaseClient,
  table: string,
  rows: object[]
) {
  const { error } = await supabase.from(table).upsert(rows, {
    onConflict: "id"
  });

  if (error) {
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
