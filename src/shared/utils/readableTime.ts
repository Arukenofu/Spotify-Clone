export default function (seconds: number) {
    if (seconds < 60) {
        return "Меньше минуты";
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}ч. ${remainingMinutes} мин`;
    } else if (hours > 0) {
        return `${hours}ч.`;
    } else {
        return `${remainingMinutes} мин`;
    }
}