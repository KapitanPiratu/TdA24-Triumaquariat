export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/tda_icon.svg' }]
    }
  },
  devtools: { enabled: true },
  css: [
    '@/assets/css/index.css',
    '@/assets/css/variables.css'
  ],
  modules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      "Lalezar": true,
      "Open Sans": true
    }
  }
})
