export const site = {
  name: "Kitchel Software",
  tagline: "Thoughtful software for people who care about the details.",
  email: {
    support: "kitchelsoftware@gmail.com",
  },
  /** Set when the App Store listing is live */
  deepCutAppStoreUrl:
    process.env.NEXT_PUBLIC_DEEP_CUT_APP_STORE_URL?.trim() ?? "",
} as const;

export function absoluteUrl(path: string) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://kitchelsoftware.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
