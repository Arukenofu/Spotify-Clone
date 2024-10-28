import readableNumber from "@/shared/utils/format/readableNumber";

export default function(
    number: number,
    nominative: string,
    genitiveSingular: string,
    genitivePlural: string,
    option: 'readable' | 'onlystr' | '' = ''
) {
    const mod10 = number % 10;
    const mod100 = number % 100;

    let str;

    if (mod10 === 1 && mod100 !== 11) {
        str = nominative;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        str = genitiveSingular;
    } else {
        str = genitivePlural;
    }

    if (option === 'onlystr') {
        return str;
    }
    if (option === 'readable') {
        return `${readableNumber(number)} ${str}`
    }

    return `${number} ${str}`;
}