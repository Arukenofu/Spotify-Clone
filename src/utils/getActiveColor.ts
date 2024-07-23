
type Properties = 'background-color' | 'color' | 'fill';

export default function (value: any, property: Properties = 'color') {
    if (value) {
        return `${property}: var(--main-color)`
    }
}