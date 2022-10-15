
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    '@kevinmarrec/nuxt-pwa',
  ],
  css: [
    '~/assets/main.css'
  ],
  pwa: {
    meta: {
      name: 'unjs - Universal JavaScript Solutions',
      description: 'Universal JavaScript Solutions'
    }
  },
  googleFonts: {
    display: 'swap',
    families: {
      Quicksand: true
    }
  }
})
