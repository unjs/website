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
        'h1 a,h2 a,h3 a,h4 a,h5 a,h6 a': {
          'text-decoration-line': 'none',
        },
        'a:has(code)': {
          'text-decoration': 'none',
        },
        'p a, ul a': {
          'text-decoration-line': 'none',
          'color': 'var(--un-prose-body)',
          'border-bottom': '1px solid var(--un-prose-body)',
          'font-weight': '600',
          'transition': 'border 150ms ease-in',
        },
        'p a:has(code)': {
          border: '0',
        },
        'p a:has(code):hover': {
          border: '0',
        },
        'p a:hover': {
          'color': 'var(--un-prose-links)',
          'border-bottom': '1px solid var(--un-prose-links)',
        },
        'blockquote': {
          'border-left-color': '#ecdc5a', // primary
        },
        'pre': {
          margin: 0,
          padding: 0,
        },
        'table': {
          margin: 0,
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
