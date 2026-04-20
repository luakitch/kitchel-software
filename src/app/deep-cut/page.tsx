import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deep Cut | Spin Journal",
  description:
    "Log the needle, keep the shelf, see the habit. Spin journal for vinyl: shelf, spins with notes and tags, and stats for albums and sides.",
};

const featureBlocks = [
  {
    title: "Your collection, one row at a time",
    items: [
      "Shelf rows store artist, title, year, label, and whatever detail you choose to enter.",
      "Sort and filter from the shelf, open a release for full detail, and jump straight into Log spin.",
      "Search ties into Discogs release data so you can add a pressing with artwork and track listing when a match exists.",
      "Artwork can follow the Apple Music catalog on device (when Music access is granted), use Discogs imagery from search, or fall back to a neutral default.",
    ],
  },
  {
    title: "Spins with context, not just timestamps",
    items: [
      "Each spin stores date, time, optional free-form notes, and tags (mood, room, genre, or your own vocabulary) for later filtering.",
      "When per-track durations exist on the release, log a full-LP listen or restrict to Side A / Side B so listen-time estimates use real side length, not a generic timer.",
      "When track metadata is thin, choose a fixed session length (30 / 45 / 60 / 90 minutes) or leave the session open-ended.",
      "Spin history stays queryable even if you later remove a record from the shelf, so your archive does not lose past listens.",
    ],
  },
  {
    title: "Recents and analytics",
    items: [
      "Recents orders by latest spin with one-tap paths back to the release when it is still on shelf.",
      "Stats aggregate spin counts, total listen time, weekday histograms, and current streaks from logged data only.",
      "Breakdowns compare full-album listens versus side-based sessions when your logs include that distinction.",
      "Rankings surface top artists and top albums from spin counts over the window you care about.",
    ],
  },
  {
    title: "Release lookup and artwork",
    items: [
      "Discogs API calls power release search and artwork retrieval; failures from rate limits or network errors surface as retryable errors in the UI.",
      "MusicKit-backed catalog artwork is optional and gated behind system Music authorization.",
      "StoreKit handles Deep Cut Plus subscription state; restore is available from Profile, and renewal or cancellation follows Apple’s subscription settings.",
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
          <p
            className="mt-4 max-w-2xl text-lg font-medium leading-snug tracking-tight sm:text-xl"
            style={{ color: "var(--foreground)" }}
          >
            Log the needle. Keep the shelf. See the habit.
          </p>
          <h1
            className="mt-6 max-w-3xl text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              color: "var(--foreground)",
            }}
          >
            Deep Cut
          </h1>
          <p className="mt-2 text-xl text-amber-500 sm:text-2xl">Spin journal for vinyl</p>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            <p>
              Build a shelf, log spins with notes and tags, and see patterns that match
              full albums and sides, not streaming minutes.
            </p>
            <p>
              Add releases fast, pick the art you like, then log how you really listened:
              full LP, Side A, Side B, or a timed session.
            </p>
            <p>
              Logging a spin is part of the ritual: date, time, optional notes, tags for
              room or mood. Over time, the app becomes a diary of how you actually listen,
              not a dashboard of algorithmic noise.
            </p>
          </div>
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
          Inside the app
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Shelf, Log, Recents, and Stats share one data model so counts, durations, and
          rankings stay consistent end to end.
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
