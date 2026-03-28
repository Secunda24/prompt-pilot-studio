import { IntegrationsGrid } from "@/components/promptpilot/workspace-admin";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { integrationCards } from "@/lib/promptpilot-data";

export default function IntegrationsPage() {
  requirePromptPilotEditor();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrations"
        title="Future connection points for the studio"
        description="Show prospects where live LLMs, image tools, video engines, schedulers, CRMs, and storage providers will connect later."
      />
      <IntegrationsGrid integrations={integrationCards} />
    </div>
  );
}
