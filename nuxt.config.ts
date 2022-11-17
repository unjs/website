
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts'
  ],
  css: [
    '~/assets/main.css'
  ],
  app: {
    head: {
      title: 'unjs - Universal JavaScript Solutions',
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
