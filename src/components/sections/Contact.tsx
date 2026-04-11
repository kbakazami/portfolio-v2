"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type SocialLink = {
  key: "github" | "linkedin" | "email";
  label: string;
  href: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  { key: "github", label: "GitHub", href: "https://github.com/kbakazami" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kbakazami",
  },
  { key: "email", label: "Email", href: "mailto:contact@kbakazami.dev" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASSES =
  "w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-[color:var(--accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-secondary)]";

export function Contact() {
  const t = useTranslations("contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [clientError, setClientError] = useState<string | null>(null);

  const isLoading = status === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setClientError(t("form.errors.required"));
      setStatus("error");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setClientError(t("form.errors.email"));
      setStatus("error");
      return;
    }

    setClientError(null);
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeader
            label={t("sectionLabel")}
            title={t("title")}
            description={t("subtitle")}
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 rounded-xl border border-border bg-bg-secondary p-6 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.35)] md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary"
                >
                  {t("form.name")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("form.placeholders.name")}
                  disabled={isLoading}
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary"
                >
                  {t("form.email")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("form.placeholders.email")}
                  disabled={isLoading}
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary"
              >
                {t("form.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t("form.placeholders.message")}
                disabled={isLoading}
                className={cn(INPUT_CLASSES, "resize-y")}
              />
            </div>

            <div
              role="status"
              aria-live="polite"
              className="mt-4 min-h-5 text-sm"
            >
              {status === "success" ? (
                <span className="text-[color:var(--accent-secondary)]">
                  {t("form.success")}
                </span>
              ) : status === "error" ? (
                <span className="text-red-400">
                  {clientError ?? t("form.error")}
                </span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                leftIcon={
                  isLoading ? (
                    <span
                      aria-hidden="true"
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                  ) : null
                }
              >
                {isLoading ? t("form.sending") : t("form.send")}
              </Button>

              <ul className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-border bg-bg-primary px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors duration-200 hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
