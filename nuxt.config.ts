// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-28',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    host: '0.0.0.0',
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})