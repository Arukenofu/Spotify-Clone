export default function (choice: number, choicesLength: number) {
    if (choice === 0) {
        return 1;
    }

    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;
    if (!teen && endsWithOne) {
        return 0;
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 1;
    }

    return choicesLength < 4 ? 2 : 1;
}