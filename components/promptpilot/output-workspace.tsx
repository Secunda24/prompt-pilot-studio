"use client";

import { Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { copyTextToClipboard, downloadTextFile, linesToText } from "@/components/promptpilot/client-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectInput, getProjectById, promptPilotProjects } from "@/lib/promptpilot-data";
import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import type { OutputBundle } from "@/lib/promptpilot-types";

const stylePresets = [
  "Architectural editorial",
  "Editorial cinematic",
  "Executive clarity",
  "Future-facing product polish"
];

export function OutputWorkspace({
  initialProjectId
}: {
  initialProjectId?: string;
}) {
  const generator = getPromptPilotGenerator();
  const [projectId, setProjectId] = useState(initialProjectId ?? promptPilotProjects[0].id);
  const [stylePreset, setStylePreset] = useState(stylePresets[0]);

  const project = getProjectById(projectId) ?? promptPilotProjects[0];
  const input = getProjectInput(project.id);
  const bundle: OutputBundle = {
    ...generator.generateBundle({
      ...input,
      visualStyle: stylePreset
    }),
    projectId: project.id,
    id: `bundle-${project.id}-${stylePreset.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    stylePreset
  };

  function rotateStyle() {
    const currentIndex = stylePresets.indexOf(stylePreset);
    const nextStyle = stylePresets[(currentIndex + 1) % stylePresets.length];
    setStylePreset(nextStyle);
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-brand/15 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,253,250,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,rgba(8,12,24,0.98),rgba(15,23,42,0.95))]">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Output workspace</CardTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Review every generated deliverable for a project in one premium, client-ready surface.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {promptPilotProjects.slice(0, 4).map((item) => (
              <Button
                key={item.id}
                type="button"
                size="sm"
                variant={projectId === item.id ? "default" : "outline"}
                onClick={() => setProjectId(item.id)}
              >
                {item.clientName}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{project.name}</p>
            <p className="text-sm text-muted-foreground">
              {project.clientName} - {project.platform} - {bundle.stylePreset}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={rotateStyle}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Regenerate preset
            </Button>
            <Button type="button" variant="outline" onClick={() => copyTextToClipboard(workspaceText(bundle), "Workspace bundle")}>
              <Copy className="mr-2 h-4 w-4" />
              Copy bundle
            </Button>
            <Button type="button" variant="outline" onClick={() => downloadTextFile("workspace-bundle.txt", workspaceText(bundle))}>
              <Download className="mr-2 h-4 w-4" />
              Export text
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="campaign" className="space-y-4">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {[
            ["campaign", "Campaign"],
            ["storyboard", "Storyboard"],
            ["image", "Image Prompts"],
            ["video", "Video Prompts"],
            ["copy", "Copy Pack"],
            ["calendar", "Content Calendar"],
            ["brand", "Brand Direction"]
          ].map(([value, label]) => (
            <TabsTrigger key={value} value={value} className="rounded-full border border-border/70 px-4 py-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="campaign">
          <Card>
            <CardHeader>
              <CardTitle>Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bundle.campaign.concepts.map((concept) => (
                <Card key={concept.title} className="border-border/70 bg-background/60">
                  <CardHeader>
                    <CardTitle className="text-base">{concept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>{concept.summary}</p>
                    <p><span className="font-medium text-foreground">Hero angle:</span> {concept.heroAngle}</p>
                    <p><span className="font-medium text-foreground">Channel strategy:</span> {concept.channelStrategy}</p>
                  </CardContent>
                </Card>
              ))}
              <GridList title="Ad hooks" items={bundle.campaign.adHooks} />
              <GridList title="CTA ideas" items={bundle.campaign.ctaIdeas} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storyboard">
          <Card>
            <CardHeader>
              <CardTitle>Storyboard</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              {bundle.storyboard.fiveSceneConcept.map((scene) => (
                <div key={scene.sceneNumber} className="rounded-2xl border border-border/70 p-4 text-sm">
                  <p className="font-semibold">{scene.title}</p>
                  <p className="mt-2 text-muted-foreground">{scene.shotDescription}</p>
                  <p className="mt-2"><span className="font-medium">Overlay:</span> {scene.textOverlay}</p>
                  <p className="mt-2"><span className="font-medium">Voiceover:</span> {scene.voiceover}</p>
                  <p className="mt-2"><span className="font-medium">Transition:</span> {scene.transition}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bundle.imagePrompts.prompts.map((prompt) => (
                <Card key={prompt.title} className="border-border/70 bg-background/60">
                  <CardHeader>
                    <CardTitle className="text-base">{prompt.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Short:</span> {prompt.shortPrompt}</p>
                    <p><span className="font-medium text-foreground">Advanced:</span> {prompt.advancedPrompt}</p>
                    <p><span className="font-medium text-foreground">Variation:</span> {prompt.variationPrompt}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextSection title="Short cinematic prompt" value={bundle.videoPrompts.cinematicPrompt} />
              <TextSection title="Product demo prompt" value={bundle.videoPrompts.productDemoPrompt} />
              <TextSection title="Social ad prompt" value={bundle.videoPrompts.socialAdPrompt} />
              <GridList title="Alternate hook versions" items={bundle.videoPrompts.alternateHookVersions} />
              <GridList title="Text overlay ideas" items={bundle.videoPrompts.textOverlayIdeas} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copy">
          <Card>
            <CardHeader>
              <CardTitle>Copy pack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextSection title="Headline" value={bundle.landingCopy.headline} />
              <TextSection title="Subheadline" value={bundle.landingCopy.subheadline} />
              <GridList title="Benefits" items={bundle.landingCopy.benefits} />
              <GridList title="Feature blurbs" items={bundle.landingCopy.featureBlurbs} />
              <GridList title="CTA variations" items={bundle.landingCopy.ctaVariations} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Content calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <GridList title="Campaign sequence" items={bundle.contentCalendar.campaignSequence} />
              <Card className="border-border/70 bg-background/60">
                <CardHeader>
                  <CardTitle className="text-base">7-day plan</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {bundle.contentCalendar.sevenDayPlan.map((day) => (
                    <div key={day.day} className="rounded-2xl border border-border/70 p-4 text-sm">
                      <p className="font-semibold">{day.day}</p>
                      <p className="mt-2 text-muted-foreground">{day.theme}</p>
                      <p className="mt-2"><span className="font-medium">Format:</span> {day.format}</p>
                      <p className="mt-2"><span className="font-medium">Hook:</span> {day.hook}</p>
                      <p className="mt-2"><span className="font-medium">CTA:</span> {day.cta}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Brand direction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextSection title="Brand tone summary" value={bundle.brandDirection.brandToneSummary} />
              <TextSection title="Visual identity direction" value={bundle.brandDirection.visualIdentityDirection} />
              <TextSection title="Campaign look-and-feel" value={bundle.brandDirection.campaignLookAndFeel} />
              <GridList title="Suggested color systems" items={bundle.brandDirection.suggestedColorSystem} />
              <GridList title="Typography mood" items={bundle.brandDirection.typographyMood} />
              <GridList title="Brand-safe messaging rules" items={bundle.brandDirection.brandSafeMessagingRules} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function workspaceText(bundle: OutputBundle) {
  return [
    linesToText("Campaign hooks", bundle.campaign.adHooks),
    linesToText("CTA ideas", bundle.campaign.ctaIdeas),
    linesToText("Brand-safe messaging rules", bundle.brandDirection.brandSafeMessagingRules),
    linesToText("Text overlay ideas", bundle.videoPrompts.textOverlayIdeas)
  ].join("\n\n");
}

function GridList({
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
      <CardContent className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function TextSection({
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
