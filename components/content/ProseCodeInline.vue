<template>
  <code class="mx-1px px-[0.375rem] py-[0.2rem] rounded-md font-mono font-400 text-zinc-900 bg-primary/30 before:content-[''] after:content-['']">
    <slot />
  </code>
</template>

<style scoped>
a code {
  border-width: 1px;
  border-style: dashed;
  border-color: theme('colors.zinc.900');
}

a:hover code {
  border-style: solid;
}
</style>
