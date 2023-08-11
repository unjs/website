<script lang="ts" setup>
const website = useWebsite()
const github = website.value.socials.github
const twitter = website.value.socials.twitter

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('/').where({ _path: { $and: [{ $ne: '/' }] } })))

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
  <header h-3.75rem p="x-3 md:x-6 y-3" rounded-4 border="~ light" bg="white" flex="~ row items-center" text-gray-900>
    <div flex="1 ~">
      <NuxtLink to="/">
        <AppLogo content-class="lg:hidden xl:block" />
      </NuxtLink>
    </div>
    <nav v-if="navigation" flex="lg:~ 1 justify-center" class="hidden">
      <ul flex="~" gap="3" leading-5 class="text-[1.125rem]">
        <li v-for="item in navigation" :key="item._path">
          <NuxtLink v-if="!item.wip" :to="item._path" class="py-[0.375rem] rounded-[0.375rem]" px-3 flex="~" gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150 active-class="bg-primary bg-opacity-30">
            <span :class="item.icon" w-5 h-5 block />
            <span>
              {{ item.title }}
            </span>
          </NuxtLink>
          <span v-else class="py-[0.375rem] rounded-[0.375rem]" px-3 flex="~" gap-2 opacity-50 cursor-pointer>
            <span :class="item.icon" w-5 h-5 block />
            <span>
              {{ item.title }}
            </span>
          </span>
        </li>
      </ul>
    </nav>
    <div flex="~ lg:1 justify-end items-center" gap-3>
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
      <NuxtLink :title="twitter.name" :rel="twitter.rel" :target="twitter.target" :to="twitter.url" class="hidden" lg:block w-7 h-7 :class="twitter.icon" />
      <NuxtLink :title="github.name" :rel="github.rel" :target="github.target" :to="github.url" class="hidden" lg:block w-7 h-7 :class="github.icon" />
    </div>
  </header>
  <AppNavigationDialog v-if="navigation" v-model:open="openNavigation" :navigation="navigation" />
  <AppSearch v-model:open="openSearch" />
</template>
