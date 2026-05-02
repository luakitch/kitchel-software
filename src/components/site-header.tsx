"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/deep-cut", label: "Deep Cut" },
  { href: "/extensions", label: "Extensions" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Keeps the mobile menu panel just below the bar; re-syncs when the pill reflows on scroll. */
  useEffect(() => {
    const mobileNavMq = window.matchMedia("(max-width: 1359px)");

    function updateMobileNavPanelTop() {
      if (!mobileNavMq.matches) {
        document.documentElement.style.removeProperty("--nav-mobile-panel-top");
        return;
      }
      const header = headerRef.current;
      if (!header) return;
      const gapPx = 10;
      const y = header.getBoundingClientRect().bottom + gapPx;
      document.documentElement.style.setProperty(
        "--nav-mobile-panel-top",
        `${Math.max(0, Math.round(y))}px`,
      );
    }

    function onMobileNavMqChange() {
      updateMobileNavPanelTop();
    }

    const headerEl = headerRef.current;
    if (!headerEl) return;

    const ro = new ResizeObserver(() => updateMobileNavPanelTop());
    ro.observe(headerEl);

    let tick = false;
    const onScrollRaf = () => {
      if (tick) return;
      tick = true;
      window.requestAnimationFrame(() => {
        updateMobileNavPanelTop();
        tick = false;
      });
    };

    updateMobileNavPanelTop();
    mobileNavMq.addEventListener("change", onMobileNavMqChange);
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", updateMobileNavPanelTop);

    return () => {
      ro.disconnect();
      mobileNavMq.removeEventListener("change", onMobileNavMqChange);
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", updateMobileNavPanelTop);
      document.documentElement.style.removeProperty("--nav-mobile-panel-top");
    };
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
      ref={headerRef}
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
              <Image
                src="/ks-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 rounded-lg object-contain"
                priority
              />
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
