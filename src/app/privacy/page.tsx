import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Deep Cut",
  description:
    "How Deep Cut (Spin Journal) handles your information on iPhone and iPad.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Legal
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        <strong className="font-medium text-[var(--foreground)]">Deep Cut</strong>{" "}
        (Spin Journal), {site.name}, Effective April 2026
      </p>

      <div className="prose-custom mt-12 space-y-10 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          This policy describes how Deep Cut (&ldquo;the app&rdquo;) handles
          information when you use it on iPhone or iPad. If you have questions,
          use the contact at the bottom.
        </p>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            What the app is for
          </h2>
          <p>
            Deep Cut helps you log vinyl listening (spins), organize your shelf,
            and view stats. Data stays on your device and, when you sign in, in
            your personal iCloud account as described below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Information the app processes
          </h2>
          <ul className="list-none space-y-4 pl-0">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Library and listening data you enter
              </span>
              : records you add, spin logs, notes, tags, and related metadata.
              Stored locally on your device.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                iCloud / CloudKit (signed-in users)
              </span>
              . If you use Sign in with Apple and iCloud, your library data may
              sync through Apple&apos;s CloudKit private database tied to your
              Apple ID. Apple&apos;s privacy policies apply to that infrastructure.
              We do not receive a separate copy of your CloudKit database on our
              servers.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">Guest mode</span>. If
              you continue without signing in, data stays on the device only (not
              synced via iCloud).
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">Sign in with Apple</span>
              . Apple may share an account identifier with the app so we can
              associate your subscription and synced data with your account. Apple
              controls what name or email is shared; we use it only to run the app
              and support your account.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">In-app purchases</span>.
              Subscription and purchase status are handled by Apple (StoreKit). We
              do not receive your full payment card details.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Music catalog (MusicKit)
              </span>
              . When you enable optional catalog-based artwork (or similar
              features), the app uses Apple&apos;s MusicKit APIs to look up album
              art and related metadata. Those requests are subject to Apple&apos;s
              terms and privacy policy.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">Discogs</span>. When you
              search or load release information from Discogs, your search terms
              and requested release identifiers are sent to Discogs&apos; API over
              the network so the app can show results and artwork. Discogs&apos;
              privacy policy governs their handling of API traffic.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">What we don&apos;t do</h2>
          <ul className="list-none space-y-3 pl-0">
            <li>
              We do <strong className="text-[var(--foreground)]">not</strong> sell your
              personal information.
            </li>
            <li>
              The app does not include third-party advertising or cross-app
              tracking SDKs for marketing.
            </li>
            <li>
              We do not ask for access to your photo library, contacts, or precise
              location for the core features described above.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Data retention and deletion
          </h2>
          <p>
            Your library lives on your devices and, when enabled, in your iCloud
            account. You can remove data by deleting items in the app, signing out,
            or deleting the app. iCloud data can also be managed through your Apple
            ID and device settings. If you need help removing account-related data
            we control, contact us below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Children</h2>
          <p>
            The app is not directed to children under 13 (or the minimum age
            required in your region). We do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Changes</h2>
          <p>
            We may update this policy from time to time. The &ldquo;Effective&rdquo;
            date at the top will change when we do. Continued use of the app after
            changes means you accept the updated policy.
          </p>
        </section>

        <section className="border-t border-[var(--border-subtle)] pt-10">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Contact</h2>
          <p className="mt-2">
            Privacy questions:{" "}
            <a
              href={`mailto:${site.email.privacy}`}
              className="font-medium text-[var(--accent)] hover:opacity-90"
            >
              {site.email.privacy}
            </a>
          </p>
          <p className="mt-6 text-xs text-[var(--footer-note)]">
            <Link href="/support" className="hover:text-[var(--foreground)]">
              Support page
            </Link>
            {" | "}
            <Link href="/deep-cut" className="hover:text-[var(--foreground)]">
              Deep Cut product page
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
