export const site = {
  name: "Kitchel Software",
  tagline: "Thoughtful software for people who care about the details.",
  email: {
    support: "kitchelsoftware@gmail.com",
  },
  /** Author profile (repos, other projects) */
  github: "https://github.com/luakitch",
  extensions: {
    pythonRunWithArgs: {
      name: "Python Run With Args",
      description:
        "Run Python scripts in VS Code or Cursor with a quick prompt for CLI arguments—remembered per file.",
      openVsx:
        "https://open-vsx.org/extension/kitchelsoftware/python-run-with-args",
      marketplace:
        "https://marketplace.visualstudio.com/items?itemName=kitchelsoftware.python-run-with-args",
      source: "https://github.com/luakitch/PyArgsExtension",
    },
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
