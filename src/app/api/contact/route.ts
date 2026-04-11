import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const { name, email, message } =
    (payload ?? {}) as Partial<Record<"name" | "email" | "message", unknown>>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !EMAIL_REGEX.test(email)
  ) {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 },
    );
  }

  console.log("[contact] new message", {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
