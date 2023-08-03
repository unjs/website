<script lang="ts" setup>
const website = useWebsite()
</script>

<template>
  <footer rounded-4 px-6 pt-20 pb-20 md:pb-30 flex="~ col" gap-12 md:gap-20 border border-light bg-white>
    <div flex="~ col md:row" gap-12 md:gap-25>
      <div flex="~ 1 col" gap-6>
        <NuxtLink to="/" block>
          <AppLogo />
        </NuxtLink>
        <p max-w-lg text="sm md:base" text-gray-600 italic>
          {{ website.footer.quote }}
        </p>
        <ul flex="~ row" gap-8>
          <li v-for="social in website.socials" :key="social.name">
            <NuxtLink :title="social.name" :rel="social.rel" :target="social.target" :to="social.url" :class="social.icon" block h-6 w-6 md:h-7 md:w-7 text-gray-400 />
          </li>
        </ul>
      </div>
      <nav grid="~ cols-2 md:cols-3" gap="4 md:10" text="1.125rem">
        <div v-for="list in website.footer.menu" :key="list.title" flex="~ col" gap-4>
          <p font-bold>
            {{ list.title }}
          </p>
          <ul flex="~ col" gap-3>
            <li v-for="item in list.items" :key="item.url">
              <NuxtLink :to="item.url" :rel="item.rel" :target="item.target">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <AppFooterLicense text="sm gray-400 center" />
  </footer>
</template>
