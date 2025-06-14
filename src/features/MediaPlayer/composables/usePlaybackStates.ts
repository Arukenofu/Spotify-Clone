import {currentPlaybackStore} from "@/features/MediaPlayer";
import type {PlayerTypesStr} from "@/features/MediaPlayer/types/PlayerTypes";

function usePlaybackStates() {
    const currentPlayback = currentPlaybackStore();

    function isCurrentPlayback(type: PlayerTypesStr, id: string) {
        return type === currentPlayback.currentPlaybackType && id === currentPlayback.currentPlaybackInfo?.id;
    }

    function isCurrentTrack(id: string) {
        return id === currentPlayback.currentTrackId;
    }

    return {
        isCurrentPlayback,
        isCurrentTrack
    }
}

export {usePlaybackStates};