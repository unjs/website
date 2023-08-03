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
  <div my="8" border="~ gray-300" rounded-xl overflow-hidden>
    <div relative p="4" bg="gray-300 op-10" class="group">
      <span v-if="filename" absolute top-2 right-3 text-xs font-mono>
        {{ filename }}
      </span>
      <slot />
      <button
        v-if="isSupported" absolute right-3 bottom-2 p="1" op="0 group-hover:100"
        transition="~ ease-in duration-150"
        @click="copy(code)"
      >
        <transition
          appear
          mode="out-in"
          enter-active-class="duration-150 ease-int"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150 ease-out"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="copied" i-heroicons-check-solid w-4 h-4 />
          <div v-else i-heroicons-clipboard-document w-4 h-4 />
        </transition>
      </button>
    </div>
  </div>
</template>

<style scoped>
:deep(pre code .line) {
  display: block;
  min-height: 1rem;
}
</style>
