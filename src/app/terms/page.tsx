import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

/** Apple’s Licensed Application Standard EULA — link in app/metadata when you use Apple’s default EULA. */
const APPLE_STANDARD_EULA =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export const metadata: Metadata = {
  title: "Terms of Use | Deep Cut",
  description:
    "Terms of Use for Deep Cut (Spin Journal), including subscriptions and acceptable use.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Legal
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Terms of Use
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        <strong className="font-medium text-[var(--foreground)]">Deep Cut</strong>{" "}
        (Spin Journal), {site.name}, Effective April 2026
      </p>

      <div className="prose-custom mt-12 space-y-10 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          These Terms of Use (&ldquo;Terms&rdquo;) govern your use of Deep Cut
          (&ldquo;the app&rdquo;) on iPhone and iPad. By downloading or using the app,
          you agree to these Terms. If you do not agree, do not use the app.
        </p>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Apple standard end user license
          </h2>
          <p>
            Your use of the app is also subject to Apple&apos;s Licensed Application
            Standard End User License Agreement (&ldquo;Standard EULA&rdquo;), unless
            a separate custom EULA is presented to you in App Store Connect. You can
            read the Standard EULA here:{" "}
            <a
              href={APPLE_STANDARD_EULA}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] hover:opacity-90"
            >
              Apple Terms of Use (EULA) for licensed applications
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            License and acceptable use
          </h2>
          <p>
            Subject to these Terms and the Standard EULA (or your custom EULA, if
            applicable), {site.name} grants you a personal, non-exclusive,
            non-transferable license to use the app for its intended purpose. You
            agree not to misuse the app, attempt to interfere with its operation, or
            use it in violation of applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Subscriptions (Deep Cut Plus)
          </h2>
          <p>
            Auto-renewable subscriptions are billed and managed by Apple through your
            Apple ID. Subscription price, billing period, and renewal are shown in the
            app and at purchase time. You can manage or cancel a subscription in
            Settings &rarr; Apple ID &rarr; Subscriptions on your device. When you
            subscribe, you also agree to Apple&apos;s payment terms that apply at
            checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Privacy
          </h2>
          <p>
            Our{" "}
            <Link href="/privacy" className="font-medium text-[var(--accent)] hover:opacity-90">
              Privacy Policy
            </Link>{" "}
            describes how we handle information in connection with the app.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Changes and contact
          </h2>
          <p>
            We may update these Terms from time to time. The &ldquo;Effective&rdquo;
            date at the top will change when we do. Continued use of the app after
            changes means you accept the updated Terms.
          </p>
          <p>
            Questions about these Terms:{" "}
            <a
              href={`mailto:${site.email.support}`}
              className="font-medium text-[var(--accent)] hover:opacity-90"
            >
              {site.email.support}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Disclaimer
          </h2>
          <p>
            The app is provided &ldquo;as is&rdquo; to the fullest extent permitted
            by law. To the extent allowed by applicable law, {site.name} is not liable
            for any indirect or consequential damages arising from your use of the
            app.
          </p>
        </section>

        <section className="border-t border-[var(--border-subtle)] pt-10">
          <p className="text-xs text-[var(--footer-note)]">
            <Link href="/privacy" className="hover:text-[var(--foreground)]">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/support" className="hover:text-[var(--foreground)]">
              Support
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
