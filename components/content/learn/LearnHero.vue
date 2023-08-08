<template>
  <section p="x-6 y-8" flex="~ col" gap="4" bg="white" rounded="4" border="~ light">
    <h1 text="gray-900 4xl md:5xl" font="extrabold" tracking="wide" leading="normal md:normal">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>
    <p max-w="2xl" text="gray-600 2xl md:2.5xl" leading="normal md:normal">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </p>
  </section>
</template>
