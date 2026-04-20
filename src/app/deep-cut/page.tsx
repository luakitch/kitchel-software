import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deep Cut | Spin Journal",
  description:
    "Log vinyl listening, organize your shelf, and see stats built for how records work.",
};

const featureBlocks = [
  {
    title: "Your collection",
    items: [
      "Build a shelf with artist, title, year, and label when you have them.",
      "Search releases to add cover art and track info automatically.",
      "Sort, open details, and jump straight to logging a spin.",
      "Choose artwork you like: catalog covers, search results, or a clean default.",
    ],
  },
  {
    title: "Spin logging",
    items: [
      "Pick the record, set date and time, add optional notes.",
      "When track times exist, log full albums or specific sides with smarter listen-time estimates.",
      "Otherwise pick session length or leave it open-ended.",
      "Tag spins for moods, rooms, genres, whatever helps you browse history.",
    ],
  },
  {
    title: "Recents & insights",
    items: [
      "Recents surfaces your latest spins with quick paths back to the album.",
      "Stats chart frequency, listening time, streaks, full-album vs sides, top artists and albums.",
      "History stays meaningful even when an album leaves your shelf.",
    ],
  },
  {
    title: "Stay in sync",
    items: [
      "Sign in with Apple to sync library across iPhone and iPad, tied to your Apple ID.",
      "Start local and sign in later when you are ready to move your shelf.",
      "Deep Cut Plus (monthly or lifetime) funds ongoing development; restore anytime from Profile.",
    ],
  },
] as const;

export default function DeepCutPage() {
  const storeUrl = site.deepCutAppStoreUrl;

  return (
    <div className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Kitchel Software
          </p>
          <h1
            className="mt-4 max-w-3xl text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              color: "var(--foreground)",
            }}
          >
            Deep Cut
          </h1>
          <p className="mt-2 text-xl text-amber-500 sm:text-2xl">Spin Journal</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            For people who listen on vinyl and want a real shelf, a real spin log,
            and listening insights that match how records work, not generic streaming
            stats.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {storeUrl ? (
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300"
              >
                Download on the App Store
              </a>
            ) : (
              <span
                className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-dashed border-amber-500/40 px-7 py-3.5 text-sm font-medium text-amber-600"
                style={{ background: "var(--accent-soft)" }}
              >
                App Store link goes live with release. Set{" "}
                <code
                  className="rounded px-1.5 py-0.5 font-mono text-xs"
                  style={{
                    background: "var(--card-elevated)",
                    color: "var(--foreground)",
                  }}
                >
                  NEXT_PUBLIC_DEEP_CUT_APP_STORE_URL
                </code>
              </span>
            )}
            <Link
              href="/support"
              className="text-sm font-medium text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2
          className="text-2xl sm:text-3xl"
          style={{
            fontFamily: "var(--font-display), ui-serif, Georgia, serif",
            color: "var(--foreground)",
          }}
        >
          What you get
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Designed for dark mode, with Shelf, Stats, Log, Recents, and more under one
          roof.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {featureBlocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-lg font-medium" style={{ color: "var(--foreground)" }}>
                {block.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/80"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
