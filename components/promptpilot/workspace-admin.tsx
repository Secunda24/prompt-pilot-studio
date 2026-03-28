"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import type { ReactElement } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AnalyticsSnapshot, PromptPilotBrandingSettings } from "@/lib/promptpilot-types";

export function AnalyticsOverview({ snapshot }: { snapshot: AnalyticsSnapshot }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Template usage">
          <BarChart data={snapshot.templateUsage}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.18} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Platform usage">
          <PieChart>
            <Pie
              data={snapshot.platformUsage}
              dataKey="value"
              nameKey="label"
              innerRadius={50}
              outerRadius={88}
              paddingAngle={4}
              fill="#f97316"
            />
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Prompt pack category usage">
          <BarChart data={snapshot.outputCategoryUsage}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.18} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#0f766e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Campaign type usage">
          <BarChart data={snapshot.campaignTypeUsage}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.18} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const settingsSchema = z.object({
  portalName: z.string().min(2),
  workspaceName: z.string().min(2),
  companyName: z.string().min(2),
  logoPlaceholder: z.string().min(1),
  accentHsl: z.string().min(3),
  supportEmail: z.string().email(),
  defaultTone: z.string().min(2),
  defaultPlatform: z.string().min(2),
  defaultCtaStyle: z.string().min(2)
});

type SettingsValues = z.infer<typeof settingsSchema>;

export function SettingsPanel({
  defaults
}: {
  defaults: PromptPilotBrandingSettings;
}) {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaults
  });

  async function onSubmit(values: SettingsValues) {
    const response = await fetch("/api/branding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error("Unable to save settings.");
      return;
    }

    toast.success("Branding settings saved. Refresh to see the updated accent and naming.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Branding and workspace settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="App name" id="portalName" register={form.register} />
              <Field label="Workspace name" id="workspaceName" register={form.register} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company name" id="companyName" register={form.register} />
              <Field label="Logo placeholder" id="logoPlaceholder" register={form.register} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Accent color (HSL)" id="accentHsl" register={form.register} />
              <Field label="Support email" id="supportEmail" register={form.register} />
            </div>
            <Field label="Default tone" id="defaultTone" register={form.register} textarea />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Default platform" id="defaultPlatform" register={form.register} />
              <Field label="Default CTA style" id="defaultCtaStyle" register={form.register} />
            </div>
            <Button type="submit">Save settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Future API settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "OpenAI provider slot",
            "Image generation provider",
            "Video generation provider",
            "Social publishing bridge"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{item}</p>
                <Badge variant="warning">Disabled in v1</Badge>
              </div>
              <Input disabled className="mt-3" placeholder="Future connection will appear here" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  id,
  register,
  textarea = false
}: {
  label: string;
  id: keyof SettingsValues;
  register: UseFormRegister<SettingsValues>;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {textarea ? <Textarea id={id} rows={3} {...register(id)} /> : <Input id={id} {...register(id)} />}
    </div>
  );
}

export function IntegrationsGrid({
  integrations
}: {
  integrations: Array<{ name: string; description: string; status: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {integrations.map((integration) => (
        <Card key={integration.name}>
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <Badge variant={integration.status === "Planned" ? "warning" : "accent"}>
                {integration.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled className="w-full">
              Connected later
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
