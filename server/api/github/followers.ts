export default defineEventHandler(async () => {
  const org = await $fetch<{ followers: number }>('https://api.github.com/orgs/unjs')

  return org.followers
})
