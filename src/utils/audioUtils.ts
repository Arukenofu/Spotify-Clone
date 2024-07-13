import {useMusicStore} from "@/store/useMusicStore";
import {ref} from "vue";
import {useMediaControls} from "@vueuse/core";
import {storeToRefs} from "pinia";

export function toggleAudioPlayingState(): void {
    const store = useMusicStore();
    const {isPlaying} = storeToRefs(store);

    isPlaying.value =! isPlaying.value;
}

export function getUpdatedMusic() {
    const store = useMusicStore();
    const {currentMusicData} = storeToRefs(store);

    const core = ref(document.getElementById('coreAudio') as HTMLAudioElement);

    return useMediaControls(core,{
        src: ref(currentMusicData.value.url)
    });
}