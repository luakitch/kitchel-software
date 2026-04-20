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
    body: "Use Restore purchases in the app (Profile → Plans & restore). Billing is handled by Apple; subscription management is in Settings → Apple ID → Subscriptions.",
  },
  {
    title: "Discogs search & artwork",
    body: "Searching releases uses the Discogs API. Rate limits or network issues can cause temporary failures; try again in a moment.",
  },
  {
    title: "Optional catalog artwork",
    body: "Better digital covers use the on-device music catalog and need Music access when the system prompts. You can change the default under More → Vinyl library.",
  },
] as const;

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500/90">
        Help
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-white"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Deep Cut: Support
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        Spin Journal, {site.name}
      </p>

      <p className="mt-10 text-base leading-relaxed text-zinc-400">
        Thanks for using Deep Cut. If something isn't working or you have a
        question, start here.
      </p>

      <section className="mt-12">
        <h2 className="text-base font-semibold text-white">Contact</h2>
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-6 sm:p-8">
          <p className="text-sm text-zinc-300">
            <span className="font-medium text-white">Email:</span>{" "}
            <a
              href={`mailto:${site.email.support}`}
              className="font-medium text-amber-400/90 hover:text-amber-300"
            >
              {site.email.support}
            </a>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Include your device model, iOS version, and what you were doing when the
            issue happened. We read every message.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-base font-semibold text-white">Common topics</h2>
        <ul className="mt-6 space-y-8">
          {topics.map((t) => (
            <li key={t.title}>
              <h3 className="text-sm font-medium text-white">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-base font-semibold text-white">Privacy</h2>
        <p className="mt-3 text-sm text-zinc-400">
          See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-amber-400/90 hover:text-amber-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <p className="mt-16 text-xs leading-relaxed text-zinc-600">
        Deep Cut is not affiliated with Discogs or Apple beyond normal use of their
        public APIs and platform services.
      </p>
    </div>
  );
}
