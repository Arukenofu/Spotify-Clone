import {getCookie, setCookie} from "@/shared/utils/cookie-actions";

export default function() {
    const localeCookie = getCookie('locale');

    if (localeCookie) {
        return localeCookie;
    }

    const navigatorLang = window.navigator.language.split('-')[0];

    setCookie('locale', navigatorLang, 365);

    return navigatorLang;
}