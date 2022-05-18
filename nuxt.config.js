export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000
  },
  head: {
    title: 'The Lads',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: 'Welcome to The Lads Website ! A separate form of paradox is the definition. Everything we do is connected with happiness: futility, politics, harmony, afterlife. You have to listen, and absorb booda-hood by your disappearing. Occult angers shapes most dogmas !' },
      {
        hid: "og:image",
        property: "og:image",
        content: "/icon.png"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "The Lads Official"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Welcome to The Lads Website ! A separate form of paradox is the definition. Everything we do is connected with happiness: futility, politics, harmony, afterlife. You have to listen, and absorb booda-hood by your disappearing. Occult angers shapes most dogmas !"
      },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/axentix@1.3.3/dist/css/axentix.min.css' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }
    ],
    script: [
      {
        hid: 'strip',
        src: 'https://cdn.jsdelivr.net/npm/axentix@1.3.3/dist/js/axentix.min.js',
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
  ],

  axios: {
    // baseURL: "https://theladsofficial.com",
    baseURL: "http://localhost:3000",
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: false,
          user: { url: '/api/auth/user', method: 'get' }
        },
        user: {
          autoFetch: true,
          property: 'user'
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  serverMiddleware: {
    '/api': '~/api'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],


// PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  }
  ,

// Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
