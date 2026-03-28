import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Film,
  ImageIcon,
  Sparkles
} from "lucide-react";

import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  landingFeatures,
  landingTestimonials,
  outputExamples,
  promptPilotFaqs,
  workflowShowcase
} from "@/lib/promptpilot-data";

export default function MarketingHomePage() {
  return (
    <main>
      <section className="container py-12 sm:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <FadeIn className="space-y-8">
            <span className="eyebrow">Premium AI creative campaign studio</span>
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Turn Ideas Into Campaigns, Prompts, and Creative Direction
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                PromptPilot Studio helps businesses build campaign concepts, storyboard scenes, visual directions, landing copy, and reusable content packs without paid AI APIs in version one.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/login">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                <Link href="/signup">Start Creating</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["20 demo projects", "Seeded with believable industries"],
                ["12 prompt packs", "Ready to duplicate and export"],
                ["15 brand profiles", "Built for presentations"]
              ].map(([title, detail]) => (
                <div key={title} className="rounded-3xl border border-border/70 bg-background/60 p-5">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative rounded-[2rem] border border-white/50 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
              <div className="absolute -left-6 -top-6 hidden rounded-3xl border border-border/70 bg-background/90 p-4 shadow-xl lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Output workspace</p>
                <p className="mt-2 text-2xl font-semibold">7 deliverable tabs</p>
                <p className="text-sm text-muted-foreground">Campaign - storyboard - prompts - copy</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <Card className="overflow-hidden">
                  <CardHeader className="border-b border-border/70 bg-background/70">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand" />
                      Campaign builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5">
                    <div className="rounded-3xl bg-brand p-4 text-brand-foreground">
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-foreground/80">Current brief</p>
                      <p className="mt-2 text-2xl font-semibold">BluePeak Property Group</p>
                      <p className="text-sm text-brand-foreground/80">Luxury property launches - Instagram - seller demand</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Campaign concepts", "3"],
                        ["Ad hooks", "5"],
                        ["CTA ideas", "3"],
                        ["Prompt packs", "2"]
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-3xl border border-border/70 bg-background/60 p-4">
                          <p className="text-sm text-muted-foreground">{label}</p>
                          <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Output types</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {[
                        { label: "Storyboard builder", Icon: Film },
                        { label: "Image prompt lab", Icon: ImageIcon },
                        { label: "Brand visualizer", Icon: BriefcaseBusiness },
                        { label: "Output workspace", Icon: Sparkles }
                      ].map(({ label, Icon }) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-brand" />
                            <span className="text-sm font-medium">{label}</span>
                          </div>
                          <BadgeCheck className="h-4 w-4 text-emerald-500" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Why it demos well</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        ["No API costs", "Structured generation only"],
                        ["White-label ready", "Branding settings included"],
                        ["Protected workspace", "Role-based demo access"],
                        ["Export center", "Client-ready previews"]
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="features" className="container py-12 sm:py-16">
        <FadeIn className="space-y-4 text-center">
          <span className="eyebrow">Feature stack</span>
          <h2 className="section-title">Creative strategy, structured generation, and premium presentation</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            PromptPilot is designed to feel like a commercial AI product from the first screen to the final export.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {landingFeatures.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="workflow" className="container py-12 sm:py-16">
        <div className="rounded-[2rem] border border-border/70 bg-background/70 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="eyebrow">Workflow showcase</span>
              <h2 className="section-title">How a brief becomes a campaign system</h2>
            </div>
            <p className="max-w-2xl text-muted-foreground">
              The flow is intentionally easy to explain in client calls: input the brief, generate structure, review polished outputs, export the pack.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workflowShowcase.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="examples" className="container py-12 sm:py-16">
        <FadeIn className="space-y-4">
          <span className="eyebrow">Output examples</span>
          <h2 className="section-title">The deliverables prospects immediately understand</h2>
        </FadeIn>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {outputExamples.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container py-12 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {landingTestimonials.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.05}>
              <Card className="h-full">
                <CardContent className="space-y-4 p-6">
                  <p className="text-base leading-7 text-muted-foreground">"{item.quote}"</p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="faq" className="container py-12 sm:py-16">
        <FadeIn className="space-y-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">Questions buyers ask before they say yes</h2>
        </FadeIn>
        <div className="mt-8 grid gap-4">
          {promptPilotFaqs.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.04}>
              <Card>
                <CardContent className="space-y-3 p-6">
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
