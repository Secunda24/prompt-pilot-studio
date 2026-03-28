import { cookies } from "next/headers";

import { promptPilotEnv } from "@/lib/promptpilot-env";
import type { PromptPilotBrandingSettings } from "@/lib/promptpilot-types";

export const promptPilotBrandingCookieName = "promptpilot-branding";

export function getDefaultPromptPilotBranding(): PromptPilotBrandingSettings {
  return {
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
}

export function getPromptPilotBrandingSettings() {
  const store = cookies();
  const raw = store.get(promptPilotBrandingCookieName)?.value;

  if (!raw) {
    return getDefaultPromptPilotBranding();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PromptPilotBrandingSettings>;
    return {
      ...getDefaultPromptPilotBranding(),
      ...parsed
    } satisfies PromptPilotBrandingSettings;
  } catch {
    return getDefaultPromptPilotBranding();
  }
}
