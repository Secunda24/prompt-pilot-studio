"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Clapperboard,
  Download,
  FileText,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Package2,
  Palette,
  PanelsTopLeft,
  PlugZap,
  Search,
  Settings2,
  Sparkles,
  Video
} from "lucide-react";

import { ModeToggle } from "@/components/layout/mode-toggle";
import { SiteLogo } from "@/components/shared/site-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { PromptPilotViewer } from "@/lib/promptpilot-auth";
import type { PromptPilotNotification, SearchItem } from "@/lib/promptpilot-types";
import type { PromptPilotNavIcon, PromptPilotNavItem } from "@/lib/promptpilot-navigation";
import { cn, formatRelativeDate } from "@/lib/utils";

const navIcons: Record<PromptPilotNavIcon, typeof LayoutDashboard> = {
  "bar-chart": BarChart3,
  blocks: Blocks,
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  clapperboard: Clapperboard,
  download: Download,
  folder: FolderKanban,
  "file-text": FileText,
  image: ImageIcon,
  "layout-dashboard": LayoutDashboard,
  package: Package2,
  palette: Palette,
  "panel-top": PanelsTopLeft,
  plug: PlugZap,
  settings: Settings2,
  sparkles: Sparkles,
  video: Video
};

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(1)
    .map((segment) =>
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (value) => value.toUpperCase())
    );

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/workspace" className="transition hover:text-foreground">
        Workspace
      </Link>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={index === segments.length - 1 ? "text-foreground" : undefined}>
            {segment}
          </span>
        </span>
      ))}
    </div>
  );
}

function SearchPalette({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return items
      .filter((item) =>
        `${item.label} ${item.type} ${item.meta ?? ""}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .slice(0, 6);
  }, [items, query]);

  return (
    <div className="relative w-full max-w-lg">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search projects, prompt packs, templates, brand profiles..."
        className="h-12 rounded-2xl border-border/70 bg-background/70 pl-11"
      />
      {results.length ? (
        <div className="absolute top-full z-40 mt-3 w-full rounded-[1.5rem] border border-border/70 bg-popover/95 p-2 shadow-card backdrop-blur-xl">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.href}
              className="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-accent/70"
              onClick={() => setQuery("")}
            >
              <div>
                <p className="font-medium">{result.label}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {result.type}
                </p>
              </div>
              {result.meta ? (
                <span className="text-xs text-muted-foreground">{result.meta}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NotificationBell({ items }: { items: PromptPilotNotification[] }) {
  const unreadCount = items.filter((item) => item.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount ? (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[360px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.slice(0, 6).map((item) => (
          <DropdownMenuItem key={item.id} className="block space-y-1 py-3">
            <div className="flex items-start justify-between gap-4">
              <p className="font-medium">{item.title}</p>
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(item.createdAt)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function roleLabel(role: PromptPilotViewer["profile"]["role"]) {
  switch (role) {
    case "admin":
      return "Admin";
    case "team_member":
      return "Team Member";
    default:
      return "Viewer";
  }
}

function ProfileMenu({
  viewer,
  supportEmail
}: {
  viewer: PromptPilotViewer;
  supportEmail?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-left transition hover:border-brand/30">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{viewer.profile.avatar}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{viewer.profile.fullName}</p>
            <p className="text-xs text-muted-foreground">{viewer.profile.title}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="space-y-2">
            <p>{viewer.profile.fullName}</p>
            <div className="flex items-center gap-2">
              <Badge variant="accent">{roleLabel(viewer.profile.role)}</Badge>
              <span className="text-[11px] font-normal normal-case tracking-normal text-muted-foreground">
                {viewer.workspace.name}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {supportEmail ? (
          <DropdownMenuItem asChild>
            <a href={`mailto:${supportEmail}`}>Support: {supportEmail}</a>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({
  items,
  viewer,
  portalName,
  logoPlaceholder
}: {
  items: PromptPilotNavItem[];
  viewer: PromptPilotViewer;
  portalName: string;
  logoPlaceholder: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      <SiteLogo
        name={portalName}
        mark={logoPlaceholder}
        eyebrow={viewer.workspace.companyName}
      />
      <div className="space-y-1.5">
        {items.map((item) => {
          const Icon = navIcons[item.icon];
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto rounded-[1.75rem] border border-brand/10 bg-brand-soft/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Demo workspace
        </p>
        <p className="mt-2 text-sm font-semibold">{viewer.workspace.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {viewer.workspace.plan} plan - {viewer.workspace.seatCount} seats
        </p>
      </div>
    </div>
  );
}

export function PromptPilotWorkspaceShell({
  viewer,
  branding,
  navItems,
  searchItems,
  notifications,
  children
}: {
  viewer: PromptPilotViewer;
  branding: {
    portalName: string;
    workspaceName: string;
    logoPlaceholder: string;
    supportEmail?: string;
  };
  navItems: PromptPilotNavItem[];
  searchItems: SearchItem[];
  notifications: PromptPilotNotification[];
  children: ReactNode;
}) {
  return (
    <div className="container py-4 sm:py-6">
      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="surface hidden h-[calc(100vh-2rem)] rounded-[2rem] p-6 lg:block">
          <SidebarContent
            items={navItems}
            viewer={viewer}
            portalName={branding.portalName}
            logoPlaceholder={branding.logoPlaceholder}
          />
        </aside>
        <div className="space-y-6">
          <header className="surface rounded-[2rem] p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="left-0 top-0 h-full max-w-sm translate-x-0 translate-y-0 rounded-none border-r p-6 sm:max-w-sm">
                    <SidebarContent
                      items={navItems}
                      viewer={viewer}
                      portalName={branding.portalName}
                      logoPlaceholder={branding.logoPlaceholder}
                    />
                  </DialogContent>
                </Dialog>
                <SiteLogo
                  name={branding.portalName}
                  mark={branding.logoPlaceholder}
                  eyebrow={branding.workspaceName}
                />
              </div>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-3">
                  <Breadcrumbs />
                  <SearchPalette items={searchItems} />
                </div>
                <div className="flex items-center justify-between gap-2 xl:justify-end">
                  <div className="flex items-center gap-1">
                    <NotificationBell items={notifications} />
                    <ModeToggle />
                  </div>
                  <ProfileMenu viewer={viewer} supportEmail={branding.supportEmail} />
                </div>
              </div>
            </div>
          </header>
          <main className="space-y-6 pb-24">{children}</main>
        </div>
      </div>
    </div>
  );
}
