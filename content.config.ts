import { defineCollection, z } from '@nuxt/content'

const Index = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    puzzle: z.array(
      z.object({
        name: z.string(),
        justify: z.string(),
        align: z.string(),
      }),
    ),
    away: z.object({
      name: z.string(),
      justify: z.string(),
      align: z.string(),
    }),
  }),
  philosophy: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cards: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        imageDark: z.string(),
      }),
    ),
  }),
  universe: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta: z.object({
      label: z.string(),
      to: z.string(),
    }),
    carousel: z.array(
      z.object({
        name: z.string(),
        justify: z.string(),
        align: z.string(),
      }),
    ),
  }),
  numbers: z.object({
    title: z.string(),
  }),
})

export const collections = {
  index: defineCollection({
    type: 'data',
    source: 'index.yml',
    schema: Index,
  }),
  packages: defineCollection({
    type: 'data',
    source: {
      include: 'packages/*.yml',
      exclude: ['packages/.template.yml'],
    },
    schema: z.object({
      title: z.string(),
      description: z.string(),
      github: z.object({
        owner: z.string(),
        repo: z.string(),
      }),
      npm: z.object({
        name: z.string(),
      }),
      documentation: z.string(),
      examples: z.object({
        link: z.string(),
        page: z.boolean(),
      }),
    }),
  }),
}
