import en from './locale/en.json'
import zh from './locale/zh.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: { en, zh },
}))
