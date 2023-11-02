<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const { page } = useContent()

const { data: readme } = await useFetch<ParsedContent>(`/api/github/${page.value.github.owner}/${page.value.github.repo}/readme`)

if (!readme.value) {
  throw createError({
    statusCode: 500,
    message: 'No readme found',
  })
}

const { data: metadata } = await useFetch(`/api/github/${page.value.github.owner}/${page.value.github.repo}/metadata`)

if (!metadata.value) {
  throw createError({
    statusCode: 500,
    message: 'No metadata found',
  })
}

let monthlyDownloads: number | null = null
if (page.value.npm) {
  const { data } = await useFetch(`/api/npm/${page.value.npm.name}/monthly-downloads`)

  if (!data.value) {
    throw createError({
      statusCode: 500,
      message: 'No monthly downloads found',
    })
  }

  monthlyDownloads = data.value
}

const hasResources = computed(() => {
  return page.value.npm || page.value.playgrounds
})

defineShortcuts({
  meta_g: {
    handler: () => {
      window.open(toGitHubRepo(page.value.github.owner, page.value.github.repo), '_blank')
    },
  },
})
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
  </Head>

  <Prose class="my-6 md:my-10">
    <template #header>
      <!-- rework to have the same title size of blog post -->
      <PackageHeader :name="page.title" :description="page.description" />
    </template>

    <ContentRendererMarkdown :value="readme!" />

    <template #nav>
      <UButton :to="page.documentation" rel="noopener" size="lg" color="gray" :ui="{ base: 'w-full justify-center' }">
        Documentation
      </UButton>
      <ProseNavGroup no-disclosure>
        <template #links>
          <div class="flex flex-col gap-1">
            <ProseNavGroupLink label="Stars" :to="toGitHubRepo(page.github.owner, page.github.repo)" target="_blank" icon="i-heroicons-star-solid" no-external>
              {{ formatNumber(metadata!.stars) }}
            </ProseNavGroupLink>
            <ProseNavGroupLink v-if="monthlyDownloads" label="Monthly Downloads" :to="toGitHubRepo(page.github.owner, page.github.repo)" target="_blank" icon="i-heroicons-arrow-trending-up-solid" no-external>
              {{ formatNumber(monthlyDownloads) }}
            </ProseNavGroupLink>
            <ProseNavGroupLink v-if="metadata!.latestRelease" label="Latest Version" :to="toGitHubLatestRelease(page.github.owner, page.github.repo)" target="_blank" icon="i-heroicons-tag-solid" no-external>
              {{ metadata!.latestRelease }}
            </ProseNavGroupLink>
          </div>
        </template>
      </ProseNavGroup>
      <UDivider />
      <ProseNavGroup icon="i-simple-icons-github">
        <template #title>
          GitHub
        </template>
        <template #links>
          <ProseNavGroupLink :to="toGitHubRepo(page.github.owner, page.github.repo)" target="_blank" icon="i-simple-icons-github">
            View source
          </ProseNavGroupLink>
          <ProseNavGroupLink
            :to="toGitHubIssue(page.github.owner, page.github.repo)" target="_blank"
            icon="i-simple-icons-github"
          >
            Report an issue
          </ProseNavGroupLink>
        </template>
      </ProseNavGroup>
      <UDivider />
      <template v-if="hasResources">
        <ProseNavGroup icon="i-heroicons-beaker-solid">
          <template #title>
            Resources
          </template>
          <template #links>
            <ProseNavGroupLink v-if="page.npm" :to="toNpmPackage(page.npm.name)" target="_blank" icon="i-simple-icons-npm">
              Discover on npm
            </ProseNavGroupLink>
            <ProseNavGroupLink v-if="page.playgrounds?.stackblitz" :to="page.playgrounds.stackblitz" target="_blank" icon="i-simple-icons-stackblitz">
              Open on Stackblitz
            </ProseNavGroupLink>
            <ProseNavGroupLink v-if="page.playgrounds?.codesandbox" :to="page.playgrounds.codesandbox" target="_blank" icon="i-simple-icons-codesandbox">
              Open on CodeSandbox
            </ProseNavGroupLink>
          </template>
        </ProseNavGroup>
        <UDivider />
      </template>
      <ProseNavGroup icon="i-heroicons-sparkles-solid">
        <template #title>
          <div class="flex items-center gap-1">
            <span>
              Contributors
            </span>
            <UBadge color="gray" variant="solid" size="xs">
              {{ metadata!.contributors.length }}
            </UBadge>
          </div>
        </template>
        <template #links>
          <ol>
            <li v-for="contributor in metadata!.contributors" :key="contributor.id">
              <ProseNavGroupLink :to="`https://github.com/${contributor.username}`" no-external>
                <div class="flex items-center gap-1">
                  <UAvatar :src="`https://github.com/${contributor.username}.png`" :alt="`Avatar of ${contributor.username}`" size="3xs" />
                  {{ contributor.username }}
                </div>
              </ProseNavGroupLink>
            </li>
          </ol>
        </template>
      </ProseNavGroup>
    </template>
  </Prose>

  <!-- <PackageLatestNews class="xl:row-start-2 col-start-2" :name="page.title" /> -->
</template>
