import {queryClient} from "@/app/lib/VueQuery";
import {fetchPlaylist} from "@/services/sdk/entities/playlist";
import {fetchAlbum} from "@/services/sdk/entities/album";
import {currentPlaybackStore} from "@/features/MediaPlayer/store/currentPlaybackStore";
import type {PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";
import type {Album, Playlist, Track} from "@spotify/web-api-ts-sdk";

const queryHandlers: Record<PlayerTypesStr, Function> = {
    'playlist': fetchPlaylist,
    'album': fetchAlbum
}

export async function setCurrentPlayback(
    type: PlayerTypesStr,
    playbackId: string,
    trackId: string
) {
    let data = queryClient.getQueryData<Album | Playlist<Track>>([type, playbackId]);

    if (!data) {
        const queryHandler = queryHandlers[type];

        data = queryClient.setQueryData<Album | Playlist<Track>>([type, playbackId], () => {
            return queryHandler(playbackId)
        });
    }

    const currentPlayback = currentPlaybackStore();

    currentPlayback.currentPlaybackInfo = data!;
    currentPlayback.currentTrackId = trackId;
}