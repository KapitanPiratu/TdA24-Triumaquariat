import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

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
    '@nuxtjs/google-fonts',

    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  googleFonts: {
    families: {
      "Lalezar": true,
      "Open Sans": true
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  runtimeConfig: {
    public: {
      auth: {
        username: 'TdA',
        password: 'd8Ef6!dGG_pv'
      }
    }
  }
})
