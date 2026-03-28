import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { promptPilotWorkspace } from "@/lib/promptpilot-data";
import {
  getPromptPilotDemoProfile,
  getPromptPilotProfileById,
  promptPilotDemoCredentials
} from "@/lib/promptpilot-data";
import type {
  PromptPilotProfile,
  PromptPilotRole,
  PromptPilotWorkspace
} from "@/lib/promptpilot-types";

export const promptPilotAuthCookieName = "promptpilot-session";
export const promptPilotCustomProfileCookieName = "promptpilot-custom-profile";

export interface PromptPilotSession {
  profileId: string;
  role: PromptPilotRole;
}

export interface PromptPilotViewer {
  session: PromptPilotSession;
  profile: PromptPilotProfile;
  workspace: PromptPilotWorkspace;
}

export function createPromptPilotSessionValue(profile: PromptPilotProfile) {
  return JSON.stringify({
    profileId: profile.id,
    role: profile.role
  } satisfies PromptPilotSession);
}

export function parsePromptPilotSessionValue(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as PromptPilotSession;
    if (!parsed.profileId || !parsed.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function createCustomPromptPilotProfileValue(profile: PromptPilotProfile) {
  return JSON.stringify(profile);
}

export function parseCustomPromptPilotProfileValue(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as PromptPilotProfile;
    if (!parsed.id || !parsed.email || !parsed.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getPromptPilotSessionFromRequest(request: NextRequest) {
  return parsePromptPilotSessionValue(request.cookies.get(promptPilotAuthCookieName)?.value);
}

export function getPromptPilotViewer() {
  const store = cookies();
  const session = parsePromptPilotSessionValue(
    store.get(promptPilotAuthCookieName)?.value
  );

  if (!session) {
    return null;
  }

  const customProfile = parseCustomPromptPilotProfileValue(
    store.get(promptPilotCustomProfileCookieName)?.value
  );

  const profile =
    (customProfile?.id === session.profileId ? customProfile : null) ??
    getPromptPilotProfileById(session.profileId);

  if (!profile) {
    return null;
  }

  return {
    session,
    profile,
    workspace: promptPilotWorkspace
  } satisfies PromptPilotViewer;
}

export function requirePromptPilotViewer() {
  const viewer = getPromptPilotViewer();

  if (!viewer) {
    redirect("/login");
  }

  return viewer;
}

export function requirePromptPilotEditor() {
  const viewer = requirePromptPilotViewer();

  if (viewer.profile.role === "viewer") {
    redirect("/workspace");
  }

  return viewer;
}

export function requirePromptPilotAdmin() {
  const viewer = requirePromptPilotViewer();

  if (viewer.profile.role !== "admin") {
    redirect("/workspace");
  }

  return viewer;
}

export function getPromptPilotHome() {
  return "/workspace";
}

export function validatePromptPilotCredentials(email: string, password: string) {
  const normalizedEmail = email.toLowerCase();

  if (
    normalizedEmail === promptPilotDemoCredentials.admin.email.toLowerCase() &&
    password === promptPilotDemoCredentials.admin.password
  ) {
    return getPromptPilotDemoProfile("admin");
  }

  if (
    normalizedEmail === promptPilotDemoCredentials.team_member.email.toLowerCase() &&
    password === promptPilotDemoCredentials.team_member.password
  ) {
    return getPromptPilotDemoProfile("team_member");
  }

  if (
    normalizedEmail === promptPilotDemoCredentials.viewer.email.toLowerCase() &&
    password === promptPilotDemoCredentials.viewer.password
  ) {
    return getPromptPilotDemoProfile("viewer");
  }

  return null;
}

export function buildCustomSignupProfile({
  fullName,
  email
}: {
  fullName: string;
  email: string;
}) {
  return {
    id: `custom-${email.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    workspaceId: promptPilotWorkspace.id,
    fullName,
    email,
    title: "Creative Workspace Owner",
    avatar: fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    role: "team_member"
  } satisfies PromptPilotProfile;
}
