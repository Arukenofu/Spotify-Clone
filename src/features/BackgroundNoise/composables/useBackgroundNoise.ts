import {ref} from "vue";

export default function() {
    const currentColor = ref<Readonly<string>>('rgb(83, 83, 83)');

    function setColor(color: string | null): void {
        if (!color) {
            currentColor.value = 'rgb(83, 83, 83)'; return;
        }

        currentColor.value = color;
    }

    return {
        currentColor,
        setColor
    }
}