import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {usePlaylistStore} from "@/features/MediaPlayer";
import type {Music} from "@/shared/models/Music";

export default defineStore('useCurrentMusicStore', () => {
    const playlistStore = usePlaylistStore();
    const currentAudioId = ref<number | null>(1);

    const currentAudioIndexInQueue = computed(() => {
        return playlistStore.currentQueue.findIndex(
            value => value.id === currentAudioId.value
        );
    });

    const currentAudioData = computed<Music>(() => {
        return playlistStore.currentQueue[currentAudioIndexInQueue.value]
    });

    return {
        currentAudioId,
        currentAudioData,
        currentAudioIndexInQueue,
    }
});