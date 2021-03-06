import type { NuxtConfig } from '@nuxt/types'

export default <NuxtConfig> {
  components: true,
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
    '@nuxt/nitro/compat',
    // 'nuxt-vite'
    // '@nuxt/image',
  ],
  manifest: {
    name: 'un',
    description: 'Universal JavaScript Solutions'
  },
  googleFonts: {
    display: 'swap',
    families: {
      Quicksand: true
    }
  },
  typescript: {
    typeCheck: false
  }
}
