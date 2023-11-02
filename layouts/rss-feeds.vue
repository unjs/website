<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <div m="y-6 md:y-10" p="x-4 md:x-6 t-6 md:t-10 b-10 md:b-20" rounded="4" bg="white" gap="6 md:8">
    <main max-w-screen-md mx-auto>
      <header>
        <h1 text="2xl md:3xl gray-900" font="bold" tracking="wide">
          {{ page.title }}
        </h1>
      </header>

      <AppContent m="t-6 xl:t-12" max-w-none>
        <slot />
      </AppContent>
    </main>
  </div>
</template>
