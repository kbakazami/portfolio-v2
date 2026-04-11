const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/kbakazami" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kbakazami" },
  { label: "Email", href: "mailto:contact@kbakazami.dev" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-text-secondary md:flex-row">
        <span>© {new Date().getFullYear()} kba.dev — built with Next.js &amp; Sanity</span>
        <ul className="flex flex-wrap items-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[color:var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
