<script lang="ts" setup>
defineProps<{
  code: string
  language?: string
  filename?: string
  meta?: string
}>()

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <div class="my-8 border border-zinc-300 rounded-xl overflow-hidden">
    <div class="group relative p-4 bg-zinc-300/10">
      <span v-if="filename" class="absolute top-2 right-3 text-xs font-mono">
        {{ filename }}
      </span>
      <slot />
      <ClientOnly>
        <button
          v-if="isSupported" class="absolute right-3 bottom-2 p-1 opacity-0 group-hover:opacity-100 transition ease-in"
          @click="copy(code)"
        >
          <span class="sr-only">
            Copy to clipboard
          </span>
          <Transition
            appear
            mode="out-in"
            enter-active-class="duration-150 ease-int"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-150 ease-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="copied" class="i-heroicons-check-solid w-4 h-4" />
            <div v-else class="i-heroicons-clipboard-solid w-4 h-4" />
          </transition>
        </button>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
:deep(pre code .line) {
  display: block;
  min-height: 1rem;
}
</style>
