import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPromptPilotSessionValue,
  promptPilotAuthCookieName
} from "@/lib/promptpilot-auth";
import { getSessionCookieOptions } from "@/lib/cookie-options";
import { getPromptPilotDemoProfile } from "@/lib/promptpilot-data";

const schema = z.object({
  role: z.enum(["admin", "team_member", "viewer"])
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid demo role." }, { status: 400 });
  }

  const profile = getPromptPilotDemoProfile(parsed.data.role);
  const response = NextResponse.json({
    redirectTo: "/workspace"
  });

  response.cookies.set(
    promptPilotAuthCookieName,
    createPromptPilotSessionValue(profile),
    getSessionCookieOptions()
  );

  return response;
}

