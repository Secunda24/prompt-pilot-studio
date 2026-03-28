"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Copy, Download, Star } from "lucide-react";
import { toast } from "sonner";

import { downloadTextFile, linesToText } from "@/components/promptpilot/client-utils";
import { DataTable } from "@/components/tables/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PromptPack, PromptPilotProject, PromptPilotTemplate } from "@/lib/promptpilot-types";
import { formatDate } from "@/lib/utils";

export function PromptPackLibrary({ packs }: { packs: PromptPack[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {packs.map((pack) => (
        <Card key={pack.id}>
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{pack.name}</CardTitle>
              <Badge variant={pack.status === "Ready" ? "success" : pack.status === "Shared" ? "accent" : "warning"}>
                {pack.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {pack.type} pack - Updated {formatDate(pack.updatedAt, "MMM d")}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {pack.sections.map((section) => (
                <Badge key={section} variant="neutral">
                  {section}
                </Badge>
              ))}
            </div>
            <div className="grid gap-2">
              <Button variant="outline" onClick={() => toast.success(`Duplicated ${pack.name}.`)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="outline" onClick={() => toast.success(`Rename flow opened for ${pack.name}.`)}>
                Rename
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  downloadTextFile(
                    `${pack.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`,
                    linesToText(pack.name, pack.sections)
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Export pack
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

type ProjectRow = PromptPilotProject & { statusLabel: string };

export function ProjectLibrary({ projects }: { projects: PromptPilotProject[] }) {
  const [archivedIds, setArchivedIds] = useState<string[]>([]);

  const rows = useMemo<ProjectRow[]>(
    () =>
      projects
        .filter((project) => !archivedIds.includes(project.id))
        .map((project) => ({
          ...project,
          statusLabel: project.status
        })),
    [archivedIds, projects]
  );

  const columns = useMemo<ColumnDef<ProjectRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Project",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.clientName}</p>
          </div>
        )
      },
      {
        accessorKey: "industry",
        header: "Industry"
      },
      {
        accessorKey: "platform",
        header: "Platform"
      },
      {
        accessorKey: "owner",
        header: "Owner"
      },
      {
        accessorKey: "statusLabel",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "Ready" ? "success" : row.original.status === "Generating" ? "warning" : "neutral"}>
            {row.original.status}
          </Badge>
        )
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href="/workspace/outputs">Open</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success(`Duplicated ${row.original.name}.`)}
            >
              Duplicate
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Archive project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This keeps the project out of the active demo table without deleting its generated outputs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setArchivedIds((current) => [...current, row.original.id]);
                      toast.success(`${row.original.name} archived.`);
                    }}
                  >
                    Archive project
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    ],
    [projects]
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchKey="name"
      placeholder="Search projects, clients, or campaign names..."
    />
  );
}

export function TemplateLibrary({ templates }: { templates: PromptPilotTemplate[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <Badge variant="accent">{template.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{template.summary}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Best for:</span> {template.bestFor}</p>
              <p><span className="font-medium text-foreground">Style:</span> {template.stylePreset}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.deliverables.map((item) => (
                <Badge key={item} variant="neutral">
                  {item}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/workspace/campaign-builder">Use template</Link>
              </Button>
              <Button variant="outline" onClick={() => toast.success(`${template.name} added to favorites.`)}>
                <Star className="mr-2 h-4 w-4" />
                Favorite
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ExportCenterView({
  exports
}: {
  exports: Array<{ id: string; title: string; project: string; format: string; scheduledFor: string }>;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming export queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exports.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.project}</p>
                </div>
                <Badge variant="accent">{item.format}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Scheduled for {formatDate(item.scheduledFor, "MMM d, yyyy")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>PDF-style preview page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-[2rem] border border-border/70 bg-background/60 p-6 shadow-soft">
            <div className="space-y-3 border-b border-border/70 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">PromptPilot Studio</p>
              <h3 className="font-display text-3xl font-semibold">Campaign Summary Preview</h3>
              <p className="text-sm text-muted-foreground">
                A polished export-ready summary page for demos, pitches, and client handoff.
              </p>
            </div>
            <div className="grid gap-4 py-6 md:grid-cols-2">
              {[
                "Campaign concepts and value proposition",
                "Storyboard summary and key beats",
                "Prompt lab directions",
                "Landing copy and CTA options"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                downloadTextFile(
                  "campaign-summary-preview.txt",
                  "PromptPilot Studio\n\nCampaign Summary Preview\n\n- Campaign concepts\n- Storyboard summary\n- Prompt lab directions\n- Landing copy and CTA options"
                )
              }
            >
              Download preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
