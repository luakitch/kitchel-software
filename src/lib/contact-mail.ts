import { site } from "@/lib/site";

/** Resend: use a verified domain in production, e.g. `Kitchel Software <hello@kitchelsoftware.com>`. */
const DEFAULT_RESEND_FROM = "Kitchel Software <onboarding@resend.dev>";

export type ContactMailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export function getContactMailConfig(): ContactMailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  const from =
    process.env.CONTACT_FROM?.trim() || DEFAULT_RESEND_FROM;
  const to = process.env.CONTACT_TO?.trim() || site.email.support;

  return { apiKey, from, to };
}

export async function sendContactViaResend(params: {
  config: ContactMailConfig;
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  const { config, name, email, subject, message } = params;
  const line = (label: string, value: string) => `${label}: ${value}\n`;

  const text = [
    line("Name", name),
    line("Email", email),
    line("Subject", subject || "(none)"),
    "",
    "Message:",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: email,
      subject: subject
        ? `[Site] ${subject}`
        : `[Site] Message from ${name}`,
      text,
    }),
  });

  if (res.ok) return { ok: true };

  let detail = "Email service returned an error.";
  try {
    const body = (await res.json()) as { message?: string };
    if (body?.message) detail = body.message;
  } catch {
    /* ignore */
  }
  return { ok: false, status: res.status, detail };
}
