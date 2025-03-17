<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

defineProps<{
  package: RelationPackage | null
}>()

const emits = defineEmits<{
  viewRelations: [string]
}>()

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <USlideover v-model="open">
    <UCard v-if="package" class="h-screen flex flex-col flex-1" :ui="{ body: { base: 'flex-1 overflow-y-auto' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', header: { base: 'flex flex-col gap-1' } }">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">
            {{ package.name }}
          </h2>

          <UTooltip v-if="package.source === 'unjs'" text="View on UnJS">
            <!-- TODO: wait for https://github.com/nuxt/nuxt/pull/25658 -->
            <!-- <UButton aria-label="View on UnJS" :to="`/packages/${package.name}?utm_source=unjs&utm_medium=graph-slideover&utm_campaign=unjs.io`" variant="ghost" color="gray"> -->
            <UButton aria-label="View on UnJS" :to="`/packages/${package.name}`" variant="ghost" color="gray">
              <template #leading>
                <UAvatar :src="toPackageLogo(package.name)" alt="UnJS Logo" size="xs" :ui="{ rounded: 'rounded-sm' }" />
              </template>
            </UButton>
          </UTooltip>
          <UTooltip v-if="package.source === 'npm'" text="View on npm">
            <UButton icon="i-simple-icons-npm" aria-label="View on npm" :to="`https://npmjs.com/package/${package.name}`" target="_blank" variant="ghost" color="gray" />
          </UTooltip>
        </div>

        <p v-if="package" class="text-gray-500 dark:text-gray-400">
          {{ package.description }}
        </p>
      </template>

      <div class="prose dark:prose-invert">
        <p>
          UnJS Dependencies ({{ package?.dependencies.length }}):
        </p>
        <ul v-if="package?.dependencies.length">
          <li v-for="dep in package?.dependencies" :key="dep">
            <span class="not-prose flex items-center justify-between">
              <span>
                {{ dep }}
              </span>
              <span class="not-prose flex gap-2">
                <UTooltip text="View relations">
                  <UButton icon="i-heroicons-play" variant="ghost" color="gray" @click="emits('viewRelations', dep)" />
                </UTooltip>
                <UTooltip text="View Package">
                  <!-- TODO: wait for https://github.com/nuxt/nuxt/pull/25658 -->
                  <!-- <UButton :to="`/packages/${dep}?utm_source=unjs&utm_medium=graph-slideover&utm_campaign=unjs.io`" variant="ghost" color="gray"> -->
                  <UButton :to="`/packages/${dep}`" variant="ghost" color="gray">
                    <template #leading>
                      <UAvatar :src="toPackageLogo(dep)" alt="UnJS Logo" size="xs" :ui="{ rounded: 'rounded-sm' }" />
                    </template>
                  </UButton>
                </UTooltip>
              </span>
            </span>
          </li>
        </ul>
        <p v-else>
          <em>
            No dependencies
          </em>
        </p>

        <p>
          UnJS Dev dependencies ({{ package?.devDependencies.length }}):
        </p>
        <ul>
          <li v-for="dep in package?.devDependencies" :key="dep">
            <span class="not-prose flex items-center justify-between">
              <span>
                {{ dep }}
              </span>
              <span class="not-prose flex gap-2">
                <UTooltip text="View relations">
                  <UButton icon="i-heroicons-play" variant="ghost" color="gray" @click="emits('viewRelations', dep)" />
                </UTooltip>
                <UTooltip text="View Package">
                  <!-- TODO: wait for https://github.com/nuxt/nuxt/pull/25658 -->
                  <!-- <UButton :to="`/packages/${dep}?utm_source=unjs&utm_medium=graph-slideover&utm_campaign=unjs.io`" variant="ghost" color="gray"> -->
                  <UButton :to="`/packages/${dep}`" variant="ghost" color="gray">
                    <template #leading>
                      <UAvatar :src="toPackageLogo(dep)" alt="UnJS Logo" size="xs" :ui="{ rounded: 'rounded-sm' }" />
                    </template>
                  </UButton>
                </UTooltip>
              </span>
            </span>
          </li>
        </ul>
        <p v-if="!package?.devDependencies.length">
          <em>
            No devDependencies
          </em>
        </p>
      </div>
    </UCard>
  </USlideover>
</template>
