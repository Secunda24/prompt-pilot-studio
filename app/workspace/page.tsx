import { PromptPilotDashboard } from "@/components/promptpilot/dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { getDashboardSnapshot } from "@/lib/promptpilot-data";

export default function WorkspacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Studio dashboard"
        title="PromptPilot overview"
        description="Track generated projects, prompt packs, storyboards, brand profiles, and recent workspace activity."
      />
      <PromptPilotDashboard snapshot={getDashboardSnapshot()} />
    </div>
  );
}

