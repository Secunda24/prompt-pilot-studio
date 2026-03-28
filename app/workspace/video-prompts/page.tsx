import { VideoPromptLabStudio } from "@/components/promptpilot/prompt-labs";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { getProjectInput, promptPilotProjects } from "@/lib/promptpilot-data";

export default function VideoPromptsPage() {
  requirePromptPilotEditor();
  const input = getProjectInput(promptPilotProjects[0].id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Video prompt lab"
        title="Generate cinematic video prompts"
        description="Create prompt structures for cinematic, product-demo, and social-ad workflows using internal templates and seeded logic."
      />
      <VideoPromptLabStudio
        defaults={{
          productService: input.productService,
          campaignAngle: input.campaignObjective,
          style: input.visualStyle,
          duration: "15-30 seconds",
          cameraFeel: "Confident handheld with smooth push-ins",
          motionType: "Purposeful movement",
          emotionalTone: input.tone,
          ctaType: input.ctaPreference
        }}
      />
    </div>
  );
}

