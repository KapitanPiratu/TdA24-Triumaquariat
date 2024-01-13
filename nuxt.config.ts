export default defineNuxtConfig({
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
