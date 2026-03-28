import { LandingCopyStudio } from "@/components/promptpilot/brand-content-studios";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { promptPilotProjects } from "@/lib/promptpilot-data";

export default function LandingCopyPage() {
  requirePromptPilotEditor();
  const project = promptPilotProjects[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Landing page copy"
        title="Generate landing page blocks"
        description="Create headlines, subheadlines, benefits, CTA variations, proof ideas, and FAQ prompts."
      />
      <LandingCopyStudio
        defaults={{
          businessName: project.businessName,
          productService: project.productService,
          audience: project.audience,
          offer: project.offer,
          tone: project.tone,
          primaryGoal: project.goal
        }}
      />
    </div>
  );
}

