<script lang="ts" setup>
const { toc, page } = useContent()

const { data: packages } = await useAsyncData(`packages${page.value.packages.join(':')}`, () => queryContent('/packages/').only(['_path', 'title', 'icon', 'logo']).where({ _path: { $containsAny: page.value.packages } }).find(), { watch: [() => page.value.packages] })

// TODO: Waiting for Nuxt SEOKit v2
useServerSeoMeta({
  ogTitle: `${page.value.title} · UnJS`,
  ogType: 'article',
  ogDescription: page.value.description,
  ogImage: page.value.image?.src,
  ogImageAlt: page.value.image?.alt,
  twitterTitle: `${page.value.title} · UnJS`,
  twitterDescription: page.value.description,
  twitterImage: page.value.image?.src,
  twitterImageAlt: page.value.image?.alt,
  author: page.value.authors.map(author => author.name).join(', '),
  twitterCard: 'summary',
})
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
    <!-- TODO: missing in-language due to a but @see https://github.com/harlan-zw/unhead-schema-org/issues/29 -->
    <SchemaOrgArticle :date-published="toISODateString(page.publishedAt)" :date-modified="toISODateString(page.modifiedAt)" type="BlogArticle" />
  </Head>
  <div m="y-6 md:y-10" p="x-4 md:x-6 t-6 md:t-10 b-10 md:b-20" rounded="4" bg="white" grid="~ cols-1 xl:cols-[1fr_auto_1fr] items-start" gap="6 md:8">
    <div flex="~ justify-start">
      <NuxtLink to="/blog" flex="~ items-center" gap="1" class="group">
        <span i-heroicons-chevron-left-20-solid block w-4 h-4 text="gray-400 group-hover:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">
          Blog
        </span>
      </NuxtLink>
    </div>

    <nav xl:block xl:row-start-1 xl:col-start-3 sticky top-4 class="group/nav hidden">
      <p flex="~ items-center" gap="2" text="right">
        <span i-heroicons-list-bullet-20-solid block w-4 h-4 text="gray-400 group-hover/nav:gray-600" transition="~ ease-in duration-150" />
        <span text="text-sm gray-600">Table of Contents</span>
      </p>
      <ul mt-4 flex="~ col items-start" text="sm gray-400">
        <li v-for="link in toc.links" :key="link.id">
          <NuxtLink :to="`#${link.id}`" block p="y-1" class="group">
            <span border="b gray-400 group-hover:gray-700" text="group-hover:gray-700" transition="~ ease-in duration-150" leading="6">
              {{ link.text }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <main max-w-screen-md lg="mx-auto w-screen-md" xl="row-start-1 col-start-2">
      <article>
        <header relative p="t-10">
          <div flex="~ col" gap-1>
            <h1 text="2xl md:3xl gray-900" font="bold" tracking="wide">
              {{ page.title }}
            </h1>
            <dl>
              <dt sr-only>
                Related packages
              </dt>
              <dd>
                <ul flex="~" gap-3 text="sm gray-900" h-6>
                  <li v-for="package_ in packages" :key="package_._path">
                    <NuxtLink :to="package_._path" py-1 flex="~ items-center" gap-1>
                      <img v-if="package_.logo" :src="package_.logo" w-4 h-4 width="16" height="16">
                      <span v-else-if="package_.icon" w-4 h-4 :class="package_.icon" />
                      <span>{{ package_.title }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div absolute top-0 left-0 text="sm gray-700" font="light">
            <dl flex="~" gap-1>
              <dt sr-only>
                Published at
              </dt>
              <dd>
                <time pubdate :datetime="toISODateString(page.publishedAt)">
                  {{ toLocaleDateString(page.publishedAt) }}
                </time>
              </dd>
              <span>-</span>
              <dt sr-only>
                Categories
              </dt>
              <dd capitalize>
                <ul flex="~" gap-1 class="categories">
                  <li v-for="(category, index) in page.categories" :key="category" flex="~">
                    <NuxtLink :to="`/categories/${category}`">
                      {{ category }}
                    </NuxtLink>
                    <span v-if="index !== page.categories.length - 1">,</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <dl>
            <dt sr-only>
              Authors
            </dt>
            <dd>
              <ul mt-6 flex="~ wrap" gap="4 md:8">
                <li v-for="author in page.authors" :key="author.name">
                  <address flex="~ items-center" gap="2" not-italic>
                    <img :src="author.picture" :alt="`Profil picture of ${author.name}`" w-9 h-9 rounded="full" width="36" height="36">
                    <div text="sm">
                      <div text="gray-900" leading-none font="light">
                        {{ author.name }}
                      </div>
                      <div mt-1>
                        <NuxtLink rel="author noopener" :to="`https://x.com/${author.twitter}`" target="_blank" class="text-gray-700 hover:text-gray-900 leading-none transition ease-in duration-150">
                          @{{ author.twitter }}
                        </NuxtLink>
                      </div>
                    </div>
                  </address>
                </li>
              </ul>
            </dd>
          </dl>
        </header>
        <div mt-6 md:mt-12 prose prose-gray max-w-none>
          <slot />
        </div>
      </article>
    </main>
  </div>
</template>
