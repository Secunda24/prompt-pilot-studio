"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    toast.success("Sales enquiry submitted. In the demo, this is captured as a polished placeholder flow.");
  }

  return (
    <main className="container py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <span className="eyebrow">Contact</span>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Pitch PromptPilot Studio with confidence</h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Use this page as the sales CTA surface for agencies, in-house growth teams, and businesses that want campaign concepts and prompt packs on demand.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
              <p className="font-semibold">Sales CTA</p>
              <p className="mt-2 text-sm text-muted-foreground">Book a walkthrough, request a white-label build, or discuss future API integrations.</p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
              <p className="font-semibold">Demo-ready positioning</p>
              <p className="mt-2 text-sm text-muted-foreground">Show prospects a premium creative workflow without the complexity of live model costs in v1.</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request a sales demo</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" id="fullName" />
                <Field label="Company" id="company" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Work email" id="email" type="email" />
                <Field label="Team size" id="teamSize" />
              </div>
              <Field label="What do you want to create?" id="goal" />
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} placeholder="Tell us about the demo, industry, or client presentation you need to support." />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Contact sales"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Field({
  label,
  id,
  type = "text"
}: {
  label: string;
  id: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} />
    </div>
  );
}
