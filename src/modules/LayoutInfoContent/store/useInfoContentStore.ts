import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";

const useInfoContentStore = defineStore('useInfoContentStore', () => {
    const currentPanel = ref<string | null>('currentPlaylistQueue');

    return {
        currentPanel
    }
});

export default function () {
    const store = useInfoContentStore();
    const {currentPanel} = storeToRefs(store);

    return {
        currentPanel
    }
}