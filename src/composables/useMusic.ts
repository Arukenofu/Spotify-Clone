import {useMediaControls} from "@vueuse/core";
import {ref, watch} from "vue";
import {useMusicStore} from "@/store/useMusicStore";
import {storeToRefs} from "pinia";
import {getUpdatedMusic} from "@/utils/audioUtils";

type options = Parameters<typeof useMediaControls>[1];



export default function (options: options = {}) {
    const core = ref(document.getElementById('coreAudio') as HTMLAudioElement);

    const controls = useMediaControls(core, options)
    const store = useMusicStore();
    const {isPlaying, currentMusicId} = storeToRefs(store);

    watch(controls.playing, (value) => {
        isPlaying.value = value
    });

    watch(isPlaying, (value) => {
        controls.playing.value = value;
    });

    watch(currentMusicId, () => {
        const {playing} = getUpdatedMusic();

        playing.value = true;
    });

    return {
        ...controls
    }
}