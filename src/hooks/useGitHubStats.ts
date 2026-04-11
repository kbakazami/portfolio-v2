"use client";

import { useEffect, useState } from "react";

import { parseGithubUrl, type GithubStats } from "@/lib/github";

export interface UseGitHubStatsResult {
  data: GithubStats | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGitHubStats(
  repoUrl: string | undefined,
): UseGitHubStatsResult {
  const parsed = parseGithubUrl(repoUrl);
  const key = parsed ? `${parsed.owner}/${parsed.repo}` : null;

  const [data, setData] = useState<GithubStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(key));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!key) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/github/${key}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub stats request failed: ${res.status}`);
        return (await res.json()) as GithubStats | null;
      })
      .then((value) => {
        if (cancelled) return;
        setData(value);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error("Unknown error"));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return { data, isLoading, error };
}
