import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";

import type {RegisterForm} from "@/services/types/authServiceTypes";

const StepStore = defineStore('StepStore', () => {
    const step = ref<number>(0);

    const form = ref<RegisterForm>({
        email: '',
        password: '',
        username: '',
        day: null,
        month: '',
        year: null,
        gender: '',
    });

    return {
        step,
        form
    }
})

export default function () {
    const store = StepStore();
    const storeRef = storeToRefs(store);

    return {
        ...storeRef
    };
}