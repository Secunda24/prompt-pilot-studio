import type { PromptPilotRole } from "@/lib/promptpilot-types";

export type PromptPilotNavIcon =
  | "sparkles"
  | "layout-dashboard"
  | "briefcase"
  | "clapperboard"
  | "image"
  | "video"
  | "palette"
  | "calendar"
  | "file-text"
  | "package"
  | "folder"
  | "blocks"
  | "panel-top"
  | "download"
  | "bar-chart"
  | "settings"
  | "plug";

export interface PromptPilotNavItem {
  label: string;
  href: string;
  icon: PromptPilotNavIcon;
  roles?: PromptPilotRole[];
}

const workspaceItems: PromptPilotNavItem[] = [
  {
    label: "Dashboard",
    href: "/workspace",
    icon: "layout-dashboard"
  },
  {
    label: "Campaign Builder",
    href: "/workspace/campaign-builder",
    icon: "sparkles",
    roles: ["admin", "team_member"]
  },
  {
    label: "Storyboard Builder",
    href: "/workspace/storyboards",
    icon: "clapperboard",
    roles: ["admin", "team_member"]
  },
  {
    label: "Image Prompt Lab",
    href: "/workspace/image-prompts",
    icon: "image",
    roles: ["admin", "team_member"]
  },
  {
    label: "Video Prompt Lab",
    href: "/workspace/video-prompts",
    icon: "video",
    roles: ["admin", "team_member"]
  },
  {
    label: "Brand Visualizer",
    href: "/workspace/brand-visualizer",
    icon: "palette",
    roles: ["admin", "team_member"]
  },
  {
    label: "Content Calendar",
    href: "/workspace/content-calendar",
    icon: "calendar",
    roles: ["admin", "team_member"]
  },
  {
    label: "Landing Copy",
    href: "/workspace/landing-copy",
    icon: "file-text",
    roles: ["admin", "team_member"]
  },
  {
    label: "Prompt Packs",
    href: "/workspace/prompt-packs",
    icon: "package"
  },
  {
    label: "Projects",
    href: "/workspace/projects",
    icon: "folder"
  },
  {
    label: "Templates",
    href: "/workspace/templates",
    icon: "blocks"
  },
  {
    label: "Output Workspace",
    href: "/workspace/outputs",
    icon: "panel-top"
  },
  {
    label: "Export Center",
    href: "/workspace/export-center",
    icon: "download"
  },
  {
    label: "Analytics",
    href: "/workspace/analytics",
    icon: "bar-chart"
  },
  {
    label: "Settings",
    href: "/workspace/settings",
    icon: "settings",
    roles: ["admin"]
  },
  {
    label: "Integrations",
    href: "/workspace/integrations",
    icon: "plug",
    roles: ["admin", "team_member"]
  }
];

export function getPromptPilotWorkspaceNav(role: PromptPilotRole) {
  return workspaceItems.filter((item) => !item.roles || item.roles.includes(role));
}

export const promptPilotMarketingNav = [
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Examples", href: "/#examples" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" }
];
