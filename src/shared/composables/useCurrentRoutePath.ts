import {useRoute} from "vue-router";
import {ref, watch} from "vue";

export default function() {
    const route = useRoute();
    const currentRoutePath = ref<string>(route.path);

    watch(() => route.fullPath, (value) => {
        currentRoutePath.value = value;
    });

    return {
        currentRoutePath
    }
}