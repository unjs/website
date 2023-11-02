export function toGitHubRepo(owner: string, repo: string) {
  return `https://github.com/${owner}/${repo}`
}

export function toGitHubLatestRelease(owner: string, repo: string) {
  return `https://github.com/${owner}/${repo}/releases/latest`
}

export function toGitHubIssue(owner: string, repo: string) {
  return `https://github.com/${owner}/${repo}/issues/new/choose`
}

export function toEditPage(path: string) {
  return `https://github.com/unjs/website/edit/main/content/${path}`
}
