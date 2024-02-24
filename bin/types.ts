// https://github.com/unjs/ungh/tree/main#reposownername
export interface GitHubRepo {
  id: number
  name: string
  repo: string
  description: string
  createdAt: string
  updatedAt: string
  pushedAt: string
  stars: number
  watchers: number
  forks: number
}

// https://github.com/unjs/ungh?tab=readme-ov-file#reposownernamereleases
export interface GithubRelease {
  id: number
  tag: string
  author: string
  name: string
  draft: boolean
  prerelease: boolean
  createdAt: string
  publishedAt: string
  markdown: string
  html: string
}

// https://github.com/unjs/ungh#reposownernamefilesbranch
export interface GitHubFile {
  path: string
  mode: string
  sha: string
  size: number
}

export interface ContentPackage {
  title: string
  description: string
  github: {
    owner: string
    repo: string
  }
  npm?: {
    name: string
  }
  documentation: string
  examples?: {
    link: string | null
    page: boolean
  }
  playgrounds?: Record<string, string>
}
