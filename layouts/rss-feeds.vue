<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <div m="y-6 md:y-10" p="x-4 md:x-6 t-6 md:t-10 b-10 md:b-20" rounded="4" bg="white" gap="6 md:8">
    <main max-w-screen-md mx-auto>
      <header>
        <h1 text="2xl md:3xl gray-900" font="bold" tracking="wide">
          {{ page.title }}
        </h1>
      </header>

      <div mt-6 md:mt-12 prose prose-gray max-w-none>
        <slot />
      </div>
    </main>
  </div>
</template>
