import { PromptPackLibrary } from "@/components/promptpilot/workspace-library";
import { PageHeader } from "@/components/shared/page-header";
import { promptPilotPromptPacks } from "@/lib/promptpilot-data";

export default function PromptPacksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Prompt packs"
        title="Bundle outputs into reusable packs"
        description="Duplicate, rename, export, and present reusable campaign, image, video, content, and launch packs."
      />
      <PromptPackLibrary packs={promptPilotPromptPacks} />
    </div>
  );
}

