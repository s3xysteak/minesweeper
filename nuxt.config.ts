// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/minesweeper/',
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: 'https://api.iconify.design/material-symbols:bomb.svg' }],
    },
  },
  imports: {
    dirs: [
      '../shared',
    ],
  },
  css: [
    '@unocss/reset/tailwind-compat.css',
    './app/assets/main.css',
  ],

  nitro: {
    scheduledTasks: {
      '0 0 * * *': ['insert-daily-run'],
    },
    experimental: {
      tasks: true,
      database: true,
    },
    imports: {
      dirs: [
        'shared',
      ],
    },
  },

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
