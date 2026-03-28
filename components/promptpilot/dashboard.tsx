"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, FolderKanban, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PromptPilotActivityItem, PromptPilotProject, PromptPilotTemplate } from "@/lib/promptpilot-types";
import { formatRelativeDate } from "@/lib/utils";

export function PromptPilotDashboard({
  snapshot
}: {
  snapshot: {
    metrics: Array<{ label: string; value: string; change: string; tone: "brand" | "success" | "warning" }>;
    recentActivity: PromptPilotActivityItem[];
    favoriteTemplates: PromptPilotTemplate[];
    outputDistribution: Array<{ label: string; value: number }>;
    recentProjects: PromptPilotProject[];
    quickActions: Array<{ label: string; href: string }>;
  };
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {snapshot.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="space-y-3 pb-3">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <CardTitle className="text-3xl font-semibold">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={metric.tone === "success" ? "success" : metric.tone === "warning" ? "warning" : "accent"}>
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-brand/15 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,253,250,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_30%),linear-gradient(135deg,rgba(8,12,24,0.98),rgba(15,23,42,0.95))]">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge variant="accent">Creative operating system</Badge>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Campaign output velocity at a glance</CardTitle>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  PromptPilot Studio is designed to feel like a premium AI command center, even in no-API demo mode.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-background/70 p-3 text-brand shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Favorite templates
              </p>
              <div className="mt-4 space-y-4">
                {snapshot.favoriteTemplates.map((template) => (
                  <div key={template.id} className="rounded-3xl border border-border/60 bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{template.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{template.summary}</p>
                      </div>
                      <Badge variant="neutral">{template.industry}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm text-brand">{template.stylePreset}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/workspace/templates">
                          Use template
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {snapshot.quickActions.map((action) => (
                    <Button key={action.href} variant="outline" className="justify-between" asChild>
                      <Link href={action.href}>
                        {action.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Output type distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={snapshot.outputDistribution}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={52}
                        outerRadius={82}
                        paddingAngle={3}
                        fill="#14b8a6"
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {snapshot.recentActivity.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border border-border/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{formatRelativeDate(item.createdAt)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshot.recentProjects.map((project) => (
              <div key={project.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-border/70 p-4">
                <div className="space-y-1">
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.clientName} - {project.platform} - {project.goal}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={project.status === "Ready" ? "success" : project.status === "Generating" ? "warning" : "neutral"}>
                    {project.status}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/workspace/outputs">Open output</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Pipeline pulse</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                A quick read of how generated work is distributed across the studio.
              </p>
            </div>
            <FolderKanban className="h-5 w-5 text-brand" />
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={snapshot.outputDistribution}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Studio note</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              This workspace is using deterministic generation, seeded examples, and structured content frameworks in v1.
            </p>
          </div>
          <Clock3 className="h-5 w-5 text-brand" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            That keeps the demo fast, reliable, and presentation-ready today while preserving a clean path to real LLM, image, and video providers later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
