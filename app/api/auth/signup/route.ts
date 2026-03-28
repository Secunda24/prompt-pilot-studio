import { NextResponse } from "next/server";
import { z } from "zod";

import {
  buildCustomSignupProfile,
  createCustomPromptPilotProfileValue,
  createPromptPilotSessionValue,
  promptPilotAuthCookieName,
  promptPilotCustomProfileCookieName
} from "@/lib/promptpilot-auth";
import { getClientCookieOptions, getSessionCookieOptions } from "@/lib/cookie-options";

const schema = z
  .object({
    fullName: z.string().min(2),
    companyName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match."
  });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid signup payload." }, { status: 400 });
  }

  const profile = buildCustomSignupProfile({
    fullName: parsed.data.fullName,
    email: parsed.data.email
  });
  const response = NextResponse.json({
    redirectTo: "/workspace"
  });

  response.cookies.set(
    promptPilotAuthCookieName,
    createPromptPilotSessionValue(profile),
    getSessionCookieOptions()
  );
  response.cookies.set(
    promptPilotCustomProfileCookieName,
    createCustomPromptPilotProfileValue(profile),
    getClientCookieOptions()
  );

  return response;
}

