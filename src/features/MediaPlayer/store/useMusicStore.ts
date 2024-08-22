import {defineStore} from "pinia";
import {computed, ref} from "vue";

import type {Music} from "@/shared/models/Music";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";

export const useMusicStore = defineStore('useMusicStore', () => {
    const audio = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref<boolean>(false);
    const currentAudioId = ref<number | null>(1);

    const {currentQueue} = usePlaylistStore();

    const currentAudioIndexInQueue = computed(() => {
        return currentQueue.value.findIndex(value => value.id === currentAudioId.value);
    });

    function getAudioData(index: number) {
        return currentQueue.value[index]
    }

    const currentAudioData = computed<Music>(() => {
        return getAudioData(currentAudioIndexInQueue.value);
    });

    return {
        audio,
        isPlaying,
        currentAudioId,
        currentAudioIndexInQueue,
        currentAudioData,
        currentQueue,
        getAudioData
    }
});