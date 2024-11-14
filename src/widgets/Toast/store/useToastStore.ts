import {defineStore} from "pinia";
import {ref} from "vue";

export const useToastStore = defineStore('toastStore', () => {
    const toasts = ref<string[]>([]);

    return {
        toasts
    }
});