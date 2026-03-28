import Link from "next/link";

import { SiteLogo } from "@/components/shared/site-logo";
import { getPromptPilotBrandingSettings } from "@/lib/promptpilot-branding";

export function MarketingFooter() {
  const branding = getPromptPilotBrandingSettings();

  return (
    <footer className="border-t border-border/70 py-10">
      <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <SiteLogo
            name={branding.portalName}
            mark={branding.logoPlaceholder}
            eyebrow={branding.workspaceName}
          />
          <p className="max-w-md text-sm text-muted-foreground">
            Premium no-API AI campaign studio demo for concepts, storyboards, prompt packs, brand direction, and content planning.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link href="/#features" className="transition hover:text-foreground">
            Features
          </Link>
          <Link href="/#workflow" className="transition hover:text-foreground">
            Workflow
          </Link>
          <Link href="/#faq" className="transition hover:text-foreground">
            FAQ
          </Link>
          <Link href="/login" className="transition hover:text-foreground">
            View Demo
          </Link>
          {branding.supportEmail ? <span>{branding.supportEmail}</span> : null}
        </div>
      </div>
    </footer>
  );
}
