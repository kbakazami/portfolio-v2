import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export async function GET(req: Request) {
  if (!sanityClient) {
    return NextResponse.json(
      { error: "Sanity client not configured (missing projectId or dataset)" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") ?? "fr";

  try {
    // Fetch with no cache to get the absolute latest data
    const settings = await sanityClient.fetch(
      siteSettingsQuery,
      { locale },
      { next: { revalidate: 0 } },
    );

    // Also fetch without the language filter to see all siteSettings documents
    const allSettings = await sanityClient.fetch(
      `*[_type == "siteSettings"]{ _id, siteTitle, description, language, heroTexts }`,
      {},
      { next: { revalidate: 0 } },
    );

    return NextResponse.json({
      locale,
      filteredResult: settings,
      allDocuments: allSettings,
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "set" : "MISSING",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "MISSING",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}
