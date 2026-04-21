import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--background)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm space-y-3">
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {site.name}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {site.tagline}
          </p>
        </div>
        <div
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <Link
            href="/deep-cut"
            className="transition hover:text-[var(--foreground)]"
          >
            Deep Cut
          </Link>
          <Link
            href="/support"
            className="transition hover:text-[var(--foreground)]"
          >
            Support
          </Link>
          <Link
            href="/contact"
            className="transition hover:text-[var(--foreground)]"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="transition hover:text-[var(--foreground)]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition hover:text-[var(--foreground)]"
          >
            Terms
          </Link>
          <a
            href={`mailto:${site.email.support}`}
            className="transition hover:text-[var(--foreground)]"
          >
            Email
          </a>
        </div>
      </div>
      <div
        className="border-t py-6 text-center text-xs"
        style={{
          borderColor: "var(--border-subtle-2)",
          color: "var(--footer-note)",
        }}
      >
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
