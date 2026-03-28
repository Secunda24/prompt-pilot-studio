import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingTiers } from "@/lib/promptpilot-data";

export default function PricingPage() {
  return (
    <main className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="eyebrow">Pricing</span>
        <h1 className="font-display text-5xl font-semibold tracking-tight">Demo pricing built to feel real</h1>
        <p className="text-muted-foreground">
          Position PromptPilot Studio as a premium creative operating system for businesses, agencies, and growth teams.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className={tier.name === "Studio" ? "border-brand/30 shadow-card" : undefined}>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{tier.name}</CardTitle>
                {tier.name === "Studio" ? <span className="eyebrow">Popular</span> : null}
              </div>
              <p className="font-display text-4xl font-semibold">{tier.price}</p>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-border/70 px-4 py-3 text-sm">
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="w-full" asChild>
                <Link href="/signup">Choose {tier.name}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

