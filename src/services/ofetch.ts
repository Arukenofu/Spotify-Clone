import {ofetch} from "ofetch";
import type {FetchOptions, FetchRequest} from "ofetch"
import {ref} from "vue";

const api = ofetch.create({
    baseURL: "http://localhost:8000/",
    credentials: 'include'
});

export async function $api<T>(request: FetchRequest, options: FetchOptions<"json"> = {}) {
    return await api<T>(request, options);
}

export function $apiLazy<T>(request: FetchRequest, options: FetchOptions<"json"> = {}) {
    const data = ref<T>();
    const loading = ref<boolean>(true);

    api<T>(request, options).then((value) => {
        loading.value = false;
        data.value = value;
    });

    return {
        data,
        loading
    }
}
