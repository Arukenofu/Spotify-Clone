import {defineStore} from "pinia";
import {computed, ref} from "vue";
import getSimplifiedTrack from "@/features/MediaPlayer/utils/getSimplifiedTrack";
import type {PlayerTypes, PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import {loadNextPlayback} from "@/features/MediaPlayer/utils/loadNextPlayback";

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

    const currentTracksQueue = computed(() => {
        if (!currentPlaybackInfo.value) return [];
        const queue = currentPlaybackInfo.value.tracks.items;

        if ('added_at' in queue[0]) {
            return queue.map((track) => track.track) as SimplifiedTrack[];
        }

        return queue as SimplifiedTrack[];
    });

    async function loadNextTracks() {
        const id = currentPlaybackInfo.value?.id;
        const nextLink = currentPlaybackInfo.value?.tracks.next || null;
        const type = currentPlaybackType.value;

        if (!id || !type) return;

        await loadNextPlayback(
            id,
            type,
            nextLink
        )
    }

    return {
        currentPlaybackInfo,
        currentTracksQueue,
        currentPlaybackType,
        currentTrackId,
        currentTrackIndex,
        currentTrack,
        loadNextTracks
    }
});

export { currentPlaybackStore };