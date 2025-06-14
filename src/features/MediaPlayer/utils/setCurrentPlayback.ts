import {queryClient} from "@/app/lib/VueQuery";
import {fetchPlaylist} from "@/services/sdk/entities/playlist";
import {fetchAlbum} from "@/services/sdk/entities/album";
import {currentPlaybackStore} from "@/features/MediaPlayer/store/currentPlaybackStore";
import type {PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {Album, Playlist, Track} from "@spotify/web-api-ts-sdk";

const queryHandlers: Record<PlayerTypesStr, (id: string) => Promise<Album | Playlist<Track>>> = {
    'playlist': fetchPlaylist,
    'album': fetchAlbum
}

async function getData(type: PlayerTypesStr, playbackId: string) {
    let data = queryClient.getQueryData<Album | Playlist<Track>>([type, playbackId]);

    if (!data) {
        const queryHandler = queryHandlers[type];
        data = await queryHandler(playbackId);

        queryClient.setQueryData<Album | Playlist<Track>>([type, playbackId], data);
    }

    return data;
}

export async function setCurrentPlayback(
    type: PlayerTypesStr,
    playbackId: string,
    trackId: string
) {
    const data = await getData(type, playbackId);

    const currentPlayback = currentPlaybackStore();

    currentPlayback.currentTrackId = trackId;
    currentPlayback.currentPlaybackType = type;

    if (playbackId !== currentPlayback.currentPlaybackInfo?.id) {
        currentPlayback.currentPlaybackInfo = data;
    }
}