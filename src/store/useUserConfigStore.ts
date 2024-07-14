import {defineStore} from "pinia";
import useCachedRef from "@/composables/useCachedRef";

export const useUserConfigStore = defineStore('useUserConfigStore', () => {
    const currentRepeatModeIndex = useCachedRef<number>(0, 'repeatMode');
    const isShuffle = useCachedRef<boolean>(false, 'isShuffle');

    return {
        currentRepeatModeIndex,
        isShuffle
    }
})