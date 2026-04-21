"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/deep-cut", label: "Deep Cut" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${menuOpen ? " nav-menu-open" : ""}`}
    >
      <div
        className="nav-drawer-backdrop"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <nav className="navbar" aria-label="Primary">
        <div className="navbar-chrome">
          <div className="logo">
            <Link href="/" className="logo-mark" onClick={closeMenu}>
              <span className="inline-flex rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-orange-600 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-white shadow-sm">
                KS
              </span>
            </Link>
            <Link href="/" className="logo-wordmark" onClick={closeMenu}>
              <span>{site.name}</span>
            </Link>
          </div>
          <div className="navbar-end">
            <Link href="/contact" className="nav-contact-cta" onClick={closeMenu}>
              Contact
            </Link>
            <button
              type="button"
              className={`hamburger${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <ul
          className={`nav-links${menuOpen ? " active" : ""}`}
          id="primary-navigation"
        >
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
