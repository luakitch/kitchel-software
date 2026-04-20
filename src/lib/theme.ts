export const THEME_STORAGE_KEY = "kitchel-software-theme";

export type ThemeMode = "light" | "dark";

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function setStoredTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", mode);
}

export function toggleTheme(): ThemeMode {
  const current =
    typeof document !== "undefined"
      ? (document.documentElement.getAttribute("data-theme") as ThemeMode | null)
      : null;
  const next: ThemeMode = current === "dark" ? "light" : "dark";
  applyTheme(next);
  setStoredTheme(next);
  return next;
}

export function themeBootScript(): string {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return `(function(){try{var k=${key};var t=localStorage.getItem(k);if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);return}}catch(e){}var m=window.matchMedia("(prefers-color-scheme: dark)");document.documentElement.setAttribute("data-theme",m.matches?"dark":"light")})();`;
}
