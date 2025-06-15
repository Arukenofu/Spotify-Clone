import { createI18n } from 'vue-i18n'
import en from '@/app/lib/i18n/locales/en'
import ruPluralizationRule from '@/app/lib/i18n/pluralization/ruPluralizationRules'
import getUserLanguage from '@/app/lib/i18n/utils/getUserLanguage'

const i18n = createI18n({
  locale: getUserLanguage(),
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en,
  },
  pluralizationRules: {
    ru: ruPluralizationRule,
  },
});

(async () => {
  const userLanguage = getUserLanguage()
  if (userLanguage === 'en')
    return

  const locale = await import(`./locales/${userLanguage}/index.ts`)

  // @ts-ignore
  i18n.global.messages.value[userLanguage] = locale.default
})()

export default i18n
