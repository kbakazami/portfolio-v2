import { setRequestLocale } from "next-intl/server";

import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
    </>
  );
}
