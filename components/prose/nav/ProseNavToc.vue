<script lang="ts" setup>
import type { Toc } from '@nuxt/content/dist/runtime/types'

const toc = inject<Toc>('toc')

const { activeHeadings } = useScrollSpyHeadings()

function activeClass(id: string): string {
  return activeHeadings.value.includes(id) ? '!text-primary-700' : '' // Important to override text-zinc-900
}
</script>

<template>
  <ProseNavGroup>
    <template #title>
      On this page
    </template>
    <template #links>
      <ol v-if="toc" class=" text-zinc-500">
        <li v-for="link in toc.links" :key="link.id">
          <ProseNavGroupLink :to="`#${link.id}`"  :class="activeClass(link.id)">
            {{ link.text }}
          </ProseNavGroupLink>
        </li>
      </ol>
    </template>
  </ProseNavGroup>
</template>
