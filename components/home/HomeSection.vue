<template>
  <section flex="~ col" gap="6">
    <div p="x-6 y-8" bg="white" rounded="4" border="~ light">
      <div max-w-3xl flex="~ col" gap="4">
        <p text="gray-700 md:xl" font-semibold tracking-wide>
          <slot name="eyebrow" />
        </p>
        <h2 text="2xl md:3xl lg:4xl gray-900" font-extrabold tracking-wide>
          <slot name="title" />
        </h2>
        <p text="lg md:2.5xl gray-600" md:leading-tight>
          <slot name="subtitle" />
        </p>
      </div>
    </div>
    <slot />
  </section>
</template>
