<script lang="ts" setup>
const { page } = useContent()

const documentation = computed(() => page.value.documentation)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
  </Head>
  <div m="y-6 md:y-10" p="x-4 md:x-6 t-6 md:t-10 b-10 md:b-20" grid="~ cols-1 md:cols-[1fr_auto]  xl:cols-[1fr_auto_1fr] items-start" gap="6 xl:x-8 xl:y-12" rounded="4" bg="white">
    <div flex="~ justify-start">
      <NuxtLink to="/packages" flex="~ items-center" gap="1" class="group">
        <span i-heroicons-chevron-left-20-solid block w-4 h-4 text="gray-400 group-hover:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">
          Packages
        </span>
      </NuxtLink>
    </div>

    <nav md="row-start-2 col-start-2" xl="row-start-1 col-start-3" xl:sticky top="4" flex="~ col items-center" gap="6 xl:4">
      <NuxtLink :to="documentation" target="_blank" rel="noopener" w-full p="x-3 y-2" rounded="0.375rem" bg="primary hover:op-80" flex="~ justify-center items-center" gap-2 text-gray-900 transition="~ ease-in duration-150">
        <span>
          Documentation
        </span>
        <span w-4 h-4 i-heroicons-arrow-top-right-on-square-20-solid />
      </NuxtLink>
      <hr w="1/2" rounded="full" border="~ gray-900 op-20">
      <div w-full>
        <PackagesExternalLink :to="toGitHubRepo(page.github.owner, page.github.repo)">
          <span w-4 h-4 block i="logos-github-icon?mask" />
          <span>
            View source
          </span>
        </PackagesExternalLink>
        <PackagesExternalLink :to="toGitHubLatestRelease(page.github.owner, page.github.repo)">
          <span w-4 h-4 block i="logos-github-icon?mask" />
          <span>
            Latest release
          </span>
        </PackagesExternalLink>
        <PackagesExternalLink :to="toGitHubIssue(page.github.owner, page.github.repo)">
          <span w-4 h-4 block i="logos-github-icon?mask" />
          <span>
            Report an issue
          </span>
        </PackagesExternalLink>
      </div>
      <hr w="1/2" rounded="full" border="~ gray-900 op-20">
      <div w-full>
        <PackagesExternalLink :to="toNpmPackage(page.npm.name)">
          <span w-4 h-4 block i-vscode-icons-file-type-npm />
          <span>
            Discover the package
          </span>
        </PackagesExternalLink>
      </div>
    </nav>

    <main row-start-2 md="row-start-1 col-start-2" max-w-screen-md lg="mx-auto w-screen-md" xl="row-start-1 col-start-2">
      <article>
        <header flex="~ col items-start" gap="1">
          <div flex="~ items-center" gap="4">
            <img :src="toPackageLogo(page.title)" :alt="`Logo from ${page.title}`" width="28" height="28" w-7 h-7>
            <h1 text="gray-900 2xl md:3xl" font="bold" tracking="wide">
              {{ page.title }}
            </h1>
          </div>
          <p gray="gray-700" font="italic medium">
            {{ page.description }}
          </p>
        </header>
        <div mt-6 xl:mt-12 prose prose-gray max-w-none>
          <slot />
        </div>
      </article>
    </main>

    <PackagesLatestNews row-start-4 md="row-start-3 col-start-2" xl="row-start-2 col-start-2" :name="page.title" />
  </div>
</template>
