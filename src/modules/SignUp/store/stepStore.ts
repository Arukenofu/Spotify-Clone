import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import type {Form} from "@/modules/SignUp/types/form";

const StepStore = defineStore('StepStore', () => {
    const step = ref<number>(3);

    const form = ref<Form>({
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