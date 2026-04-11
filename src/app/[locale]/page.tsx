import { setRequestLocale } from "next-intl/server";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { loadPortfolioData } from "@/lib/portfolio-data";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await loadPortfolioData();

  return (
    <>
      <Hero data={data.hero} />
      <About data={data.about} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Timeline data={data.timeline} />
      <Contact data={data.contact} />
    </>
  );
}
