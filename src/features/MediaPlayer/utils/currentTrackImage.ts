import type {PlayerTypes} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";

export function currentTrackImage(
    currentPlaybackInfo: PlayerTypes,
    currentTrack: Track | SimplifiedTrack
) {
    if (!currentPlaybackInfo || !currentTrack) return '';

    if ('album' in currentTrack!) {
        return currentTrack.album.images[1].url;
    }

    return currentPlaybackInfo!.images[1].url;
}