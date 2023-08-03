<script lang="ts" setup>
const { toc, page } = useContent()

const toDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <div m="y-10" p="x-4 md:x-6 t-10 b-20" rounded="4" bg="white" grid="~ cols-1 lg:cols-[1fr_auto_1fr] items-start" gap="8">
    <div>
      <NuxtLink to="/blog" flex="~ items-center" gap="1" class="group">
        <span i-heroicons-chevron-left-20-solid block w-4 h-4 text="gray-400 group-hover:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">
          Blog
        </span>
      </NuxtLink>
    </div>

    <nav hidden lg:block lg:row-start-1 lg:col-start-3 sticky top-4 class="group">
      <p flex="~ items-center" gap="2" text="right">
        <span i-heroicons-list-bullet-20-solid block w-4 h-4 text="gray-400 group-hover:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">Table of Contents</span>
      </p>
      <ul mt-4 space-y-2 flex="~ col items-start" text="sm">
        <li v-for="link in toc.links" :key="link.id">
          <NuxtLink :to="`#${link.id}`" class="block border-b border-gray-400 hover:border-gray-600 text-gray-400 hover:text-gray-600 transition ease-in duration-150">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <main lg:row-start-1 lg:col-start-2 max-w-screen-md>
      <article>
        <header relative p="t-10">
          <h1 text="2xl md:3xl gray-800" font="bold" tracking="wide">
            {{ page.title }}
          </h1>
          <dl absolute top-0 left-0 text="sm gray-700" font="light">
            <dt sr-only>
              Published at
            </dt>
            <dd>
              <time pubdate datetime="{{ page.publishedAt }}">
                {{ toDate(page.publishedAt) }}
              </time>
            </dd>
          </dl>
          <ul mt-6>
            <li v-for="author in page.authors" :key="author.name">
              <address flex="~ items-center" gap="2" not-italic>
                <img :src="author.picture" :alt="`Profil picture of ${author.name}`" w-9 h-9 rounded="full">
                <div text="sm">
                  <div text="gray-900" leading-none font="light">
                    {{ author.name }}
                  </div>
                  <div mt-1>
                    <NuxtLink rel="author noopener" :to="`https://twitter.com/${author.twitter}`" target="_blank" class="text-gray-700 hover:text-gray-900 leading-none transition ease-in duration-150">
                      @{{ author.twitter }}
                    </NuxtLink>
                  </div>
                </div>
              </address>
            </li>
          </ul>
        </header>
        <div mt-12 prose max-w-none prose-gray>
          <slot />
        </div>
      </article>
    </main>
  </div>
</template>
