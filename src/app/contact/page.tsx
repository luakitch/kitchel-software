import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getContactMailConfig } from "@/lib/contact-mail";
import { ContactForm } from "./contact-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: `Reach ${site.name} about Deep Cut, partnerships, or general questions.`,
};

export default function ContactPage() {
  const mailReady = Boolean(getContactMailConfig());

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        Contact
      </p>
      <h1
        className="mt-3 text-4xl font-normal tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
      >
        Get in touch
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">{site.name}</p>

      <p className="mt-10 text-base leading-relaxed text-[var(--muted)]">
        Questions about Deep Cut, this site, or anything else? Use the form below.
        We read every message.
      </p>

      {!mailReady ? (
        <p
          className="mt-6 rounded-xl border border-[var(--border-ui)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--muted)]"
          role="status"
        >
          The contact form is not configured on this deployment yet (add{" "}
          <code className="rounded bg-[var(--section-muted)] px-1 py-0.5 text-[var(--foreground)]">
            RESEND_API_KEY
          </code>{" "}
          to the server environment). You can still reach us at{" "}
          <a
            href={`mailto:${site.email.support}`}
            className="font-medium text-[var(--accent)] hover:opacity-90"
          >
            {site.email.support}
          </a>
          .
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="sr-only">Contact form</h2>
        <ContactForm />
      </section>

      <p className="mt-10 text-sm text-[var(--muted)]">
        For app-specific help, see{" "}
        <Link href="/support" className="font-medium text-[var(--accent)] hover:opacity-90">
          Deep Cut support
        </Link>
        .
      </p>
    </div>
  );
}
