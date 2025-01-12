import getUserLanguage from "@/app/lib/i18n/utils/getUserLanguage";

export default function () {
    return navigator.language.split('-')[0] = getUserLanguage();
}