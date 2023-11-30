<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { NavItem } from '@nuxt/content/dist/runtime/types'

defineProps<{
  open: boolean
  navigation: NavItem[]
}>()

defineEmits<{
  'update:open': [boolean]
}>()

const website = useWebsite()

const uiButton = { color: { gray: { ghost: 'dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-primary/40' } } }
</script>

<template>
  <TransitionRoot
    :show="open"
    as="template"
    appear
  >
    <Dialog>
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogPanel class="z-20 fixed inset-0 dark:bg-gray-900 flex flex-col justify-between dark:text-50">
          <div class="container mx-auto px-7 pt-4 flex flex-1 flex-col justify-between">
            <div class="h-[3.75rem] flex justify-between items-center">
              <DialogTitle>
                <AppLogo />
              </DialogTitle>
              <UButton :ui="{ ...uiButton }" square size="md" variant="ghost" color="gray" icon="i-heroicons-x-mark" aria-label="Close" @click="$emit('update:open', false)" />
            </div>
            <nav class="mb-40">
              <ul
                aria-labelledby="Navigation mobile"
                class="flex flex-col gap-12 text-2xl font-semibold"
              >
                <li v-for="item in navigation" :key="item._path">
                  <NuxtLink :to="item._path" class="flex items-center gap-5" active-class="text-primary" @click="$emit('update:open', false)">
                    <span :class="item.icon" class="w-8 h-8 block" />
                    <span>
                      {{ item.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <div class="flex justify-center">
              <ul class="flex gap-2">
                <li v-for="social in website.socials" :key="social.name">
                  <UButton :rel="social.rel" :target="social.target" :to="social.url" :icon="social.icon" :aria-label="`Follow us on ${social.name}`" size="xl" variant="ghost" color="gray" :ui="{ icon: { xl: 'md:w-7 md:h-7' }, ...uiButton }" />
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-12 w-full h-2 dark:bg-primary-500" />
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
