<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
  </Head>
  <div class="my-6 md:my-10 px-4 md:px-6 pt-6 md:pt-10 mb-10 md:pb-20 grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] items-start gap-6 xl:gap-8 rounded-2xl bg-white">
    <div class="flex justify-start">
      <NuxtLink to="/packages" class="group flex items-center gap-1">
        <span class="i-heroicons-chevron-left-20-solid block w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition ease-in" />
        <span class="text-sm text-zinc-600">
          Packages
        </span>
      </NuxtLink>
    </div>

    <PackageMetadata class="row-start-3 xl:row-start-1 xl:col-start-3 xl:sticky top-4" :documentation="page.documentation" :github="page.github" :npm="page.npm" />

    <main class="max-w-screen-md lg:mx-auto lg:w-[768px] xl:row-start-1 xl:col-start-2">
      <article>
        <PackageHeader :name="page.title" :description="page.description" />

        <AppContent class="mt-6 xl:mt-12 max-w-none">
          <slot />
        </AppContent>
      </article>
    </main>

    <PackageLatestNews class="xl:row-start-2 col-start-2" :name="page.title" />
  </div>
</template>
