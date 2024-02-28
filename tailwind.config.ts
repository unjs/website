import type { Config } from 'tailwindcss'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#FEFDF7',
          100: '#FDFCEF',
          200: '#FAF6D6',
          300: '#F7F1BD',
          400: '#F2E78C',
          500: '#ECDC5A',
          600: '#D4C651',
          700: '#8E8436',
          800: '#6A6329',
          900: '#47421B',
          950: '#2F2C12',
        },
      },
      fontFamily: {
        sans: ['Nunito'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            'h1 a,h2 a,h3 a,h4 a,h5 a,h6 a': {
              'text-decoration-line': 'none',
            },
            'p a, ul a': {
              'text-decoration-line': 'underline',
              'text-underline-offset': '0.2em',
              'color': 'var(--un-prose-body)',
            },
            'p code, ul code': {
              fontWeight: 'inherit',
            },
            'blockquote': {
              'border-left-color': theme('colors.primary'),
            },
            'pre': {
              'margin': 0,
              'padding': 0,
              'border-radius': 0,
              'background-color': 'transparent',
            },
            'table': {
              margin: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        highlight: value => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
      },
      { values: flattenColorPalette(theme('backgroundColor')), type: 'color' },
    )
  }],
}
