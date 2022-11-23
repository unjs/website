import { load } from 'cheerio'
import { parseURL, joinURL } from 'ufo'

const host = 'https://github.com/'
const branch = "main"

const isRelativeURL = (url: string) => {
  const URL = parseURL(url)
  return !URL.host && URL.pathname && !URL.pathname.startsWith('//')
}

export const buildGitHubReadmeHTML = (html: string, repo: string) => {
  const $ = load(html)

  // modify image source with GitHub relative path
  $('img').attr('src', (_i, src) => {
    return isRelativeURL(src) ? joinURL(host, repo, "raw", branch, src) : src
  })

  // modify links with GitHub relative path
  $('a').attr('href', (_i, href) => {
    return isRelativeURL(href) ? joinURL(host, repo, "blob", branch, href) : href
  })

  return $.html()
}
