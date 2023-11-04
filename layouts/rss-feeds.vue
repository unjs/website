<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <div class="my-6 md:my-10 px-4 md:px-6 pt-6 md:pt-10 pb-10 md:pb-20 rounded-2xl bg-white gap-6 md:gap-8">
    <main class="max-w-[768px] mx-auto">
      <header>
        <h1 class="text-2xl md:text-3xl text-zinc-900 font-bold tracking-wide">
          {{ page.title }}
        </h1>
      </header>

      <AppContent class="mt-6 xl:mt-12 max-w-none">
        <slot />
      </AppContent>
    </main>
  </div>
</template>
