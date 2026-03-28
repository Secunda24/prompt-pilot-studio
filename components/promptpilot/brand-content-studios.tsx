"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Download, RefreshCcw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { copyTextToClipboard, downloadTextFile, linesToText } from "@/components/promptpilot/client-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPromptPilotGenerator } from "@/lib/promptpilot-generator";
import type {
  BrandDirectionOutput,
  ContentCalendarOutput,
  LandingCopyOutput
} from "@/lib/promptpilot-types";

const brandSchema = z.object({
  industry: z.string().min(2),
  brandPersonality: z.string().min(2),
  colorPreference: z.string().min(2),
  targetAudience: z.string().min(2),
  marketPosition: z.string().min(2),
  contentStyle: z.string().min(2)
});

const calendarSchema = z.object({
  businessType: z.string().min(2),
  audience: z.string().min(2),
  campaignTheme: z.string().min(2),
  primaryPlatform: z.string().min(2),
  cadence: z.string().min(2),
  offer: z.string().min(2)
});

const copySchema = z.object({
  businessName: z.string().min(2),
  productService: z.string().min(2),
  audience: z.string().min(2),
  offer: z.string().min(2),
  tone: z.string().min(2),
  primaryGoal: z.string().min(2)
});

type BrandFormValues = z.infer<typeof brandSchema>;
type CalendarFormValues = z.infer<typeof calendarSchema>;
type CopyFormValues = z.infer<typeof copySchema>;

export function BrandVisualizerStudio({ defaults }: { defaults: BrandFormValues }) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<BrandDirectionOutput>(() => generator.generateBrandDirection(defaults));
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: defaults
  });

  function onSubmit(values: BrandFormValues) {
    setResult(generator.generateBrandDirection(values));
  }

  function rotatePositioning() {
    const current = form.getValues();
    const marketPosition =
      current.marketPosition === "Premium but approachable"
        ? "Bold and category-defining"
        : current.marketPosition === "Bold and category-defining"
          ? "Trusted and reassuring"
          : "Premium but approachable";
    form.setValue("marketPosition", marketPosition);
    setResult(generator.generateBrandDirection({ ...current, marketPosition }));
  }

  const text = [
    `Brand tone summary\n${result.brandToneSummary}`,
    `Visual identity direction\n${result.visualIdentityDirection}`,
    `Campaign look-and-feel\n${result.campaignLookAndFeel}`,
    linesToText("Suggested color systems", result.suggestedColorSystem),
    linesToText("Typography mood", result.typographyMood),
    linesToText("Content themes", result.contentThemes),
    linesToText("Brand-safe messaging rules", result.brandSafeMessagingRules)
  ].join("\n\n");

  return (
    <StudioLayout
      form={
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Industry" id="industry" register={form.register} />
            <Field label="Brand personality" id="brandPersonality" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Color preference" id="colorPreference" register={form.register} />
            <Field label="Target audience" id="targetAudience" register={form.register} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Market position" id="marketPosition" register={form.register} />
            <Field label="Content style" id="contentStyle" register={form.register} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Generate brand direction</Button>
            <Button type="button" variant="outline" onClick={rotatePositioning}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Shift positioning
            </Button>
          </div>
        </form>
      }
      output={
        <OutputCard
          title="Brand direction output"
          description="Use this as the creative strategist layer behind campaign, prompt, and copy generation."
          text={text}
        >
          <SummaryCard title="Brand tone summary" value={result.brandToneSummary} />
          <SummaryCard title="Visual identity direction" value={result.visualIdentityDirection} />
          <SummaryCard title="Campaign look-and-feel" value={result.campaignLookAndFeel} />
          <GridListCard title="Suggested color systems" items={result.suggestedColorSystem} />
          <GridListCard title="Typography mood" items={result.typographyMood} />
          <GridListCard title="Content themes" items={result.contentThemes} />
          <GridListCard title="Brand-safe messaging rules" items={result.brandSafeMessagingRules} />
        </OutputCard>
      }
    />
  );
}

