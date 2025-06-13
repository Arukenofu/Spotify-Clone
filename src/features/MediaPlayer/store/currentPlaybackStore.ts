import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {PlayerTypes, PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import getSimplifiedTrack from "@/features/MediaPlayer/utils/getSimplifiedTrack";

const currentPlaybackStore = defineStore('currentPlaybackStore', () => {
    const currentPlaybackType = ref<PlayerTypesStr | null>(null);
    const currentPlaybackInfo = ref<PlayerTypes | null>(null);
    const currentTrackId = ref<string>('none');

    const currentTrackIndex = computed<number>(() => {
        if (!currentPlaybackInfo.value || !currentTrackId.value) return -1;

        return currentPlaybackInfo.value.tracks?.items?.findIndex((track) => {
            const simplifiedTrack = getSimplifiedTrack(track);

            return simplifiedTrack.id === currentTrackId.value;
        });
    });

    const currentTrack = computed<Track | SimplifiedTrack | null>(() => {
        if (currentTrackIndex.value === null || currentTrackIndex.value === -1) return null;

        const item = currentPlaybackInfo.value?.tracks.items[currentTrackIndex.value];
        if (!item) return null;

        return getSimplifiedTrack(item);
    });

    return {
        currentPlaybackInfo,
        currentPlaybackType,
        currentTrackId,
        currentTrackIndex,
        currentTrack
    }
});

export { currentPlaybackStore };