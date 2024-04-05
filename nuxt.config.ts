// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  devtools: { enabled: true },
  css    : ['~/assets/styles/main.css'],
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
})
