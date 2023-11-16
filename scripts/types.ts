// https://github.com/unjs/ungh/tree/main#reposownername
export interface GitHubRepo {
  'id': number
  'name': string
  'repo': string
  'description': string
  'createdAt': string
  'updatedAt': string
  'pushedAt': string
  'stars': number
  'watchers': number
  'forks': number
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
