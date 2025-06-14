import getSimplifiedTrack from "@/features/MediaPlayer/utils/getSimplifiedTrack";
import {currentPlaybackStore, setCurrentPlayback, useAudioStream} from "@/features/MediaPlayer";
import {reactive} from "vue";

function usePlaybackControls() {
    const stream = reactive(useAudioStream());
    const currentPlayback = currentPlaybackStore();

    function toggleCurrentTrack() {
        stream.isPlaying ? stream.pause() : stream.play();
    }

    function nextTrack() {
        const index = currentPlayback.currentTrackIndex!;
        const queue = currentPlayback.currentTracksQueue!

        if (index === queue.length - 1) return;

        setTrackByIndex(index + 1);
    }

    function previousTrack() {
        const index = currentPlayback.currentTrackIndex!;
        if (index === 0) return;

        setTrackByIndex(index - 1);
    }

    function setTrackByIndex(index: number) {
        const queue = currentPlayback.currentTracksQueue!;
        const nextTrackId = getSimplifiedTrack(queue[index]).id;

        if (!nextTrackId) return;

        setCurrentPlayback(
            currentPlayback.currentPlaybackType!,
            currentPlayback.currentPlaybackInfo!.id,
            nextTrackId
        );
    }

    return {
        toggleCurrentTrack,
        nextTrack,
        previousTrack,
        setTrackByIndex
    }
}

export {usePlaybackControls};