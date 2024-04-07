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
  },
  // app: {
  //   head: {
  //     script: [{ src:"https://www.paypal.com/sdk/js?client-id=BAAZz-KhcCl2As8xaPVeqCZFyya4R3pAUJj4WghFWoTocq8IRl3JqTn2MHtMy9TxrozDN6taHUaRDlUPt4&components=hosted-buttons&disable-funding=venmo&currency=USD" },
  //       { children:` paypal.HostedButtons({
  //         hostedButtonId: "YRZFTH4XFUS5Y",
  //       }).render("#paypal-container-YRZFTH4XFUS5Y")` }
  //     ],
  //   },
  // },
})
