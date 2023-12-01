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

const uiButton = { font: 'font-semibold', color: { gray: { ghost: 'text-gray-950 hover:bg-primary/60 dark:text-gray-50 dark:hover:bg-primary/40' } } }
const activeClassButton = 'bg-primary bg-opacity-40 dark:bg-opacity-30'
const uiSocialButton = { color: { gray: { ghost: 'dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-primary/40' } } }
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
        <DialogPanel class="z-20 fixed inset-0 bg-white dark:bg-gray-900 flex flex-col justify-between text-gray-950 dark:text-gray-50">
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
                class="flex flex-col gap-2 text-2xl font-semibold"
              >
                <li v-for="item in navigation" :key="item._path">
                  <UButton
                    size="xl"
                    color="gray"
                    variant="ghost"
                    :to="item._path" :icon="item.icon" :ui="{ ...uiButton }" :active-class="activeClassButton"
                    @click="$emit('update:open', false)"
                  >
                    {{ item.title }}
                  </UButton>
                </li>
              </ul>
            </nav>
            <div class="flex justify-center">
              <ul class="flex gap-2">
                <li v-for="social in website.socials" :key="social.name">
                  <UButton :rel="social.rel" :target="social.target" :to="social.url" :icon="social.icon" :aria-label="`Follow us on ${social.name}`" size="xl" variant="ghost" color="gray" :ui="{ icon: { xl: 'md:w-7 md:h-7' }, ...uiSocialButton }" />
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-12 w-full h-2 bg-primary-500 dark:bg-primary-500" />
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
