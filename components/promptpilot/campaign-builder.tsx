"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { copyTextToClipboard, downloadTextFile, linesToText } from "@/components/promptpilot/client-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import type { CampaignOutput } from "@/lib/promptpilot-types";

const schema = z.object({
  businessType: z.string().min(2),
  businessName: z.string().min(2),
  productService: z.string().min(2),
  audience: z.string().min(2),
  platform: z.string().min(2),
  campaignObjective: z.string().min(2),
  offer: z.string().min(2),
  tone: z.string().min(2),
  visualStyle: z.string().min(2),
  ctaPreference: z.string().min(2)
});

type CampaignFormValues = z.infer<typeof schema>;

function sectionText(result: CampaignOutput) {
  return [
    linesToText("Campaign Concepts", result.concepts.map((concept) => `${concept.title}: ${concept.summary}`)),
    linesToText("Ad Hooks", result.adHooks),
    linesToText("CTA Ideas", result.ctaIdeas),
    linesToText("Messaging Pillars", result.messagingPillars),
    linesToText("Audience Pain Points", result.audiencePainPoints),
    `Value Proposition Summary\n\n${result.valuePropositionSummary}`
  ].join("\n\n");
}

export function CampaignBuilderStudio({
  defaults
}: {
  defaults: CampaignFormValues;
}) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<CampaignOutput>(() => generator.generateCampaign(defaults));
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults
  });

  function onSubmit(values: CampaignFormValues) {
    setResult(generator.generateCampaign(values));
  }

  function regenerateWithPreset() {
    const current = form.getValues();
    const rotatedStyle =
      current.visualStyle === "Premium conversion storytelling"
        ? "Editorial cinematic"
        : current.visualStyle === "Editorial cinematic"
          ? "Executive clarity"
          : "Premium conversion storytelling";
    form.setValue("visualStyle", rotatedStyle);
    setResult(generator.generateCampaign({ ...current, visualStyle: rotatedStyle }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader>
          <CardTitle>Campaign brief</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business type" id="businessType" register={form.register} />
              <Field label="Business name" id="businessName" register={form.register} />
            </div>
            <Field label="Product or service" id="productService" register={form.register} />
            <Field label="Audience" id="audience" register={form.register} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Platform" id="platform" register={form.register} />
              <Field label="Campaign objective" id="campaignObjective" register={form.register} />
            </div>
            <Field label="Offer" id="offer" register={form.register} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tone" id="tone" register={form.register} />
              <Field label="Visual style" id="visualStyle" register={form.register} />
            </div>
            <Field label="CTA preference" id="ctaPreference" register={form.register} />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Generate campaign</Button>
              <Button type="button" variant="outline" onClick={regenerateWithPreset}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try new style preset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Generated campaign package</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Structured outputs generated from reusable prompt frameworks and deterministic logic.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyTextToClipboard(sectionText(result), "Campaign pack")}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => downloadTextFile("campaign-pack.txt", sectionText(result))}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <SectionCard
              title="Campaign concepts"
              items={result.concepts.map((concept) => `${concept.title} — ${concept.summary}`)}
            />
            <SectionCard title="Ad hooks" items={result.adHooks} />
            <div className="grid gap-4 md:grid-cols-2">
              <SectionCard title="CTA ideas" items={result.ctaIdeas} />
              <SectionCard title="Messaging pillars" items={result.messagingPillars} />
            </div>
            <SectionCard title="Audience pain points" items={result.audiencePainPoints} />
            <Card className="border-border/70 bg-background/60">
              <CardHeader>
                <CardTitle className="text-base">Unique value proposition summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{result.valuePropositionSummary}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Next step</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Move this campaign into the storyboard and output workspace flow.
              </p>
            </div>
            <Button asChild>
              <Link href="/workspace/outputs">Open output workspace</Link>
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  register
}: {
  label: string;
  id: keyof CampaignFormValues;
  register: UseFormRegister<CampaignFormValues>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {id === "audience" || id === "offer" ? (
        <Textarea id={id} rows={3} {...register(id)} />
      ) : (
        <Input id={id} {...register(id)} />
      )}
    </div>
  );
}

function SectionCard({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="border-border/70 bg-background/60">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
