import {ref, watch} from "vue";

export default function<T>(key: string, initialValue: T) {
    const innerRef = ref<T>(initialValue);
    const cachedValue = localStorage.getItem(key);

    if (cachedValue) {
        innerRef.value = JSON.parse(cachedValue);
    }

    watch(innerRef, (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return innerRef;
}