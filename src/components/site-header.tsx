"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/deep-cut", label: "Deep Cut" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 text-sm font-medium tracking-tight text-zinc-100"
          onClick={() => setOpen(false)}
        >
          <span className="rounded-md bg-gradient-to-br from-amber-200 to-amber-500 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-zinc-950">
            KS
          </span>
          <span className="transition-colors group-hover:text-white">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/[0.06] bg-zinc-950/95 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/[0.05]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
