<script lang="ts" setup>
const { data: packages } = await useAsyncData('packages', () => queryContent('/packages/').find())
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <main m="y-6 md:y-10">
    <slot />
    <section m="t-6">
      <h2 sr-only>
        Packages list
      </h2>
      <ol grid="~ cols-1 sm:cols-2 lg:cols-3" gap="4 md:6">
        <li v-for="package_ in packages" :key="package_._path" relative p="4" rounded="4" bg="white" flex="~ col" gap="3" hover:shadow-xl transition="~ ease-in duration-150">
          <div flex="~ items-center" gap="2">
            <img :src="toPackageLogo(package_.title)" :alt="`Logo of ${package_.title}`" w-5 h-5>
            <NuxtLink :to="package_._path">
              <h3 text="gray-900 lg md:xl" font="semibold">
                {{ package_.title }}
              </h3>
              <span absolute inset-0 />
            </NuxtLink>
          </div>
          <p grow text="gray-600">
            {{ package_.description }}
          </p>
          <div flex="~ justify-between" text="gray-700 sm">
            <NuxtLink :to="package_.documentation" target="_blank" rel="noopener" z-10>
              Documentation
            </NuxtLink>
            <NuxtLink :to="toGitHubRepo(package_.github.owner, package_.github.repo)" target="_blank" rel="noopener" z-10>
              Sources
            </NuxtLink>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>
