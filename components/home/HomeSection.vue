<template>
  <section class="flex flex-col gap-6">
    <div class="px-6 py-8 bg-white rounded-2xl border border-zinc-100">
      <div class="max-w-3xl flex flex-col gap-4">
        <p class="text-zinc-700 md:text-xl font-semibold tracking-wide">
          <slot name="eyebrow" />
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl text-gray-900 font-extrabold tracking-wide">
          <slot name="title" />
        </h2>
        <p class="text-lg md:text-[2.5xl] text-zinc-600 md:leading-tight">
          <slot name="subtitle" />
        </p>
      </div>
    </div>
    <slot />
  </section>
</template>
