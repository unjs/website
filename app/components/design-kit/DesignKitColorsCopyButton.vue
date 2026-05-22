<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard()

const toast = useToast()

function copyText() {
  copy(props.text)
  toast.add({
    title: `'${props.text}' copied to clipboard`,
    timeout: 3000,
  })
}
</script>

<template>
  <button :disabled="copied" @click="copyText()">
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
