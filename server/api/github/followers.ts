export default defineEventHandler(async () => {
  const org = await cachedUnJSGitHubOrg()

  return org.followers
})
