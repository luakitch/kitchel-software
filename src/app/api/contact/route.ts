import { NextResponse } from "next/server";
import { getContactMailConfig, sendContactViaResend } from "@/lib/contact-mail";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 8000;
const MIN_MESSAGE = 10;

function isValidEmail(value: string): boolean {
  if (value.length > MAX_EMAIL) return false;
  // Practical check; Resend validates on send as well.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const config = getContactMailConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Contact form is not configured (missing RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const hp = typeof record.hp === "string" ? record.hp : "";
  if (hp.length > 0) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const subject =
    typeof record.subject === "string" ? record.subject.trim() : "";
  const message =
    typeof record.message === "string" ? record.message.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { error: `Please enter your name (max ${MAX_NAME} characters).` },
      { status: 400 },
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (subject.length > MAX_SUBJECT) {
    return NextResponse.json(
      { error: `Subject is too long (max ${MAX_SUBJECT} characters).` },
      { status: 400 },
    );
  }
  if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      {
        error: `Message should be between ${MIN_MESSAGE} and ${MAX_MESSAGE} characters.`,
      },
      { status: 400 },
    );
  }

  const sent = await sendContactViaResend({
    config,
    name,
    email,
    subject,
    message,
  });

  if (!sent.ok) {
    const status = sent.status >= 400 && sent.status < 600 ? sent.status : 502;
    return NextResponse.json(
      {
        error:
          status === 403 || status === 422
            ? sent.detail
            : "Could not send your message. Please try again or email us directly.",
      },
      { status },
    );
  }

  return NextResponse.json({ ok: true });
}
