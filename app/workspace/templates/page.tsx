import { TemplateLibrary } from "@/components/promptpilot/workspace-library";
import { PageHeader } from "@/components/shared/page-header";
import { promptPilotTemplates } from "@/lib/promptpilot-data";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Template library"
        title="Start from proven campaign frameworks"
        description="Use industry templates for real estate, accounting, field services, hospitality, retail, SaaS, agencies, and more."
      />
      <TemplateLibrary templates={promptPilotTemplates} />
    </div>
  );
}

