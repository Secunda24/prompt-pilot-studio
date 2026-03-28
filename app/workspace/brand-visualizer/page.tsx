import { BrandVisualizerStudio } from "@/components/promptpilot/brand-content-studios";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { promptPilotProjects } from "@/lib/promptpilot-data";

export default function BrandVisualizerPage() {
  requirePromptPilotEditor();
  const project = promptPilotProjects[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Brand visualizer"
        title="Shape the creative strategist layer"
        description="Define tone, visual identity, typography mood, color systems, and brand-safe messaging rules."
      />
      <BrandVisualizerStudio
        defaults={{
          industry: project.industry,
          brandPersonality: project.tone,
          colorPreference: "Elevated contrast with controlled accent color",
          targetAudience: project.audience,
          marketPosition: "Premium but approachable",
          contentStyle: "Editorial conversion system"
        }}
      />
    </div>
  );
}

