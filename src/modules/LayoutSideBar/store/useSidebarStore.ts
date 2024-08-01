import {defineStore} from "pinia";
import useCachedRef from "@/shared/composables/useCachedRef";
import defaultWidth from "@/modules/LayoutSideBar/constants/defaultWidth";

export default defineStore('useSidebarStore', () => {
    const isMinimized = useCachedRef<boolean>('isAsideMinimized', false);
    const currentWidth = useCachedRef<number>('currentWidth', defaultWidth);

    return {
        isMinimized,
        currentWidth
    }
})