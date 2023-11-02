<script lang="ts" setup>
import type { Toc } from '@nuxt/content/dist/runtime/types'

const toc = inject<Toc>('toc')

const { activeHeadings } = useScrollSpyHeadings()

function activeClass(id: string): string {
  return activeHeadings.value.includes(id) ? '!text-primary-700' : '' // Important to override text-zinc-900
}
</script>

<template>
  <p class="text-zinc-900 font-semibold text-sm">
    On this page
  </p>
  <ol v-if="toc" class="mt-2 text-sm text-zinc-500">
    <li v-for="link in toc.links" :key="link.id">
      <NuxtLink :to="`#${link.id}`" class="inline-block py-1 hover:text-zinc-900 transition ease-in" :class="activeClass(link.id)">
        {{ link.text }}
      </NuxtLink>
    </li>
  </ol>
</template>
