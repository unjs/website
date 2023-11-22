<template>
  <div>
    <div class="border border-zinc-100 rounded-md overflow-hidden h-24">
      <slot name="content" />
    </div>
    <div class="mt-1 font-semibold">
      <slot name="description" />
    </div>
  </div>
</template>
