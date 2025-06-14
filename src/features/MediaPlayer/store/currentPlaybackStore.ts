import {defineStore} from "pinia";
import {computed, ref} from "vue";
import getSimplifiedTrack from "@/features/MediaPlayer/utils/getSimplifiedTrack";
import type {PlayerTypes, PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import {fetchNextPlaylist} from "@/services/sdk/entities/playlist";
import {fetchNextAlbum} from "@/services/sdk/entities/album";
import {queryClient} from "@/app/lib/VueQuery";

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
        const nextLink = currentPlaybackInfo.value?.tracks.next?.replace('https://api.spotify.com/v1/', '');
        const type = currentPlaybackType.value!;
        if (!nextLink) return;

        const entities = {
            'playlist': fetchNextPlaylist,
            'album': fetchNextAlbum
        }

        const data = await entities[type](nextLink);

        // @ts-ignore
        currentPlaybackInfo.value!.tracks.items = [
            ...currentPlaybackInfo.value!.tracks.items,
            ...data.items,
        ];
        currentPlaybackInfo.value!.tracks.next = data.next;
        console.log(nextLink, data.next);

        queryClient.setQueryData([type, currentPlaybackInfo.value!.id], currentPlaybackInfo.value);
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