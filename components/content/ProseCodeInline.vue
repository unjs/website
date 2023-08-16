<template>
  <code class="mx-1px px-[0.375rem] py-[0.2rem] rounded-md font-mono font-400 text-sm text-gray-900 bg-primary bg-op-30 before-content-empty after-content-empty">
    <slot />
  </code>
</template>

<style scoped>
a code {
  border-width: 1px;
  border-style: dashed;
  border-color: theme('colors.gray.900');
}

a:hover code {
  border-style: solid;
}
</style>
