import {useI18n} from "vue-i18n";

export default function (item: string) {
    const {t} = useI18n();

    return t('contextmenu-items.' + item)
}