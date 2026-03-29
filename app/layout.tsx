import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import { Providers } from "@/components/shared/providers";
import { getPromptPilotBrandingSettings } from "@/lib/promptpilot-branding";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const branding = getPromptPilotBrandingSettings();
  return {
    title: `${branding.portalName} | Premium Campaign Studio Demo`,
    description:
      "PromptPilot Studio turns ideas into campaigns, prompts, storyboards, landing copy, and creative direction for modern businesses.",
    manifest: "/manifest.webmanifest"
  };
}

export const viewport: Viewport = {
  themeColor: "#14b8a6"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const branding = getPromptPilotBrandingSettings();
  const style = {
    "--brand": branding.accentHsl
  } as CSSProperties;

  return (
    <html lang="en" suppressHydrationWarning style={style}>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
