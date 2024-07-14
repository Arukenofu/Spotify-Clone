import {useMediaControls} from "@vueuse/core";
import {ref, watch} from "vue";
import {useMusicStore} from "@/store/useMusicStore";
import {storeToRefs} from "pinia";
import {getUpdatedMusic, incrementMusicId} from "@/utils/audioUtils";
import usePlayerControls from "@/composables/usePlayerControls";
import useCachedRef from "@/composables/useCachedRef";

type options = Parameters<typeof useMediaControls>[1];

export default function (options: options = {}) {
    const core = ref(document.getElementById('coreAudio') as HTMLAudioElement);

    const controls = useMediaControls(core, options);

    useCachedRef(controls.volume, 'volume');

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

    const {currentRepeatMode} = usePlayerControls();

    watch(controls.currentTime, async (value) => {
        if (value !== controls.duration.value) {
            return;
        }

        if (currentRepeatMode.value === 'repeatOnlyCurrentMusic') {
            controls.currentTime.value = 0;

            setTimeout(() => {
                controls.playing.value = true;
            }, 1);

            return;
        }

        if (currentRepeatMode.value !== 'onlyCurrentMusic') {
            incrementMusicId();
        }

    })

    return {
        ...controls
    }
}