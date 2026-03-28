import { NextResponse } from "next/server";
import { z } from "zod";

import { getClientCookieOptions } from "@/lib/cookie-options";
import { promptPilotBrandingCookieName } from "@/lib/promptpilot-branding";

const schema = z.object({
  portalName: z.string().min(2),
  workspaceName: z.string().min(2),
  companyName: z.string().min(2),
  logoPlaceholder: z.string().min(1),
  accentHsl: z.string().min(3),
  supportEmail: z.string().email(),
  defaultTone: z.string().min(2),
  defaultPlatform: z.string().min(2),
  defaultCtaStyle: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid branding settings." }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    promptPilotBrandingCookieName,
    JSON.stringify(parsed.data),
    getClientCookieOptions()
  );

  return response;
}

