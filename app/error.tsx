"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <span className="eyebrow">Something went wrong</span>
      <h1 className="font-display text-4xl font-semibold tracking-tight">The studio hit an unexpected snag</h1>
      <p className="max-w-xl text-muted-foreground">
        Try the page again. If it persists, refresh the workspace and continue from the latest generated output.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}

