import {ref} from "vue";

export default function() {
    const currentColor = ref<Readonly<string>>('rgb(83, 83, 83)');

    function setColor(color: string): void {
        currentColor.value = color;
    }

    return {
        currentColor,
        setColor
    }
}