import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <section
      id="top"
      className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24"
    >
      <span className="font-mono text-sm text-text-secondary">
        &gt; booting portfolio...
      </span>
      <h1 className="font-mono text-4xl font-semibold tracking-tight sm:text-6xl">
        {t("name")}
      </h1>
      <p className="max-w-md text-center text-text-secondary">{t("subtitle")}</p>
    </section>
  );
}
