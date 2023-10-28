import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        yellow:{
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
        sans: ['Nunito', ...fontFamily.sans],
      },
    },
  },
}
