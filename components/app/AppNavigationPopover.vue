<script lang="ts" setup>
import { PopoverPanel } from '@headlessui/vue'
import type { NavItem } from '@nuxt/content/dist/runtime/types'

defineProps<{
  open: boolean
  navigation: NavItem[]
}>()

const website = useWebsite()
</script>

<template>
  <transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-100 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <PopoverPanel
      v-slot="{ close }"
      z-1 fixed inset-0 bg="white" flex="~ col justify-between" text="gray-900"
    >
      <div p-4 relative>
        <button type="button" class="i-heroicons-x-mark-20-solid?mask" absolute w-5 h-5 top-1 right-1 @click="close">
          <span sr-only>
            Close
          </span>
        </button>
        <AppLogo />
        <nav class="mt-20">
          <ul
            aria-labelledby="Navigation mobile"
            flex="~ col"
            gap="6"
            text="2xl"
          >
            <li v-for="item in navigation" :key="item._path">
              <NuxtLink :to="item._path" flex="~ items-center" gap="3" active-class="text-primary" @click="close">
                <span :class="item.icon" w-7 h-7 block />
                <span text="gray-900">
                  {{ item.title }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <div flex="~ justify-center">
          <ul flex="~ row" gap-8>
            <li v-for="social in website.socials" :key="social.name">
              <NuxtLink :title="social.name" :rel="social.rel" :target="social.target" :to="social.url" :class="social.icon" block h-5 w-5 />
            </li>
          </ul>
        </div>
        <div mt-6 w-full h-2 bg-primary />
      </div>
    </PopoverPanel>
  </transition>
</template>
