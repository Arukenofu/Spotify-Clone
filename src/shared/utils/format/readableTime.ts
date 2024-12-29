import {useI18n} from "vue-i18n";

export default function (seconds: number) {
    const {t} = useI18n();

    if (seconds < 60) {
        return t('time.lessThanMinute');
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}${t('time.hour')} ${remainingMinutes} ${t('time.min')}`;
    } else if (hours > 0) {
        return `${hours}${t('time.hour')}`;
    } else {
        return `${remainingMinutes} ${t('time.min')}`;
    }
}