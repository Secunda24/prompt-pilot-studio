import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPromptPilotSessionValue,
  promptPilotAuthCookieName,
  validatePromptPilotCredentials
} from "@/lib/promptpilot-auth";
import { getSessionCookieOptions } from "@/lib/cookie-options";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  redirectTo: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return undefined;
      }

      return value.trim() ? value : undefined;
    },
    z.string().optional()
  )
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid sign-in payload." }, { status: 400 });
  }

  const profile = validatePromptPilotCredentials(parsed.data.email, parsed.data.password);

  if (!profile) {
    return NextResponse.json(
      { error: "Use one of the included demo credentials for this v1 workspace." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    redirectTo: parsed.data.redirectTo ?? "/workspace"
  });

  response.cookies.set(
    promptPilotAuthCookieName,
    createPromptPilotSessionValue(profile),
    getSessionCookieOptions()
  );

  return response;
}