export function ContentCalendarStudio({ defaults }: { defaults: CalendarFormValues }) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<ContentCalendarOutput>(() => generator.generateContentCalendar(defaults));
  const form = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarSchema),
    defaultValues: defaults
  });

  function onSubmit(values: CalendarFormValues) {
    setResult(generator.generateContentCalendar(values));
  }

  function rotateCadence() {
    const current = form.getValues();
    const cadence =
      current.cadence === "5 posts per week"
        ? "3 posts plus 2 story beats"
        : current.cadence === "3 posts plus 2 story beats"
          ? "Daily campaign sprint"
          : "5 posts per week";
    form.setValue("cadence", cadence);
    setResult(generator.generateContentCalendar({ ...current, cadence }));
  }

  const text = [
    linesToText("Campaign sequence", result.campaignSequence),
    linesToText(
      "7-day plan",
      result.sevenDayPlan.map((day) => `${day.day}: ${day.theme} / ${day.format} / ${day.hook} / ${day.cta}`)
    ),
    linesToText(
      "30-day plan",
      result.thirtyDayPlan.map((day) => `${day.day}: ${day.theme} / ${day.format}`)
    )
  ].join("\n\n");

  return (
    <StudioLayout
      form={
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Business type" id="businessType" register={form.register} />
            <Field label="Audience" id="audience" register={form.register} />
          </div>
          <Field label="Campaign theme" id="campaignTheme" register={form.register} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary platform" id="primaryPlatform" register={form.register} />
            <Field label="Cadence" id="cadence" register={form.register} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="offer">Offer</Label>
            <Textarea id="offer" rows={3} {...form.register("offer")} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Generate content calendar</Button>
            <Button type="button" variant="outline" onClick={rotateCadence}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Change cadence
            </Button>
          </div>
        </form>
      }
      output={
        <OutputCard
          title="Calendar output"
          description="A campaign planner designed to feel presentation-ready on day one."
          text={text}
        >
          <GridListCard title="Campaign sequence" items={result.campaignSequence} />
          <Card className="border-border/70 bg-background/60">
            <CardHeader>
              <CardTitle className="text-base">7-day content plan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {result.sevenDayPlan.map((day) => (
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
          <Card className="border-border/70 bg-background/60">
            <CardHeader>
              <CardTitle className="text-base">30-day content plan snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {result.thirtyDayPlan.slice(0, 10).map((day) => (
                <div key={day.day} className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{day.day}:</span> {day.theme} - {day.format}
                </div>
              ))}
            </CardContent>
          </Card>
        </OutputCard>
      }
    />
  );
}

export function LandingCopyStudio({ defaults }: { defaults: CopyFormValues }) {
  const generator = getPromptPilotGenerator();
  const [result, setResult] = useState<LandingCopyOutput>(() => generator.generateLandingCopy(defaults));
  const form = useForm<CopyFormValues>({
    resolver: zodResolver(copySchema),
    defaultValues: defaults
  });

  function onSubmit(values: CopyFormValues) {
    setResult(generator.generateLandingCopy(values));
  }

  function rotateTone() {
    const current = form.getValues();
    const tone =
      current.tone === "Confident, premium, clear"
        ? "Warm, polished, persuasive"
        : current.tone === "Warm, polished, persuasive"
          ? "Direct, executive, modern"
          : "Confident, premium, clear";
    form.setValue("tone", tone);
    setResult(generator.generateLandingCopy({ ...current, tone }));
  }

  const text = [
    `Headline\n${result.headline}`,
    `Subheadline\n${result.subheadline}`,
    linesToText("Benefits", result.benefits),
    linesToText("Feature blurbs", result.featureBlurbs),
    linesToText("CTA variations", result.ctaVariations),
    linesToText("Proof section ideas", result.proofSectionIdeas),
    linesToText("FAQ prompts", result.faqPrompts)
  ].join("\n\n");

  return (
    <StudioLayout
      form={
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Business name" id="businessName" register={form.register} />
            <Field label="Product or service" id="productService" register={form.register} />
          </div>
          <Field label="Audience" id="audience" register={form.register} />
          <Field label="Offer" id="offer" register={form.register} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tone" id="tone" register={form.register} />
            <Field label="Primary goal" id="primaryGoal" register={form.register} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Generate landing copy</Button>
            <Button type="button" variant="outline" onClick={rotateTone}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Rotate tone preset
            </Button>
          </div>
        </form>
      }
      output={
        <OutputCard
          title="Landing page copy"
          description="Structured copy blocks for a polished landing page draft."
          text={text}
        >
          <SummaryCard title="Headline" value={result.headline} />
          <SummaryCard title="Subheadline" value={result.subheadline} />
          <GridListCard title="Benefits" items={result.benefits} />
          <GridListCard title="Feature blurbs" items={result.featureBlurbs} />
          <GridListCard title="CTA variations" items={result.ctaVariations} />
          <GridListCard title="Proof section ideas" items={result.proofSectionIdeas} />
          <GridListCard title="FAQ prompts" items={result.faqPrompts} />
        </OutputCard>
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

function OutputCard({
  title,
  description,
  text,
  children
}: {
  title: string;
  description: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => copyTextToClipboard(text, title)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => downloadTextFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`, text)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function Field({
  label,
  id,
  register
}: {
  label: string;
  id: keyof BrandFormValues | keyof CalendarFormValues | keyof CopyFormValues;
  register: UseFormRegister<any>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...register(id)} />
    </div>
  );
}

function SummaryCard({
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

function GridListCard({
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
