import {ref, watch} from "vue";

export default function<T>(defer: T, key: string) {
    const innerRef = ref<T>(defer);
    const cachedValue = localStorage.getItem(key);

    if (cachedValue) {
        innerRef.value = JSON.parse(cachedValue);
    }

    watch(innerRef, (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return innerRef;
}