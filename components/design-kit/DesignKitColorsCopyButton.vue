<script lang="ts" setup>
defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard()
</script>

<template>
  <button :disabled="copied" @click="copy(text)">
    <Transition mode="out-in" name="fade">
      <span v-if="copied">
        copied
      </span>
      <span v-else>
        copy
      </span>
    </Transition>
  </button>
</template>
