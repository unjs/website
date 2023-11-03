<script lang="ts" setup>
const website = useWebsite()

const uiButton = { color: { gray: { ghost: 'hover:bg-primary/10 dark:hover:bg-primary/90' } } }
</script>

<template>
  <footer class="px-6 pt-20 pb-20 md:pb-30 flex flex-col gap-12 md:gap-20 rounded-2xl border border-zinc-100 bg-white">
    <div class="flex flex-col md:flex-row gap-12 md:gap-25">
      <div class="grow flex flex-col gap-6">
        <NuxtLink to="/" class="block">
          <AppLogo />
        </NuxtLink>
        <p class="max-w-lg text-sm md:text-base text-zinc-600 italic">
          {{ website.footer.quote }}
        </p>
        <ul class="flex gap-8">
          <li v-for="social in website.socials" :key="social.name">
            <UButton :rel="social.rel" :target="social.target" :to="social.url" :icon="social.icon" :aria-label="`Follow us on ${social.name}`" size="xl" variant="ghost" color="gray" :ui="{ icon: { xl: 'md:w-7 md:h-7' }, ...uiButton }" />
          </li>
        </ul>
      </div>
      <nav class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-[1.125rem]">
        <div v-for="list in website.footer.menu" :key="list.title" class="flex flex-col gap-4">
          <p class="font-bold">
            {{ list.title }}
          </p>
          <ul class="flex flex-col gap-3">
            <li v-for="item in list.items" :key="item.url">
              <NuxtLink :to="item.url" :rel="item.rel" :target="item.target" class="hover:underline underline-offset-8">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <AppFooterLicense class="text-sm text-zinc-400 text-center" />
  </footer>
</template>
