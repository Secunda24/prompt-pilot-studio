import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-display text-5xl font-semibold tracking-tight">This route drifted off the brief</h1>
      <p className="max-w-xl text-muted-foreground">
        Head back to PromptPilot Studio and open one of the live demo surfaces.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/workspace">Open workspace</Link>
        </Button>
      </div>
    </main>
  );
}

