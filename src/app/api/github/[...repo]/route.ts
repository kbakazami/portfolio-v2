import { NextResponse } from "next/server";

import { fetchGithubStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  context: { params: Promise<{ repo: string[] }> },
) {
  const { repo: segments } = await context.params;

  if (!Array.isArray(segments) || segments.length < 2) {
    return NextResponse.json(
      { error: "Expected /api/github/{owner}/{repo}" },
      { status: 400 },
    );
  }

  const [owner, repo] = segments;
  const stats = await fetchGithubStats(owner, repo);

  if (!stats) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(stats);
}
