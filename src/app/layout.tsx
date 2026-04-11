import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kba — Full-Stack Developer",
  description:
    "Portfolio de Kba — développeur full-stack, futur Tech Lead / DevOps / Consultant Technique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jetbrainsMono.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
