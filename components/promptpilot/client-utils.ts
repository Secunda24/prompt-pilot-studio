"use client";

import { toast } from "sonner";

export async function copyTextToClipboard(text: string, label = "Content") {
  await navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard.`);
}

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success(`${filename} downloaded.`);
}

export function linesToText(title: string, lines: string[]) {
  return `${title}\n\n${lines.map((line) => `- ${line}`).join("\n")}`;
}
