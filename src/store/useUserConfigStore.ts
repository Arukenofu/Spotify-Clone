import {defineStore} from "pinia";
import useCachedRef from "@/composables/useCachedRef";

type repeatModes = 'onlyCurrentMusic' | 'repeatCurrentMusic' | 'repeatCurrentPlaylist'

export const useUserConfigStore = defineStore('useUserConfigStore', () => {
    const currentRepeatMode = useCachedRef<repeatModes>('repeatMode', 'onlyCurrentMusic');
    const isShuffle = useCachedRef<boolean>('isShuffle', false);
    const volume = useCachedRef<number>('volume', 0.75);

    function toggleRepeatMode() {
        const repeatModes: repeatModes[] = ['onlyCurrentMusic', 'repeatCurrentPlaylist', 'repeatCurrentMusic'];

        const currentIndex = repeatModes.indexOf(currentRepeatMode.value!);
        const nextIndex = (currentIndex + 1) % repeatModes.length;

        currentRepeatMode.value = repeatModes[nextIndex];
    }

    return {
        currentRepeatMode,
        isShuffle,
        toggleRepeatMode,
        volume
    }
})