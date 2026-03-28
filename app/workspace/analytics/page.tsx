import { AnalyticsOverview } from "@/components/promptpilot/workspace-admin";
import { PageHeader } from "@/components/shared/page-header";
import { getAnalyticsSnapshot } from "@/lib/promptpilot-data";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Track how the studio is being used"
        description="Monitor template usage, platform preference, prompt pack generation, and campaign category distribution."
      />
      <AnalyticsOverview snapshot={getAnalyticsSnapshot()} />
    </div>
  );
}

