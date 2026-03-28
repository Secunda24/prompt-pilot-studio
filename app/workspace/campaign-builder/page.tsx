import { CampaignBuilderStudio } from "@/components/promptpilot/campaign-builder";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { getProjectInput, promptPilotProjects } from "@/lib/promptpilot-data";

export default function CampaignBuilderPage() {
  requirePromptPilotEditor();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Concept-to-campaign engine"
        title="Campaign builder"
        description="Start with the business brief, then generate structured concepts, hooks, messaging pillars, and CTA options."
      />
      <CampaignBuilderStudio defaults={getProjectInput(promptPilotProjects[0].id)} />
    </div>
  );
}

