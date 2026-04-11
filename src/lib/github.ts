const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

// Rough average bytes per line of source code, used to approximate LOC
// from GitHub's /languages endpoint (which returns bytes per language).
const BYTES_PER_LINE: Record<string, number> = {
  TypeScript: 35,
  JavaScript: 30,
  TSX: 35,
  JSX: 30,
  Python: 28,
  Go: 25,
  Rust: 30,
  Java: 32,
  Kotlin: 32,
  Swift: 32,
  Ruby: 26,
  PHP: 30,
  "C++": 28,
  C: 26,
  "C#": 32,
  HTML: 40,
  CSS: 28,
  SCSS: 28,
  Shell: 24,
  Vue: 32,
  Svelte: 32,
};

const DEFAULT_BYTES_PER_LINE = 30;

export interface GithubStats {
  commits: number;
  branches: number;
  stars: number;
  language: string | null;
  loc: number;
}

export interface ParsedRepo {
  owner: string;
  repo: string;
}

export function parseGithubUrl(url: string | undefined): ParsedRepo | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!/github\.com$/i.test(parsed.hostname)) return null;
    const segments = parsed.pathname.replace(/^\/|\/$/g, "").split("/");
    if (segments.length < 2) return null;
    const [owner, repo] = segments;
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function ghFetch(path: string): Promise<Response> {
  return fetch(`${GITHUB_API}${path}`, {
    headers: buildHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

function approximateLoc(languages: Record<string, number>): number {
  let total = 0;
  for (const [lang, bytes] of Object.entries(languages)) {
    const perLine = BYTES_PER_LINE[lang] ?? DEFAULT_BYTES_PER_LINE;
    total += Math.round(bytes / perLine);
  }
  return total;
}

export async function fetchGithubStats(
  owner: string,
  repo: string,
): Promise<GithubStats | null> {
  const repoRes = await ghFetch(`/repos/${owner}/${repo}`);
  if (!repoRes.ok) return null;

  const repoJson = (await repoRes.json()) as {
    stargazers_count?: number;
    forks_count?: number;
    language?: string | null;
    private?: boolean;
  };

  if (repoJson.private) return null;

  const [contributorsRes, branchesRes, languagesRes] = await Promise.all([
    ghFetch(`/repos/${owner}/${repo}/contributors?per_page=100&anon=false`),
    ghFetch(`/repos/${owner}/${repo}/branches?per_page=100`),
    ghFetch(`/repos/${owner}/${repo}/languages`),
  ]);

  let commits = 0;
  if (contributorsRes.ok) {
    const contributors = (await contributorsRes.json()) as Array<{
      login?: string;
      contributions?: number;
    }>;
    const ownerEntry = contributors.find(
      (c) => c.login?.toLowerCase() === owner.toLowerCase(),
    );
    commits =
      ownerEntry?.contributions ??
      contributors.reduce((sum, c) => sum + (c.contributions ?? 0), 0);
  }

  let branches = 0;
  if (branchesRes.ok) {
    const branchesJson = (await branchesRes.json()) as unknown[];
    branches = branchesJson.length;
  }

  let loc = 0;
  if (languagesRes.ok) {
    const languages = (await languagesRes.json()) as Record<string, number>;
    loc = approximateLoc(languages);
  }

  return {
    commits,
    branches,
    stars: repoJson.stargazers_count ?? 0,
    language: repoJson.language ?? null,
    loc,
  };
}
