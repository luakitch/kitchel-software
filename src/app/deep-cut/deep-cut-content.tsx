"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DeepCutFixedVinyl } from "./deep-cut-fixed-vinyl";
import { DeepCutMobileVinylBackdrop } from "./deep-cut-mobile-vinyl";

const SIDE_LABELS = ["A", "B", "C", "D"] as const;

export type DeepCutFeatureBlock = {
  readonly title: string;
  readonly items: readonly string[];
};

type DeepCutContentProps = {
  storeUrl: string | null;
  featureBlocks: readonly DeepCutFeatureBlock[];
};

export function DeepCutContent({ storeUrl, featureBlocks }: DeepCutContentProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const rotation = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 960]);

  return (
    <div className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
      <DeepCutFixedVinyl rotation={rotation} />
      <DeepCutMobileVinylBackdrop rotation={rotation} />

      <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-[min(42rem,68vw)] xl:max-w-[min(44rem,58vw)]">
        <div className="space-y-0 pb-20 lg:pb-28">
          <motion.section
            className="hero-glow relative overflow-hidden rounded-2xl border px-5 py-12 sm:px-8 sm:py-16 lg:pt-10"
            style={{ borderColor: "var(--border-subtle)" }}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
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
            <p className="mt-2 text-xl text-[var(--accent)] sm:text-2xl">Spin journal for vinyl</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {storeUrl ? (
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                    boxShadow: "0 12px 40px rgba(184, 89, 255, 0.25)",
                  }}
                >
                  Download on the App Store
                </a>
              ) : (
                <span
                  className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-medium text-[var(--muted)]"
                  style={{
                    borderColor: "var(--border-ui)",
                    background: "var(--card)",
                  }}
                >
                  Coming soon on the App Store
                </span>
              )}
            </div>
          </motion.section>

          <motion.div
            className="mt-14 sm:mt-16"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Program
            </p>
            <h2
              className="mt-2 text-2xl sm:text-3xl"
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
                color: "var(--foreground)",
              }}
            >
              Inside the app
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--muted)" }}>
              Shelf, Log, Recents, and Stats share one data model so counts, durations, and rankings stay consistent
              end to end.
            </p>
          </motion.div>

          <div
            className="mt-10 rounded-2xl border px-5 py-8 sm:mt-12 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--border-subtle)",
              background: "var(--card)",
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--muted-3)]">Track listing</p>
            <div className="mt-8 space-y-10 sm:space-y-12">
              {featureBlocks.map((block, index) => {
                const side = SIDE_LABELS[index] ?? String(index + 1);
                return (
                  <motion.section
                    key={block.title}
                    className={index > 0 ? "border-t border-[var(--border-subtle)] pt-10 sm:pt-12" : ""}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px", amount: 0.2 }}
                    transition={{
                      duration: 0.48,
                      delay: reduceMotion ? 0 : Math.min(0.05 * index, 0.15),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                      <span className="shrink-0 font-mono text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">
                        SIDE {side}
                      </span>
                      <h3
                        className="text-lg font-medium leading-snug sm:text-xl"
                        style={{
                          fontFamily: "var(--font-display), ui-serif, Georgia, serif",
                          color: "var(--foreground)",
                        }}
                      >
                        {block.title}
                      </h3>
                    </div>
                    <ol className="mt-6 list-none space-y-3.5 sm:space-y-4" style={{ color: "var(--muted)" }}>
                      {block.items.map((item, trackIndex) => (
                        <li key={item} className="flex gap-3 sm:gap-4">
                          <span className="w-8 shrink-0 pt-px text-right font-mono text-xs tabular-nums text-[var(--muted-3)] sm:w-9 sm:text-sm">
                            {trackIndex + 1}.
                          </span>
                          <span className="min-w-0 text-sm leading-relaxed sm:text-[0.9375rem]">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.section>
                );
              })}
            </div>
          </div>

          <motion.nav
            className="mt-16 flex flex-wrap items-center justify-center gap-3 border-t pt-10 sm:mt-20 sm:gap-4 sm:pt-12"
            style={{ borderColor: "var(--border-subtle)" }}
            aria-label="Deep Cut links"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/support"
              className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition hover:border-[var(--border-ui-hover)] hover:bg-[var(--fill-hover)]"
              style={{
                borderColor: "var(--border-ui)",
                color: "var(--foreground)",
              }}
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition hover:border-[var(--border-ui-hover)] hover:bg-[var(--fill-hover)]"
              style={{
                borderColor: "var(--border-ui)",
                color: "var(--foreground)",
              }}
            >
              Privacy Policy
            </Link>
          </motion.nav>
        </div>
      </div>
    </div>
  );
}
