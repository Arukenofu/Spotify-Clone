import {defineStore, storeToRefs} from "pinia";
import useCachedRef from "@/shared/composables/useCachedRef";
import defaultWidth from "@/widgets/LayoutSideBar/constants/defaultWidth";
import {onMounted, watch} from "vue";

const useSidebarWidthStore = defineStore('useSidebarStore', () => {
    const isMinimized = useCachedRef<boolean>('isAsideMinimized', false);
    const currentWidth = useCachedRef<number>('currentWidth', defaultWidth);

    function setStyleWidth(value: number) {
        document.documentElement.style.setProperty('--sidebar-width', `${value}px`);
    }

    watch(currentWidth, (value) => {
        setStyleWidth(value);
    });

    onMounted(() => {
        setStyleWidth(currentWidth.value);
    });

    return {
        isMinimized,
        currentWidth
    }
});

export default function() {
    const store = useSidebarWidthStore();

    return {
        ...storeToRefs(store)
    }
}