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
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'zh', name: '简体中文' },
    ],
    defaultLocale: 'en',
  },
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
