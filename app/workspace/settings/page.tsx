import { SettingsPanel } from "@/components/promptpilot/workspace-admin";
import { PageHeader } from "@/components/shared/page-header";
import { getPromptPilotBrandingSettings } from "@/lib/promptpilot-branding";
import { requirePromptPilotAdmin } from "@/lib/promptpilot-auth";

export default function SettingsPage() {
  requirePromptPilotAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Configure branding and workspace defaults"
        description="Update naming, accent color, support details, and default campaign preferences. Future API slots stay visible but disabled in v1."
      />
      <SettingsPanel defaults={getPromptPilotBrandingSettings()} />
    </div>
  );
}

