import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {PlayerTypes, PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";

const currentPlaybackStore = defineStore('currentPlaybackStore', () => {
    const currentPlaybackType = ref<PlayerTypesStr | null>(null);
    const currentPlaybackInfo = ref<PlayerTypes | null>(null);
    const currentTrackId = ref<string | null>(null);

    const currentTrackIndex = computed<number>(() => {
        if (!currentPlaybackInfo.value || !currentTrackId.value) return -1;

        return currentPlaybackInfo.value.tracks?.items?.findIndex((track) => {
            if ('added_at' in track) {
                return track.track.id === currentTrackId.value;
            }

            return track.id === currentTrackId.value;
        });
    });

    const currentTrack = computed<Track | SimplifiedTrack | null>(() => {
        if (currentTrackIndex.value === null || currentTrackIndex.value === -1) return null;

        const item = currentPlaybackInfo.value?.tracks.items[currentTrackIndex.value];
        if (!item) return null;

        if ('added_at' in item) {
            return {...item.track}
        }

        return item;
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