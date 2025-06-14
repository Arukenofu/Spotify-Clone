import type {PlayerTypes} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";

export function currentTrackImage(
    currentPlaybackInfo: PlayerTypes,
    currentTrack: Track | SimplifiedTrack,
    index = 1
) {
    if (!currentPlaybackInfo || !currentTrack) return '';

    if ('album' in currentTrack!) {
        return currentTrack.album.images[index].url;
    }

    return currentPlaybackInfo!.images[index].url;
}