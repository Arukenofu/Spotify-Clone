import {useMusicStore} from "@/store/useMusicStore";
import {ref} from "vue";
import {useMediaControls} from "@vueuse/core";
import {storeToRefs} from "pinia";
import usePlayerControls from "@/composables/usePlayerControls";
import getRandomNumber from "@/utils/getRandomNumber";

function getMusicStoreRefs() {
    const store = useMusicStore();

    return storeToRefs(store);
}

export function toggleAudioPlayingState(): void {
    const {isPlaying} = getMusicStoreRefs();

    isPlaying.value =! isPlaying.value;
}

export function getUpdatedMusic() {
    const {currentMusicData} = getMusicStoreRefs();

    const core = ref(document.getElementById('coreAudio') as HTMLAudioElement);

    return useMediaControls(core,{
        src: ref(currentMusicData.value.url)
    });
}

export function incrementMusicId() {
    const {currentQueue, currentMusicId, currentMusicIndex} = getMusicStoreRefs();
    const {isShuffle} = usePlayerControls();

    if (isShuffle.value) {
        return changeMusicByIndex(getRandomNumber(currentQueue.value.length - 1, currentMusicIndex.value))
    }

    if (currentMusicIndex.value + 1 === currentQueue.value.length) {
        return currentMusicId.value = currentQueue.value[0].id;
    }

    currentMusicId.value = currentQueue.value[currentMusicIndex.value + 1].id
}

export function decrementMusicId() {
    const {currentQueue, currentMusicId, currentMusicIndex} = getMusicStoreRefs();

    if (currentMusicIndex.value === 0) {
        return currentMusicId.value = currentQueue.value[currentQueue.value.length - 1].id;
    }

    currentMusicId.value = currentQueue.value[currentMusicIndex.value - 1].id
}

export function changeMusicByIndex(index: number) {
    const {currentQueue, currentMusicId, currentMusicIndex} = getMusicStoreRefs();

    if (currentMusicIndex.value === index) {
        return currentMusicId.value = currentQueue.value[0].id;
    }

    currentMusicId.value = currentQueue.value[index].id;
}