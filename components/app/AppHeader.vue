<script lang="ts" setup>
const website = useWebsite()
const github = website.value.socials.github
const x = website.value.socials.x

const { data: navigation } = await useAsyncData('content:navigation', () => fetchContentNavigation(queryContent('/')), {
  transform: data => data.filter(item => item._path !== '/').map((item) => {
    const { title, icon, _path } = item
    return { title, icon, _path }
  }),
})

const openNavigation = ref(false)
const openSearch = ref(false)

useEventListener('keydown', (event) => {
  // Windows: Ctrl + K
  // Mac: Cmd + K
  if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    openSearch.value = true
  }
})
</script>

<template>
  <header class="h-[3.75rem] px-3 md:px-6 py-3 rounded-4 border border-zinc-100 bg-white flex flex-row items-center text-zinc-900">
    <div class="grow flex">
      <NuxtLink to="/?utm_source=unjs.io&utm_medium=header-icon">
        <AppLogo />
      </NuxtLink>
    </div>
    <nav v-if="navigation" class="hidden grow lg:flex justify-center">
      <ul class="text-[1.125rem] flex gap-4 leading-5">
        <li v-for="item in navigation" :key="item._path">
          <NuxtLink :to="item._path" class="py-[0.375rem] px-3 rounded-[0.375rem] flex gap-2 hover:bg-primary hover:bg-opacity-30 transitino ease-in duration-150" active-class="bg-primary bg-opacity-30">
            <span :class="item.icon" w-5 h-5 block />
            <span>
              {{ item.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex justify-end items-center lg:grow gap-3">
      <UButton size="md" icon="i-heroicons-magnifying-glass-20-solid" color="primary" variant="ghost" @click="openSearch = true">
        Search
      </UButton>
      <button type="button" p="x-0.375rem lg:x-3 y-0.125rem lg:y-0.375rem" rounded="0.375rem" flex="~ items-center" gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150 @click="openSearch = true">
        <span class="i-heroicons-magnifying-glass-20-solid?mask" h-7 w-7 lg:h-5 lg:w-5 />
        <span sr-only lg:not-sr-only>
          Search
        </span>
      </button>
      <button type="button" p="x-0.375rem lg:x-3 y-0.125rem lg:y-0.375rem" rounded="0.375rem" flex="~ items-center" lg:hidden gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150 @click="openNavigation = true">
        <span class="i-heroicons:bars-3-bottom-right?mask" h-8 w-8 lg:hidden />
        <span sr-only>
          Menu
        </span>
      </button>
      <UButton size="md" variant="ghost" color="white" :icon="x.icon" :to="x.url" :target="x.target" :title="x.name"></UButton>
      <UButton size="md" variant="ghost" color="white" :icon="github.icon" :to="github.url" :target="github.target" :title="github.name"></UButton>
    </div>
  </header>
  <AppNavigationDialog v-if="navigation" v-model:open="openNavigation" :navigation="navigation" />
  <AppSearchDialog v-model:open="openSearch" />
</template>
