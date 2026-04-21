"use client";

import { useCallback, useState } from "react";
import {
  CONTACT_REASON_LABELS,
  CONTACT_REASON_VALUES,
} from "@/lib/contact-reasons";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const reason = String(fd.get("reason") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const hp = String(fd.get("hp") ?? "");

    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, subject, message, hp }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const inputClass =
    "w-full rounded-xl border border-[var(--border-ui)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-3)] focus-visible:border-[var(--border-ui-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]";

  const selectClass = `${inputClass} cursor-pointer appearance-none bg-[length:1rem_1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--card)",
      }}
    >
      {status === "success" ? (
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Thanks — your message was sent. We&apos;ll get back to you at the email you
          provided.
        </p>
      ) : (
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-hp">Leave blank</label>
            <input
              id="contact-hp"
              name="hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="text-xs font-medium text-[var(--foreground)]">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              className={`${inputClass} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-xs font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className={`${inputClass} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="contact-reason" className="text-xs font-medium text-[var(--foreground)]">
              Why are you reaching out?
            </label>
            <select
              id="contact-reason"
              name="reason"
              required
              defaultValue=""
              className={`${selectClass} mt-1.5`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              }}
            >
              <option value="" disabled>
                Select one…
              </option>
              {CONTACT_REASON_VALUES.map((value) => (
                <option key={value} value={value}>
                  {CONTACT_REASON_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-subject" className="text-xs font-medium text-[var(--foreground)]">
              Subject <span className="font-normal text-[var(--muted)]">(optional)</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              maxLength={200}
              className={`${inputClass} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-xs font-medium text-[var(--foreground)]">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={8000}
              rows={6}
              className={`${inputClass} mt-1.5 resize-y min-h-[9rem]`}
            />
          </div>

          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#09090b] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <a
              href={`mailto:${site.email.support}`}
              className="text-sm font-medium text-[var(--accent)] hover:opacity-90"
            >
              Or email {site.email.support}
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
