import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm space-y-3">
          <p className="text-sm font-medium text-white">{site.name}</p>
          <p className="text-sm leading-relaxed text-zinc-500">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400">
          <Link href="/deep-cut" className="hover:text-white">
            Deep Cut
          </Link>
          <Link href="/support" className="hover:text-white">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <a
            href={`mailto:${site.email.support}`}
            className="hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-6 text-center text-xs text-zinc-600">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
