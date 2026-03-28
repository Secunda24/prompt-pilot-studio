import { OutputWorkspace } from "@/components/promptpilot/output-workspace";
import { PageHeader } from "@/components/shared/page-header";

export default function OutputsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Output review"
        title="Review every generated deliverable"
        description="Move through campaign, storyboard, prompt, copy, calendar, and brand tabs in one polished review surface."
      />
      <OutputWorkspace />
    </div>
  );
}
