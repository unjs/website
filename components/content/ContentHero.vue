<template>
  <AppBaseHero>
    <template #header>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </template>

    <template #content>
      <ContentSlot :use="$slots.description" unwrap="p" />
    </template>
  </AppBaseHero>
</template>
