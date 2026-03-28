import { StoryboardBuilderStudio } from "@/components/promptpilot/storyboard-builder";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { getOutputBundleForProject, promptPilotProjects } from "@/lib/promptpilot-data";

export default function StoryboardsPage() {
  requirePromptPilotEditor();
  const project = promptPilotProjects[0];
  const bundle = getOutputBundleForProject(project.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Story-to-media builder"
        title="Storyboard builder"
        description="Turn a campaign concept into scene-based creative direction with overlays, transitions, and narration cues."
      />
      <StoryboardBuilderStudio
        defaults={{
          campaignConcept: bundle.campaign.concepts[0]?.title ?? project.name,
          duration: "30 seconds",
          style: bundle.stylePreset,
          platform: project.platform,
          pacing: "Punchy but premium",
          emotionalTone: project.tone
        }}
      />
    </div>
  );
}

