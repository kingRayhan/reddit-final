export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Reddit",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/images/favicon-96x96.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
    "~/plugins/tabs.client",
    "~/plugins/visibility.client",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    minifyCSS: true,
    minifyJS: true,
  },

  loading: {
    color: "#4270a2",
    height: "5px",
  },

  tailwindcss: {
    cssPath: "~/assets/styles/app.scss",
    jit: true,
  },

  axios: {
    credentials: true,
    baseURL: process.env.NUXT_ENV_API,
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: process.env.NUXT_ENV_API,
        endpoints: {
          login: {
            url: "/api/auth/login",
          },
          logout: {
            url: "/api/auth/logout",
            method: "post",
          },
          user: {
            url: "/api/user",
            propertyName: false,
            autoFetch: false,
          },
        },
      },
    },
    redirect: {
      login: "/auth/signin",
      logout: "/",
      callback: "/auth/login",
      home: "/",
    },
  },
};
