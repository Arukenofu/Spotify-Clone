import {createI18n} from "vue-i18n";
import {getCookie, setCookie} from "@/shared/utils/cookie-actions";
import simplifyModuleName from "@/app/lib/i18n/simplifyModuleName";

export default createI18n({
    locale: getLocale(),
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
    }
});

function getLocale() {
    const localeCookie = getCookie('locale');

    if (localeCookie) {
        return localeCookie;
    }

    const navigatorLang = window.navigator.language.split('-')[0];

    setCookie('locale', navigatorLang, 365);

    return navigatorLang;
}