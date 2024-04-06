// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt', 'nuxt-mdi'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  devtools: { enabled: true },
  css    : ['~/assets/styles/tailwind.css', '~/assets/styles/main.scss'],
  colorMode: {
    classSuffix: ''
  },
  ui: {
    global: true,
    icons: ['mdi']
  },
  runtimeConfig: {
    public: {
      baseURL:'https://fakestoreapi.com/',
    },
  },
  devServer: {
    port: 8000
  }
})
