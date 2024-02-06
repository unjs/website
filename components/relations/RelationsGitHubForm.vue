<script lang="ts" setup>
const emits = defineEmits<{
  add: [string]
}>()

const input = defineModel<string>('input', { required: true })
const loading = defineModel<boolean>('loading', { required: true })

function add() {
  emits('add', input.value)
}
</script>

<template>
  <form class="grow mt-1 flex gap-2 items-end" @submit.prevent="add">
    <UFormGroup class="grow" label="Add packages from GitHub">
      <UInput v-model="input" color="white" variant="outline" placeholder="nuxt/nuxt, adonisjs..." :ui="{ wrapper: 'grow' }" icon="i-simple-icons-github" />
    </UFormGroup>
    <UButton color="primary" :disabled="!input" size="sm" type="submit" :loading="loading">
      Add
    </UButton>
  </form>
</template>
