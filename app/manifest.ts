import type { MetadataRoute } from "next";

import { getPromptPilotBrandingSettings } from "@/lib/promptpilot-branding";

export default function manifest(): MetadataRoute.Manifest {
  const branding = getPromptPilotBrandingSettings();

  return {
    name: branding.portalName,
    short_name: branding.logoPlaceholder,
    description: "Premium no-API AI campaign studio demo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#14b8a6",
    icons: []
  };
}

