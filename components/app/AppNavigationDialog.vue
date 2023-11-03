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
        <DialogPanel class="z-1 fixed inset-0 bg-white flex flex-col justify-between text-zinc-900">
          <div class="container mx-auto px-7 pt-4 flex flex-1 flex-col justify-between">
            <div class="h-[3.75rem] flex justify-between items-center border border-transparent">
              <DialogTitle>
                <AppLogo />
              </DialogTitle>
              <button type="button" class="flex px-0.375rem md:px-3 py-0.125rem md:py-0.375rem" @click="$emit('update:open', false)">
                <span class="i-heroicons-x-mark h-8 w-8" />
                <span class="sr-only">
                  Close
                </span>
              </button>
            </div>
            <nav class="mb-40">
              <ul
                aria-labelledby="Navigation mobile"
                class="flex flex-col gap-12 text-4xl font-semibold"
              >
                <li v-for="item in navigation" :key="item._path">
                  <NuxtLink :to="item._path" class="flex items-center gap-5" active-class="text-primary" @click="$emit('update:open', false)">
                    <span :class="item.icon" class="w-10 h-10 block" />
                    <span class="text-zinc-900">
                      {{ item.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <div class="flex justify-center">
              <ul class="flex gap-10">
                <li v-for="social in website.socials" :key="social.name">
                  <NuxtLink :title="social.name" :rel="social.rel" :target="social.target" :to="social.url" :class="social.icon" class="block h-8 w-8" />
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-12 w-full h-4 bg-primary" />
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
