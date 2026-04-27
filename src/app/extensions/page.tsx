import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Extensions | ${site.name}`,
  description:
    "Editor extensions for VS Code and Cursor from Kitchel Software, including Python Run With Args.",
};

const ext = site.extensions.pythonRunWithArgs;

const linkClass =
  "font-medium text-[var(--accent)] transition hover:opacity-90";

export default function ExtensionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Developer tools
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Editor extensions
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Small utilities from {site.name}—published for{" "}
        <span className="text-[var(--foreground)]">Visual Studio Code</span> and{" "}
        <span className="text-[var(--foreground)]">Cursor</span>.
      </p>

      <article
        className="mt-12 rounded-2xl border p-8"
        style={{
          borderColor: "var(--border-subtle)",
          background: "var(--card-elevated)",
        }}
      >
        <h2
          className="text-2xl tracking-tight text-[var(--foreground)]"
          style={{
            fontFamily: "var(--font-display), ui-serif, Georgia, serif",
          }}
        >
          {ext.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          {ext.description}
        </p>
        <ul className="mt-6 space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
          <li>
            <span className="text-[var(--foreground)]">Open VSX</span> (Cursor,{" "}
            VSCodium, etc.):{" "}
            <a
              href={ext.openVsx}
              className={linkClass}
              rel="noopener noreferrer"
            >
              Install
            </a>
          </li>
          <li>
            <span className="text-[var(--foreground)]">Visual Studio Marketplace</span>
            :{" "}
            <a
              href={ext.marketplace}
              className={linkClass}
              rel="noopener noreferrer"
            >
              Install
            </a>
          </li>
          <li>
            <span className="text-[var(--foreground)]">Source</span>:{" "}
            <a
              href={ext.source}
              className={linkClass}
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </article>

      <p className="mt-12 text-sm leading-relaxed text-[var(--muted)]">
        More open-source work:{" "}
        <a href={site.github} className={linkClass} rel="noopener noreferrer">
          {site.github.replace("https://", "")}
        </a>
        .
      </p>
    </div>
  );
}
