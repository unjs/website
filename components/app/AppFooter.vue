<script lang="ts" setup>
const website = useWebsite()
</script>

<template>
  <footer rounded-4 px-6 pt-20 pb-30 flex="~ col" gap-6 border border-light bg-white>
    <div flex="~ row" gap-25>
      <div flex="~ 1 col" gap-6>
        <NuxtLink to="/">
          <AppLogo />
        </NuxtLink>
        <p text-gray-600 italic>
          {{ website.footer.quote }}
        </p>
        <ul flex="~ row" gap-8>
          <li v-for="social in website.socials" :key="social.name">
            <NuxtLink :title="social.name" :rel="social.rel" :target="social.target" :to="social.url" :class="social.icon" block h-7 w-7 text-gray-400 />
          </li>
        </ul>
      </div>
      <nav flex="~ 1 row justify-center" gap-10 class="text-[1.125rem]">
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
    <div flex="~ justify-center" text="sm gray-400">
      <span>{{ website.footer.warning }}</span>
    </div>
  </footer>
</template>
