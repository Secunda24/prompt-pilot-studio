import { ExportCenterView } from "@/components/promptpilot/workspace-library";
import { PageHeader } from "@/components/shared/page-header";
import { getUpcomingExports } from "@/lib/promptpilot-data";

export default function ExportCenterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Export center"
        title="Prepare handoff-ready campaign summaries"
        description="Generate text exports and PDF-style preview pages for pitch decks, internal review, and client presentations."
      />
      <ExportCenterView exports={getUpcomingExports()} />
    </div>
  );
}

