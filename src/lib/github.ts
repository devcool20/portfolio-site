export type GitHubPullRequestStatus = "open" | "merged" | "closed";

export type GitHubPullRequest = {
  title: string;
  repo: string;
  url: string;
  number: number;
  status: GitHubPullRequestStatus;
  createdAt: string;
  comments: number;
  authorAssociation: string;
};

export type GitHubContributionSummary = {
  total: number;
  merged: number;
  open: number;
  closed: number;
  uniqueRepos: number;
};

export type GitHubContributionData = {
  prs: GitHubPullRequest[];
  summary: GitHubContributionSummary;
  error?: string;
};

type GitHubSearchIssue = {
  title?: string;
  html_url?: string;
  number?: number;
  state?: "open" | "closed";
  created_at?: string;
  comments?: number;
  author_association?: string;
  repository_url?: string;
  pull_request?: {
    merged_at?: string | null;
  };
};

type GitHubSearchResponse = {
  total_count?: number;
  items?: GitHubSearchIssue[];
  message?: string;
};

const GITHUB_SEARCH_URL =
  "https://api.github.com/search/issues?q=is%3Apr+author%3Adevcool20+is%3Apublic&sort=updated&order=desc&per_page=30";

const OPEN_SOURCE_REPO_PRIORITY = [
  "different-ai/openwork",
  "inthhq/dsar",
  "c15t/c15t",
  "mem0ai/mem0",
  "InsForge/InsForge",
];

function getStatus(item: GitHubSearchIssue): GitHubPullRequestStatus {
  if (item.pull_request?.merged_at) return "merged";
  if (item.state === "closed") return "closed";
  return "open";
}

function normalizePullRequest(item: GitHubSearchIssue): GitHubPullRequest | null {
  const repo = item.repository_url?.replace("https://api.github.com/repos/", "");

  if (!item.title || !item.html_url || !item.number || !item.created_at || !repo) {
    return null;
  }

  return {
    title: item.title,
    repo,
    url: item.html_url,
    number: item.number,
    status: getStatus(item),
    createdAt: item.created_at,
    comments: item.comments ?? 0,
    authorAssociation: item.author_association ?? "NONE",
  };
}

function summarizePullRequests(
  prs: GitHubPullRequest[],
  total: number,
): GitHubContributionSummary {
  const merged = prs.filter((pr) => pr.status === "merged").length;
  const open = prs.filter((pr) => pr.status === "open").length;
  const closed = prs.filter((pr) => pr.status === "closed").length;

  return {
    total,
    merged,
    open,
    closed,
    uniqueRepos: new Set(prs.map((pr) => pr.repo)).size,
  };
}

function prioritizeOpenSourceRepos(prs: GitHubPullRequest[]) {
  return [...prs].sort((a, b) => {
    const aPriority = OPEN_SOURCE_REPO_PRIORITY.indexOf(a.repo);
    const bPriority = OPEN_SOURCE_REPO_PRIORITY.indexOf(b.repo);
    const aScore = aPriority === -1 ? OPEN_SOURCE_REPO_PRIORITY.length : aPriority;
    const bScore = bPriority === -1 ? OPEN_SOURCE_REPO_PRIORITY.length : bPriority;

    if (aScore !== bScore) return aScore - bScore;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function getGitHubContributions(): Promise<GitHubContributionData> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "devcool20-portfolio",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_SEARCH_URL, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        prs: [],
        summary: summarizePullRequests([], 0),
        error: `GitHub returned ${response.status}`,
      };
    }

    const payload = (await response.json()) as GitHubSearchResponse;
    const prs = (payload.items ?? [])
      .map(normalizePullRequest)
      .filter((pr): pr is GitHubPullRequest => Boolean(pr));
    const prioritizedPrs = prioritizeOpenSourceRepos(prs);

    return {
      prs: prioritizedPrs,
      summary: summarizePullRequests(prioritizedPrs, payload.total_count ?? prioritizedPrs.length),
      error: payload.message,
    };
  } catch (error) {
    return {
      prs: [],
      summary: summarizePullRequests([], 0),
      error: error instanceof Error ? error.message : "Unable to load GitHub PRs",
    };
  }
}
