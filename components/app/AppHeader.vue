<script lang="ts" setup>
import { Popover, PopoverButton } from '@headlessui/vue'

const website = useWebsite()
const github = website.value.socials.github

const packagesPath = /^\/packages/
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('/').where({ _path: { $and: [{ $ne: '/' }, { $ne: packagesPath }] } })))

const open = ref(false)
</script>

<template>
  <header h-3.75rem px-6 py-3 rounded-4 border="~ light" bg="white" flex="~ row items-center" text-gray-900>
    <NuxtLink flex="1" to="/">
      <AppLogo />
    </NuxtLink>
    <nav v-if="navigation" flex="md:~ 1 justify-center" hidden>
      <ul flex="~" gap-3 leading-5 class="text-[1.125rem]">
        <li v-for="item in navigation" :key="item._path">
          <NuxtLink :to="item._path" class="py-[0.375rem] rounded-[0.375rem]" px-3 flex="~" gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150 active-class="bg-primary bg-opacity-30">
            <span :class="item.icon" w-5 h-5 block />
            <span>
              {{ item.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div flex="~ 1 justify-end items-center" gap-3>
      <button type="button" p="x-0.375rem md:x-3 y-0.125rem md:y-0.375rem" rounded="0.375rem" flex="~ items-center" gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150>
        <span class="i-heroicons-magnifying-glass-20-solid?mask" h-7 w-7 md:h-5 md:w-5 />
        <span sr-only md:not-sr-only>
          Search
        </span>
      </button>
      <Popover>
        <PopoverButton type="button" p="x-0.375rem md:x-3 y-0.125rem md:y-0.375rem" rounded="0.375rem" flex="~ items-center" md:hidden gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150 @click="open = true">
          <span class="i-heroicons:bars-3-bottom-right?mask" h-8 w-8 md:hidden />
          <span sr-only>
            Menu
          </span>
        </PopoverButton>
        <AppNavigationPopover v-if="navigation" v-model:open="open" :navigation="navigation" />
      </Popover>
      <NuxtLink :title="github.name" :rel="github.rel" :target="github.target" :to="github.url" hidden md:block w-7 h-7 :class="github.icon" />
    </div>
  </header>
</template>
