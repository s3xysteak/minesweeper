import en from './locales/en.json'
import zh from './locales/zh.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: { en, zh },
}))
