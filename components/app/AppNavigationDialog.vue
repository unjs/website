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
        <DialogPanel
          z-1
          fixed inset-0 bg="white" flex="~ col justify-between" text="gray-900"
        >
          <div container mx-auto p="x-7 t-4" flex="~ 1 col justify-between">
            <div h-3.75rem flex="~ justify-between items-center" border="~ transparent">
              <DialogTitle>
                <AppLogo />
              </DialogTitle>
              <button type="button" p="x-0.375rem md:x-3 y-0.125rem md:y-0.375rem" flex="~" @click="$emit('update:open', false)">
                <span class="i-heroicons-x-mark?mask" h-8 w-8 />
                <span sr-only>
                  Close
                </span>
              </button>
            </div>
            <nav class="mb-40">
              <ul
                aria-labelledby="Navigation mobile"
                flex="~ col"
                gap="12"
                text="4xl"
                font="semibold"
              >
                <li v-for="item in navigation" :key="item._path">
                  <NuxtLink :to="item._path" flex="~ items-center" gap="5" active-class="text-primary" @click="$emit('update:open', false)">
                    <span :class="item.icon" w-10 h-10 block />
                    <span text="gray-900">
                      {{ item.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <div flex="~ justify-center">
              <ul flex="~ row" gap-10>
                <li v-for="social in website.socials" :key="social.name">
                  <NuxtLink :title="social.name" :rel="social.rel" :target="social.target" :to="social.url" :class="social.icon" block h-8 w-8 />
                </li>
              </ul>
            </div>
          </div>
          <div mt-12 w-full h-4 bg-primary />
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
