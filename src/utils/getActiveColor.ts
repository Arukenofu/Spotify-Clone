
type Properties = 'background-color' | 'color';

export default function (value: any, property: Properties = 'color') {
    if (value) {
        return `${property}: var(--main-color)`
    }
}