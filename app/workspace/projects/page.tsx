import { ProjectLibrary } from "@/components/promptpilot/workspace-library";
import { PageHeader } from "@/components/shared/page-header";
import { requirePromptPilotViewer } from "@/lib/promptpilot-auth";
import { getProjectsForRole } from "@/lib/promptpilot-data";

export default function ProjectsPage() {
  const viewer = requirePromptPilotViewer();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Project library"
        title="Manage campaign work across clients and verticals"
        description="Sort by campaign type, favorite strong projects, duplicate winning structures, and archive old work with confirmation."
      />
      <ProjectLibrary projects={getProjectsForRole(viewer.profile.role)} />
    </div>
  );
}

