import { NextResponse, type NextRequest } from "next/server";

import { getPromptPilotSessionFromRequest } from "@/lib/promptpilot-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/workspace")) {
    return NextResponse.next();
  }

  const session = getPromptPilotSessionFromRequest(request);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*"]
};
