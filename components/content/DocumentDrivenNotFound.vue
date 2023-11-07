<template>
  <Main>
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-4xl font-bold">
        404
      </h1>
      <p class="mt-6 text-lg">
        Page not found
      </p>
      <UButton class="mt-12" to="/" color="white" size="md" :ui="{ color: { white: { solid: 'ring-0 shadow-none hover:shadow-md' } } }" icon="i-heroicons-home-20-solid">
        Go back home
      </UButton>
    </div>
  </Main>
</template>
