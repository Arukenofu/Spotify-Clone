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
        const playbackInfo = currentPlayback.currentPlaybackInfo!

        if (index === playbackInfo.tracks.items.length - 1) return;

        const nextTrackId = getSimplifiedTrack(playbackInfo.tracks.items[index + 1]).id;
        setCurrentPlayback(
            currentPlayback.currentPlaybackType!,
            currentPlayback.currentPlaybackInfo!.id,
            nextTrackId
        );
    }

    function previousTrack() {
        const index = currentPlayback.currentTrackIndex!;
        const playbackInfo = currentPlayback.currentPlaybackInfo!

        if (index === 0) return;

        const nextTrackId = getSimplifiedTrack(playbackInfo.tracks.items[index - 1]).id;
        setCurrentPlayback(
            currentPlayback.currentPlaybackType!,
            currentPlayback.currentPlaybackInfo!.id,
            nextTrackId
        );
    }

    return {
        toggleCurrentTrack,
        nextTrack,
        previousTrack
    }
}

export {usePlaybackControls};