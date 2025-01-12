import {createI18n} from "vue-i18n";
import simplifyModuleName from "@/app/lib/i18n/utils/simplifyModuleName";
import ruPluralizationRule from "@/app/lib/i18n/pluralization/ruPluralizationRules";
import getUserLanguage from "@/app/lib/i18n/utils/getUserLanguage";

export default createI18n({
    locale: getUserLanguage(),
    fallbackLocale: 'en',
    messages: {
        en: simplifyModuleName(import.meta.glob('./locales/en/*.ts', {
            eager: true,
            import: 'default',
        })),
        ru: simplifyModuleName(import.meta.glob('./locales/ru/*.ts', {
            eager: true,
            import: 'default'
        })),
    },
    pluralizationRules: {
        ru: ruPluralizationRule
    }
});