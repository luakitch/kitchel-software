import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support | Deep Cut",
  description: "Get help with Deep Cut (Spin Journal), iCloud, purchases, and more.",
};

const topics = [
  {
    title: "iCloud & Sign in with Apple",
    body: "Make sure you're signed into iCloud on your device and that Deep Cut has permission to use iCloud if prompted. Guest mode keeps data on-device only.",
  },
  {
    title: "Deep Cut Plus / purchases",
    body: "Use Restore purchases in the app (Profile -> Plans & restore). Billing is handled by Apple; subscription management is in Settings -> Apple ID -> Subscriptions.",
  },
  {
    title: "Discogs search & artwork",
    body: "Searching releases uses the Discogs API. Rate limits or network issues can cause temporary failures; try again in a moment.",
  },
  {
    title: "Optional catalog artwork",
    body: "Better digital covers use the on-device music catalog and need Music access when the system prompts. You can change the default under More -> Vinyl library.",
  },
] as const;

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Help
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Deep Cut: Support
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Spin Journal, {site.name}
      </p>

      <p className="mt-10 text-base leading-relaxed text-[var(--muted)]">
        Thanks for using Deep Cut. If something isn't working or you have a
        question, start here.
      </p>

      <section className="mt-12">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Contact</h2>
        <div
          className="mt-4 rounded-2xl border p-6 sm:p-8"
          style={{
            borderColor: "var(--border-subtle)",
            background: "var(--card)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            <span className="font-medium text-[var(--foreground)]">Form:</span>{" "}
            <Link
              href="/contact"
              className="font-medium text-[var(--accent)] hover:opacity-90"
            >
              Send a message
            </Link>
          </p>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            <span className="font-medium text-[var(--foreground)]">Email:</span>{" "}
            <a
              href={`mailto:${site.email.support}`}
              className="font-medium text-[var(--accent)] hover:opacity-90"
            >
              {site.email.support}
            </a>
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Include your device model, iOS version, and what you were doing when the
            issue happened. We read every message.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Common topics</h2>
        <ul className="mt-6 space-y-8">
          {topics.map((t) => (
            <li key={t.title}>
              <h3 className="text-sm font-medium text-[var(--foreground)]">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Privacy</h2>
        <p className="mt-3 text-sm text-[var(--muted)]">
          See our{" "}
          <Link href="/privacy" className="font-medium text-[var(--accent)] hover:opacity-90">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <p className="mt-16 text-xs leading-relaxed text-[var(--footer-note)]">
        Deep Cut is not affiliated with Discogs or Apple beyond normal use of their
        public APIs and platform services.
      </p>
    </div>
  );
}
