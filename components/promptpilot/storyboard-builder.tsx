"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { copyTextToClipboard, downloadTextFile } from "@/components/promptpilot/client-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import type { StoryboardOutput } from "@/lib/promptpilot-types";

const schema = z.object({
  campaignConcept: z.string().min(2),
  duration: z.string().min(2),
  style: z.string().min(2),
  platform: z.string().min(2),
  pacing: z.string().min(2),
  emotionalTone: z.string().min(2)
});

type StoryboardFormValues = z.infer<typeof schema>;

function outputToText(output: StoryboardOutput) {
  function lines(label: string, scenes: StoryboardOutput["threeSceneConcept"]) {
    return `${label}\n\n${scenes
      .map(
        (scene) =>
          `${scene.sceneNumber}. ${scene.title}\nShot: ${scene.shotDescription}\nOverlay: ${scene.textOverlay}\nVoiceover: ${scene.voiceover}\nTransition: ${scene.transition}\nGoal: ${scene.goal}`
      )
      .join("\n\n")}`;
  }

  return [
    lines("3-scene concept", output.threeSceneConcept),
    lines("5-scene concept", output.fiveSceneConcept),
    lines("10-scene concept", output.tenSceneConcept)
  ].join("\n\n");
}

export function StoryboardBuilderStudio({
  defaults
}: {
  defaults: StoryboardFormValues;
}) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<StoryboardOutput>(() => generator.generateStoryboard(defaults));
  const form = useForm<StoryboardFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults
  });

  function onSubmit(values: StoryboardFormValues) {
    setResult(generator.generateStoryboard(values));
  }

  function regeneratePacing() {
    const current = form.getValues();
    const pacing =
      current.pacing === "Punchy but premium"
        ? "Measured and cinematic"
        : current.pacing === "Measured and cinematic"
          ? "Fast social tempo"
          : "Punchy but premium";
    form.setValue("pacing", pacing);
    setResult(generator.generateStoryboard({ ...current, pacing }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Storyboard inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="campaignConcept">Campaign concept</Label>
              <Textarea id="campaignConcept" rows={4} {...form.register("campaignConcept")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Duration" id="duration" register={form.register} />
              <Field label="Style" id="style" register={form.register} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Platform" id="platform" register={form.register} />
              <Field label="Pacing" id="pacing" register={form.register} />
            </div>
            <Field label="Emotional tone" id="emotionalTone" register={form.register} />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Generate storyboard</Button>
              <Button type="button" variant="outline" onClick={regeneratePacing}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Adjust pacing preset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Scene-based creative direction</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              PromptPilot expands one concept into multiple production-ready scene structures.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => copyTextToClipboard(outputToText(result), "Storyboard")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => downloadTextFile("storyboard.txt", outputToText(result))}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <SceneColumn title="3-scene concept" scenes={result.threeSceneConcept} />
          <SceneColumn title="5-scene concept" scenes={result.fiveSceneConcept} />
          <SceneColumn title="10-scene concept" scenes={result.tenSceneConcept.slice(0, 5)} compact />
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  id,
  register
}: {
  label: string;
  id: keyof StoryboardFormValues;
  register: UseFormRegister<StoryboardFormValues>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...register(id)} />
    </div>
  );
}

function SceneColumn({
  title,
  scenes,
  compact = false
}: {
  title: string;
  scenes: StoryboardOutput["threeSceneConcept"];
  compact?: boolean;
}) {
  return (
    <Card className="border-border/70 bg-background/60">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {scenes.map((scene) => (
          <div key={`${title}-${scene.sceneNumber}`} className="rounded-2xl border border-border/70 p-4">
            <p className="font-semibold">{scene.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{scene.shotDescription}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="font-medium">Overlay:</span> {scene.textOverlay}</p>
              <p><span className="font-medium">Voiceover:</span> {scene.voiceover}</p>
              {!compact ? <p><span className="font-medium">Transition:</span> {scene.transition}</p> : null}
              <p><span className="font-medium">Goal:</span> {scene.goal}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
