import type {PlayerTypes} from "@/features/MediaPlayer/types/PlayerTypes";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import {getImageUrlSafe} from "@/shared/utils/image/getImageUrlSafe";

export function currentTrackImage(
    currentPlaybackInfo: PlayerTypes,
    currentTrack: Track | SimplifiedTrack,
    index = 1
) {
    if (!currentPlaybackInfo || !currentTrack) return '';

    if ('album' in currentTrack!) {
        return getImageUrlSafe(currentTrack.album.images, index);
    }

    return getImageUrlSafe(currentPlaybackInfo.images, index);
}