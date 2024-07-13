import {ofetch} from "ofetch";
import type {FetchOptions, FetchRequest} from "ofetch"
import {ref} from "vue";

export async function $api<T>(request: FetchRequest, options: FetchOptions<"json"> = {}) {
    return await ofetch<T>(request, options)
}

export function $apiLazy<T>(request: FetchRequest, options: FetchOptions<"json"> = {}) {
    const data = ref<T>();
    const loading = ref<boolean>(true);

    ofetch<T>(request, options).then((value) => {
        loading.value = false;
        data.value = value;
    });

    return {
        data,
        loading
    }
}
