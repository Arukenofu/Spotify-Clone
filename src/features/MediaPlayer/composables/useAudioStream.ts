import {onUnmounted, ref} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = useCachedRef<number>('volume', 0.75, { min: 0, max: 1 });

export function useAudioStream() {
    function setAudioUrl(id: string) {
        audio.value!.src = `/api/track/${id}`;
        audio.value!.load();
    }

    function play() {
        audio.value?.play();
    }

    function pause() {
        audio.value?.pause();
    }

    function seek(time: number) {
        if (audio.value) {
            audio.value.currentTime = time;
        }
    }

    function setVolume(v: number) {
        volume.value = v;
        if (audio.value) {
            audio.value.volume = v;
        }
    }

    onUnmounted(() => {
        audio.value?.pause();
        audio.value?.removeAttribute('src');
        audio.value?.load();
        audio.value = null;
    });

    return {
        instance: audio,
        isPlaying: isPlaying as Readonly<typeof isPlaying>,
        currentTime: currentTime as Readonly<typeof currentTime>,
        duration: duration as Readonly<typeof duration>,
        volume: volume as Readonly<typeof volume>,
        setAudioUrl,
        play,
        pause,
        seek,
        setVolume
    };
}