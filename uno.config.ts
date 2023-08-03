import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#ECDC5A',
      light: 'hsla(216, 12%, 84%, 0.1)',
    },
    fontSize: {
      '2.5xl': '1.75rem',
    },
  },
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include
        'app.config.ts',
      ],
    },
    filesystem: [
      '.nuxt/content-cache/**/*',
    ],
  },
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        a: {
          'text-decoration': 'none',
        },
        img: {
          'border': '1px solid rgb(209, 213, 219)',
          'border-radius': '0.875rem',
        },
        pre: {
          margin: 0,
          padding: 0,
        },
      },
    }),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Nunito:300,400,500,600,700,800',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
