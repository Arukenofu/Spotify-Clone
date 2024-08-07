import {defineStore, storeToRefs} from "pinia";
import useCachedRef from "@/shared/composables/useCachedRef";
import {computed} from "vue";
import gridColumnMinWidth from "@/features/FormatSidebarPlaylist/constants/gridColumnMinWidth";
import gridColumnMaxWidth from "@/features/FormatSidebarPlaylist/constants/gridColumnMaxWidth";

const gridColumnWidth = defineStore('gridColumnWidth', () => {
    const currentWidth = useCachedRef('gridColumnWidth', 170, {
        expectedTypes: ['number'],
        min: gridColumnMinWidth,
        max: gridColumnMaxWidth
    });

    const getCurrentWidth = computed(() => {
        return currentWidth.value;
    });

    function setCurrentWidth(value: number) {
        currentWidth.value = value;
    }

    return {
        getCurrentWidth,
        setCurrentWidth,
    }
});

export default function() {
    const store = gridColumnWidth();
    const {getCurrentWidth} = storeToRefs(store);
    const {setCurrentWidth} = store;

    return {
        getCurrentWidth,
        setCurrentWidth,
        gridColumnMaxWidth,
        gridColumnMinWidth
    }
}