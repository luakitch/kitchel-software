"use client";

import { toggleTheme } from "@/lib/theme";
import styles from "./theme-toggle.module.css";

function MoonIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21 14.5A7.5 7.5 0 019.5 3a7.45 7.45 0 002.36 14.5A7.5 7.5 0 0021 14.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => toggleTheme()}
      aria-label="Toggle light or dark theme"
      title="Toggle light or dark theme"
    >
      <span className={styles.moon}>
        <MoonIcon />
      </span>
      <span className={styles.sun}>
        <SunIcon />
      </span>
    </button>
  );
}
