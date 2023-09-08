<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
  </Head>
  <div m="y-6 md:y-10" p="x-4 md:x-6 t-6 md:t-10 b-10 md:b-20" grid="~ cols-1 xl:cols-[1fr_auto_1fr] items-start" gap="6 xl:8" rounded="4" bg="white">
    <div flex="~ justify-start">
      <NuxtLink to="/packages" flex="~ items-center" gap="1" class="group">
        <span i-heroicons-chevron-left-20-solid block w-4 h-4 text="gray-400 group-hover:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">
          Packages
        </span>
      </NuxtLink>
    </div>

    <PackageMetadata row-start-3 xl="row-start-1 col-start-3" xl:sticky top="4" :documentation="page.documentation" :github="page.github" :npm="page.npm" />

    <main max-w-screen-md lg="mx-auto w-screen-md" xl="row-start-1 col-start-2">
      <article>
        <PackageHeader :name="page.title" :description="page.description" />

        <div mt-6 xl:mt-12 prose prose-gray max-w-none>
          <slot />
        </div>
      </article>
    </main>

    <PackageLatestNews xl="row-start-2 col-start-2" :name="page.title" />
  </div>
</template>
