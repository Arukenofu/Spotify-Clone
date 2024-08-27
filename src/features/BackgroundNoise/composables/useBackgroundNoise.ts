import {ref} from "vue";

export default function(defaultColor?: string) {
    const base = 'rgb(83, 83, 83)';
    const currentColor = ref<Readonly<string>>(defaultColor || base);

    function setColor(color: string | null): void {
        if (!color) {
            currentColor.value = defaultColor || base; return;
        }

        currentColor.value = color;
    }

    return {
        currentColor,
        setColor
    }
}