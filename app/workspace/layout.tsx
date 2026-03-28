import type { ReactNode } from "react";

import { PromptPilotWorkspaceShell } from "@/components/promptpilot/workspace-shell";
import { getPromptPilotBrandingSettings } from "@/lib/promptpilot-branding";
import { requirePromptPilotViewer } from "@/lib/promptpilot-auth";
import { getSearchItems, promptPilotNotifications } from "@/lib/promptpilot-data";
import { getPromptPilotWorkspaceNav } from "@/lib/promptpilot-navigation";

export default function WorkspaceLayout({
  children
}: {
  children: ReactNode;
}) {
  const viewer = requirePromptPilotViewer();

  return (
    <PromptPilotWorkspaceShell
      viewer={viewer}
      branding={getPromptPilotBrandingSettings()}
      navItems={getPromptPilotWorkspaceNav(viewer.profile.role)}
      searchItems={getSearchItems()}
      notifications={promptPilotNotifications.filter(
        (item) => item.audience === "all" || item.audience === viewer.profile.role
      )}
    >
      {children}
    </PromptPilotWorkspaceShell>
  );
}

