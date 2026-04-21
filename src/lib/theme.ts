/**
 * Boot script runs in <head> before paint so the document is always dark.
 * Clears legacy theme localStorage from when light mode existed.
 */
export function themeBootScript(): string {
  return `(function(){document.documentElement.setAttribute("data-theme","dark");try{localStorage.removeItem("kitchel-software-theme");}catch(e){}})();`;
}
