import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  return NextResponse.json({
    message: `Password reset instructions were simulated for ${parsed.data.email}.`
  });
}

