import { ImagePromptLabStudio } from "@/components/promptpilot/prompt-labs";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { getProjectInput, promptPilotProjects } from "@/lib/promptpilot-data";

export default function ImagePromptsPage() {
  requirePromptPilotEditor();
  const input = getProjectInput(promptPilotProjects[0].id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Image prompt lab"
        title="Generate polished image prompts"
        description="Produce short, advanced, and variation prompts for image-generation workflows without generating media in-app."
      />
      <ImagePromptLabStudio
        defaults={{
          brandStyle: input.visualStyle,
          subject: input.productService,
          mood: "Premium and editorial",
          lighting: "Soft cinematic key light",
          colorStyle: "Controlled brand contrast",
          composition: "Layered focal composition",
          platform: input.platform,
          realismLevel: "Photoreal with art direction"
        }}
      />
    </div>
  );
}

