<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const slug = route.params.slug as string

const { data: unjsPackage, error: unjsPackageError } = await useAsyncData(`packages:${slug}`, () => queryContent(`/packages/${slug}`).only(['_path', 'title', 'description', 'examples', 'github']).findOne(), { default: () => {} })

if (unjsPackageError.value) {
  throw createError({
    statusCode: 404,
    message: 'Package not found',
    fatal: true,
  })
}

if (!unjsPackage.value?.examples) {
  throw createError({
    statusCode: 404,
    message: 'Examples not found',
    fatal: true,
  })
}

const { data: page, error } = await useFetch<{ path: string, name: string, filename: string, id: string, content: ParsedContent }[]>(`/api/github/unjs/${slug}/examples`, { default: () => [] })

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Examples not found',
    fatal: true,
  })
}

useHead({
  templateParams: {
    subtitle: 'Packages',
  },
  titleTemplate: '%s %separator %subtitle %separator %siteName',
})
useSeoMeta({
  title: `Examples for ${unjsPackage.value?.title}`,
  description: `Learn usage of ${unjsPackage.value?.title} through a complete set of examples.`,
})

const toc = computed(() => {
  const links = page.value.map(example => ({
    id: example.id,
    depth: 2,
    // Capitalize each word
    text: example.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  }))

  return {
    title: '',
    searchDepth: 2,
    depth: 2,
    links,
  }
})
</script>

<template>
  <Main v-if="page && unjsPackage">
    <Prose :toc="toc">
      <template #header>
        <PackageHeader v-if="unjsPackage" :name="unjsPackage.title" :title="`Examples for ${unjsPackage.title}`" :description="description" />
      </template>

      <template v-for="example in page" :key="example.id">
        <div class="mb-8 flex justify-between items-center">
          <h2 :id="example.id">
            <NuxtLink :to="`#${example.id}`">
              {{ example.name }}
            </NuxtLink>
          </h2>
          <UButton class="not-prose" color="white" variant="solid" icon="i-simple-icons-github" label="GitHub" :to="`${unjsPackage.examples.link}/${example.filename}`" target="_blank" />
        </div>
        <ContentRendererMarkdown :value="example.content" data-example />
      </template>

      <template #nav>
        <!-- TODO: add resources to add a link to stackblitz -->
        <template v-if="unjsPackage">
          <UDivider />
          <ArticleProseNavGroupPackages :packages="[unjsPackage]" title="Package" />
        </template>
        <UDivider />

        <ProseNavGroup icon="i-simple-icons-github">
          <template #title>
            GitHub
          </template>
          <template #links>
            <ProseNavGroupLink v-if="unjsPackage.examples.link" :to="unjsPackage.examples.link" target="_blank" icon="i-simple-icons-github">
              Examples
            </ProseNavGroupLink>
            <ProseNavGroupLink
              :to="toGitHubIssue(unjsPackage.github.owner, unjsPackage.github.repo)" target="_blank"
              icon="i-simple-icons-github"
            >
              Report an issue
            </ProseNavGroupLink>
          </template>
        </ProseNavGroup>
        <UDivider />
        <ArticleProseNavGroupCommunity />
      </template>
    </Prose>
  </Main>
</template>

<style scoped>
:deep(h2) {
  margin-bottom: 0;
  text-transform: capitalize;
}

:deep([data-example]:last-of-type > div) {
  margin-bottom: 0;
}
</style>
