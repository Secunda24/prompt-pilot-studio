"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Download, RefreshCcw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { copyTextToClipboard, downloadTextFile } from "@/components/promptpilot/client-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import type { ImagePromptOutput, VideoPromptOutput } from "@/lib/promptpilot-types";

const imageSchema = z.object({
  brandStyle: z.string().min(2),
  subject: z.string().min(2),
  mood: z.string().min(2),
  lighting: z.string().min(2),
  colorStyle: z.string().min(2),
  composition: z.string().min(2),
  platform: z.string().min(2),
  realismLevel: z.string().min(2)
});

const videoSchema = z.object({
  productService: z.string().min(2),
  campaignAngle: z.string().min(2),
  style: z.string().min(2),
  duration: z.string().min(2),
  cameraFeel: z.string().min(2),
  motionType: z.string().min(2),
  emotionalTone: z.string().min(2),
  ctaType: z.string().min(2)
});

type ImageFormValues = z.infer<typeof imageSchema>;
type VideoFormValues = z.infer<typeof videoSchema>;

export function ImagePromptLabStudio({ defaults }: { defaults: ImageFormValues }) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<ImagePromptOutput>(() => generator.generateImagePrompts(defaults));
  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: defaults
  });

  function onSubmit(values: ImageFormValues) {
    setResult(generator.generateImagePrompts(values));
  }

  function rotateMood() {
    const current = form.getValues();
    const mood =
      current.mood === "Premium and editorial"
        ? "Warm and cinematic"
        : current.mood === "Warm and cinematic"
          ? "Bold and commercial"
          : "Premium and editorial";
    form.setValue("mood", mood);
    setResult(generator.generateImagePrompts({ ...current, mood }));
  }

  const text = result.prompts
    .map(
      (prompt) =>
        `${prompt.title}\nShort: ${prompt.shortPrompt}\nAdvanced: ${prompt.advancedPrompt}\nVariation: ${prompt.variationPrompt}`
    )
    .join("\n\n");

  return (
    <StudioLayout
      form={
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Brand style" id="brandStyle" register={form.register} />
            <Field label="Subject" id="subject" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mood" id="mood" register={form.register} />
            <Field label="Lighting" id="lighting" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Color style" id="colorStyle" register={form.register} />
            <Field label="Composition" id="composition" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Platform" id="platform" register={form.register} />
            <Field label="Realism level" id="realismLevel" register={form.register} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Generate prompts</Button>
            <Button type="button" variant="outline" onClick={rotateMood}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Shift visual mood
            </Button>
          </div>
        </form>
      }
      output={
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Prompt output</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                High-quality prompt directions only. No image generation happens in v1.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => copyTextToClipboard(text, "Image prompts")}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => downloadTextFile("image-prompts.txt", text)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.prompts.map((prompt) => (
              <Card key={prompt.title} className="border-border/70 bg-background/60">
                <CardHeader>
                  <CardTitle className="text-base">{prompt.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <PromptBlock label="Short prompt" value={prompt.shortPrompt} />
                  <PromptBlock label="Advanced prompt" value={prompt.advancedPrompt} />
                  <PromptBlock label="Variation prompt" value={prompt.variationPrompt} />
                </CardContent>
              </Card>
            ))}
            <Card className="border-border/70 bg-background/60">
              <CardHeader>
                <CardTitle className="text-base">Alternate visual directions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.alternateDirections.map((direction) => (
                  <div key={direction} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                    {direction}
                  </div>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      }
    />
  );
}

export function VideoPromptLabStudio({ defaults }: { defaults: VideoFormValues }) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<VideoPromptOutput>(() => generator.generateVideoPrompts(defaults));
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: defaults
  });

  function onSubmit(values: VideoFormValues) {
    setResult(generator.generateVideoPrompts(values));
  }

  function rotateCameraFeel() {
    const current = form.getValues();
    const cameraFeel =
      current.cameraFeel === "Confident handheld with smooth push-ins"
        ? "Locked-off premium product framing"
        : current.cameraFeel === "Locked-off premium product framing"
          ? "Agile social camera energy"
          : "Confident handheld with smooth push-ins";
    form.setValue("cameraFeel", cameraFeel);
    setResult(generator.generateVideoPrompts({ ...current, cameraFeel }));
  }

  const text = [
    `Cinematic prompt\n${result.cinematicPrompt}`,
    `Product demo prompt\n${result.productDemoPrompt}`,
    `Social ad prompt\n${result.socialAdPrompt}`,
    `Alternate hooks\n${result.alternateHookVersions.map((hook) => `- ${hook}`).join("\n")}`,
    `Text overlays\n${result.textOverlayIdeas.map((overlay) => `- ${overlay}`).join("\n")}`
  ].join("\n\n");

  return (
    <StudioLayout
      form={
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product or service" id="productService" register={form.register} />
            <Field label="Campaign angle" id="campaignAngle" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Style" id="style" register={form.register} />
            <Field label="Duration" id="duration" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Camera feel" id="cameraFeel" register={form.register} />
            <Field label="Motion type" id="motionType" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Emotional tone" id="emotionalTone" register={form.register} />
            <Field label="CTA type" id="ctaType" register={form.register} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Generate video prompts</Button>
            <Button type="button" variant="outline" onClick={rotateCameraFeel}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Change camera feel
            </Button>
          </div>
        </form>
      }
      output={
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Video prompt output</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Structured prompt directions for cinematic workflows, product demos, and social ads.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => copyTextToClipboard(text, "Video prompts")}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => downloadTextFile("video-prompts.txt", text)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <PromptCard title="Short cinematic prompt" value={result.cinematicPrompt} />
            <PromptCard title="Product demo prompt" value={result.productDemoPrompt} />
            <PromptCard title="Social ad prompt" value={result.socialAdPrompt} />
            <Card className="border-border/70 bg-background/60">
              <CardHeader>
                <CardTitle className="text-base">Alternate hooks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.alternateHookVersions.map((hook) => (
                  <div key={hook} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                    {hook}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-border/70 bg-background/60">
              <CardHeader>
                <CardTitle className="text-base">Text overlay ideas</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {result.textOverlayIdeas.map((overlay) => (
                  <div key={overlay} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                    {overlay}
                  </div>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      }
    />
  );
}

function StudioLayout({
  form,
  output
}: {
  form: ReactNode;
  output: ReactNode;
}) {
  return <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">{form}{output}</div>;
}

function Field({
  label,
  id,
  register
}: {
  label: string;
  id: keyof ImageFormValues | keyof VideoFormValues;
  register: UseFormRegister<any>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...register(id)} />
    </div>
  );
}

function PromptBlock({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">{value}</div>
    </div>
  );
}

function PromptCard({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="border-border/70 bg-background/60">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
