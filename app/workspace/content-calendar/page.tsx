import { ContentCalendarStudio } from "@/components/promptpilot/brand-content-studios";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotEditor } from "@/lib/promptpilot-auth";
import { promptPilotProjects } from "@/lib/promptpilot-data";

export default function ContentCalendarPage() {
  requirePromptPilotEditor();
  const project = promptPilotProjects[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content planner"
        title="Generate campaign calendars"
        description="Build 7-day and 30-day plans with daily themes, formats, hooks, and CTA suggestions."
      />
      <ContentCalendarStudio
        defaults={{
          businessType: project.businessType,
          audience: project.audience,
          campaignTheme: project.name,
          primaryPlatform: project.platform,
          cadence: "5 posts per week",
          offer: project.offer
        }}
      />
    </div>
  );
}

