import {storeToRefs} from "pinia";
import {useMusicStore} from "@/shared/store/useMusicStore";
import useTitle from "@/shared/composables/useTitle";

import type {Music} from "@/shared/models/Music";

export default function (){
    const store = useMusicStore();

    const {
        audio,
        isPlaying,
        currentAudioId,
        currentAudioIndexInQueue,
        currentAudioData,
        currentQueue
    } = storeToRefs(store);

    const {getAudioData} = store;

    function playAudio() {
        audio.value!.play().then(() => {
            isPlaying.value = true;
        });

        let artistsString: string = '';

        currentAudioData.value.artists.map((value, index, array) => {
            artistsString += `${value.name}`

            if (index !== array.length - 1) {
                artistsString += `, `;
            }
        });

        useTitle(`${currentAudioData.value.name} • ${artistsString}`);
    }

    function pauseAudio() {
        audio.value!.pause();
        isPlaying.value = false;

        useTitle();
    }

    function loadSong(data: Music, album?: Music[]) {
        if (album) {
            currentQueue.value = album;
        }

        currentAudioId.value = data.id;

        if (audio.value && audio.value.src) {
            pauseAudio();
            audio.value.src = '';
        }

        audio.value = new Audio();
        audio.value.src = data.url;

        playAudio();
    }

    function nextTrack() {
        if (currentAudioIndexInQueue.value + 1 === currentQueue.value.length) {
            return loadSong(currentQueue.value[0]);
        }

        return loadSong(getAudioData(currentAudioIndexInQueue.value + 1));
    }

    function previousTrack() {
        if (currentAudioIndexInQueue.value === 0) {
            return loadSong(currentQueue.value[currentQueue.value.length - 1]);
        }

        return loadSong(getAudioData(currentAudioIndexInQueue.value - 1));
    }

    function toggleTrackPlaying() {
        if (audio.value?.paused) {
            return playAudio();
        }

        pauseAudio();
    }


    return {
        loadSong,
        toggleTrackPlaying,
        nextTrack,
        previousTrack
    }
}