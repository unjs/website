<script lang="ts" setup>
import type { Toc } from '@nuxt/content/dist/runtime/types'

const toc = inject<Toc>('toc')
</script>

<template>
  <p class="flex items-center gap-2 text-right">
    <span class="i-heroicons-list-bullet-20-solid block w-4 h-4 text-zinc-400 group-hover/nav:text-zinc-600 transition ease-in" />
    <span class="text-zinc-600 text-sm">On this page</span>
  </p>
  <ol v-if="toc" class="mt-4 flex flex-col items-start text-sm text-zinc-400">
    <li v-for="link in toc.links" :key="link.id">
      <NuxtLink :to="`#${link.id}`" class="group block py-1">
        <span class="border-b border-zinc-400 group-hover:zinc-700 group-hover:zinc-700 transition ease-in leading-6">
          {{ link.text }}
        </span>
      </NuxtLink>
    </li>
  </ol>
</template>
