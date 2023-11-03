<script lang="ts" setup>
import { NuxtLink } from '#components'

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

// function scrollToTop(close: () => void) {
//   window.location.hash = ''
//   window.scrollTo({ top: 0, behavior: 'smooth' })

//   close()
// }
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
    <!-- TODO: missing in-language due to a but @see https://github.com/harlan-zw/unhead-schema-org/issues/29 -->
    <SchemaOrgArticle :date-published="toISODateString(page.publishedAt)" :date-modified="toISODateString(page.modifiedAt)" type="BlogArticle" />
  </Head>

  <Prose class="my-6 md:my-10" :toc="toc">
    <template #header>
      <header class="relative pt-10">
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl md:text-3xl text-zinc-900 font-bold tracking-wide">
            {{ page.title }}
          </h1>
        </div>

        <div class="absolute top-0 left-0 text-sm text-zinc-700 font-light">
          <dl class="flex gap-1">
            <dt class="sr-only">
              Published at
            </dt>
            <dd>
              <time :datetime="toISODateString(page.publishedAt)">
                {{ toLocaleDateString(page.publishedAt) }}
              </time>
            </dd>
            <span>-</span>
            <dt class="sr-only">
              Categories
            </dt>
            <dd class="capitalize">
              <ul class="categories flex gap-1">
                <li v-for="(category, index) in page.categories" :key="category" class="flex">
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
          <dt class="sr-only">
            Authors
          </dt>
          <dd>
            <ul class="mt-6 flex flex-wrap gap-4 md:gap-8">
              <li v-for="author in page.authors" :key="author.name">
                <address class="flex items-center gap-2 not-italic">
                  <img :src="author.picture" :alt="`Profil picture of ${author.name}`" width="36" height="36" class="w-9 h-9 rounded-full">
                  <div class="text-sm">
                    <div class="text-zinc-900 leading-none font-light">
                      {{ author.name }}
                    </div>
                    <div class="mt-1">
                      <NuxtLink rel="author noopener" :to="`https://x.com/${author.twitter}`" target="_blank" class="text-zinc-700 hover:text-zinc-900 leading-none transition ease-in">
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
    </template>

    <slot />

    <template #nav>
      <UDivider />
      <ProseNavGroup icon="i-heroicons-cube-solid">
        <template #title>
          Packages
        </template>
        <template #links>
          <ol>
            <li v-for="package_ in packages" :key="package_._path">
              <ProseNavGroupLink :to="package_._path">
                <template #icon="props">
                  <img :src="toPackageLogo(package_.title)" :alt="`Logo of ${package_.title}`" :class="props.class" width="20" height="20">
                </template>
                <span>{{ package_.title }}</span>
              </ProseNavGroupLink>
            </li>
          </ol>
        </template>
      </ProseNavGroup>
      <UDivider />
      <ProseNavGroup icon="i-heroicons-user-group-solid">
        <template #title>
          Community
        </template>
        <template #links>
          <ProseNavGroupLink :to="toEditPage(page._file)" target="_blank" icon="i-heroicons-pencil-square-20-solid">
            Edit this page
          </ProseNavGroupLink>
          <ProseNavGroupLink
            to="https://github.com/unjs/website" target="_blank"
            icon="i-simple-icons-github"
          >
            Star on GitHub
          </ProseNavGroupLink>
        </template>
      </ProseNavGroup>
    </template>
  </Prose>
</template>
