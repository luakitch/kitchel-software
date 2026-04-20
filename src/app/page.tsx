import Link from "next/link";
import { MagneticExploreCta } from "@/components/magnetic-explore-cta";
import { SectionBand } from "@/components/home/section-band";
import { site } from "@/lib/site";

const highlights = [
  {
    title: "Your shelf, your rules",
    body: "Catalog albums with rich metadata, artwork that fits how you collect, and a flow built for vinyl, not playlists.",
  },
  {
    title: "Spin logging that matches reality",
    body: "Log full albums, sides, or sessions with notes and tags. Stats reflect how you actually listen.",
  },
  {
    title: "Sync without surrender",
    body: "Sign in with Apple and iCloud when you want your library across devices. Guest mode keeps it local.",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="hero-glow relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] groove-ring" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Independent studio
          </p>
          <h1
            className="max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              color: "var(--foreground)",
            }}
          >
            Software with{" "}
            <span className="italic text-amber-500">intention</span>,
            <br className="hidden sm:block" /> not noise.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {site.name} ships focused products for people who love craft, starting
            with{" "}
            <span className="font-medium" style={{ color: "var(--foreground)" }}>
              Deep Cut
            </span>
            , a spin journal built for record collectors.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticExploreCta href="/deep-cut" label="Explore Deep Cut" />
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border-ui)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-ui-hover)] hover:bg-[var(--fill-hover)]"
            >
              Support & contact
            </Link>
          </div>
        </div>
      </section>

      <SectionBand tone="muted" waveNext="tint" firstBelowHero>
        <section id="products" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className="text-3xl tracking-tight sm:text-4xl"
                  style={{
                    fontFamily: "var(--font-display), ui-serif, Georgia, serif",
                    color: "var(--foreground)",
                  }}
                >
                  Flagship release
                </h2>
                <p className="mt-2 max-w-lg" style={{ color: "var(--muted)" }}>
                  Deep Cut is the first major product from the studio, designed to
                  feel as considered as the records on your shelf.
                </p>
              </div>
              <Link
                href="/deep-cut"
                className="text-sm font-medium text-amber-500 hover:text-amber-600"
              >
                View product page →
              </Link>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <article
                className="relative overflow-hidden rounded-2xl border border-amber-500/25 p-8 lg:col-span-2"
                style={{
                  background: "var(--card-elevated)",
                  boxShadow: "0 0 0 1px var(--border-subtle-2) inset",
                }}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-500/90">
                    Deep Cut
                  </p>
                  <h3
                    className="mt-2 text-2xl font-medium sm:text-3xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    Spin Journal for vinyl listeners
                  </h3>
                  <p
                    className="mt-4 max-w-xl text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    A real shelf, a real spin log, and listening insights tuned to
                    how records work, not generic streaming stats.
                  </p>
                  <ul
                    className="mt-8 space-y-3 text-sm"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {highlights.map((h) => (
                      <li key={h.title} className="flex gap-3">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                          aria-hidden
                        />
                        <span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            {h.title}.
                          </span>{" "}
                          {h.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      href="/deep-cut"
                      className="inline-flex rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                    >
                      Features, links & policies
                    </Link>
                  </div>
                </div>
              </article>

              <aside
                className="flex flex-col justify-between rounded-2xl border p-8"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "var(--card)",
                }}
              >
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--muted)" }}
                  >
                    Roadmap
                  </p>
                  <h3
                    className="mt-3 text-xl"
                    style={{
                      fontFamily: "var(--font-display), ui-serif, Georgia, serif",
                      color: "var(--foreground)",
                    }}
                  >
                    More products ahead
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    This site will grow with each release, with the same bar for polish,
                    privacy, and support.
                  </p>
                </div>
                <p className="mt-8 text-xs" style={{ color: "var(--footer-note)" }}>
                  Building in public, one shipped detail at a time.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </SectionBand>

      <SectionBand tone="tint" waveNext="surface" halftone>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div
              className="rounded-2xl border px-6 py-10 sm:px-10 sm:py-12"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--card)",
              }}
            >
              <h2
                className="text-2xl sm:text-3xl"
                style={{
                  fontFamily: "var(--font-display), ui-serif, Georgia, serif",
                  color: "var(--foreground)",
                }}
              >
                App Store-ready policies
              </h2>
              <p
                className="mt-3 max-w-2xl text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Privacy and support pages are first-class routes on this site. Use
                them wherever Apple or partners ask for stable URLs.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/privacy"
                  className="rounded-lg border border-[var(--border-ui)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-ui-hover)] hover:bg-[var(--fill-hover)]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/support"
                  className="rounded-lg border border-[var(--border-ui)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-ui-hover)] hover:bg-[var(--fill-hover)]"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionBand>
    </div>
  );
}
