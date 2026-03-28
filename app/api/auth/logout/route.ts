import { NextResponse } from "next/server";

import {
  promptPilotAuthCookieName,
  promptPilotCustomProfileCookieName
} from "@/lib/promptpilot-auth";
import { getClientCookieOptions, getSessionCookieOptions } from "@/lib/cookie-options";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set(promptPilotAuthCookieName, "", {
    ...getSessionCookieOptions(),
    maxAge: 0
  });
  response.cookies.set(promptPilotCustomProfileCookieName, "", {
    ...getClientCookieOptions(),
    maxAge: 0
  });
  return response;
}

