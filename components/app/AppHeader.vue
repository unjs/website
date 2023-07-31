<script lang="ts" setup>
const website = useWebsite()
const github = website.value.socials.github

const packagesPath = /^\/packages/

const navigation = await fetchContentNavigation(queryContent('/').where({ _path: { $and: [{ $ne: '/' }, { $ne: packagesPath }] } }))
</script>

<template>
  <header px-6 py-3 rounded-4 border border-light bg-white flex="~ row items-center" text-gray-900 class="h-[3.75rem]">
    <NuxtLink flex="1" to="/">
      <AppLogo />
    </NuxtLink>
    <nav flex="~ 1 justify-center">
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
      <button class="py-[0.375rem] rounded-[0.375rem]" px-3 flex="~ items-center" gap-2 hover:bg-primary hover:bg-opacity-30 transition ease-in duration-150>
        <span class="i-heroicons-magnifying-glass-20-solid?mask" />
        <span>
          Search
        </span>
      </button>
      <NuxtLink :title="github.name" :rel="github.rel" :target="github.target" :to="github.url" block w-7 h-7 :class="github.icon" />
    </div>
  </header>
</template>
