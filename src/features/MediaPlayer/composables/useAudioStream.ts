import {ref} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const isLoading = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = useCachedRef<number>('volume', 0.75, { min: 0, max: 1 });

export function useAudioStream() {
    async function loadTrack(name: string, artist: string) {
        if (!audio.value) return;

        isLoading.value = true;
        isPlaying.value = false;
        currentTime.value = 0;

        await new Promise<void>((resolve, reject) => {
            const onCanPlay = () => {
                audio.value?.removeEventListener('loadedmetadata', onCanPlay);
                resolve();
            };

            const onError = () => {
                audio.value!.removeEventListener('error', onError);
                reject(new Error('Ошибка загрузки аудио'));
            };

            audio.value!.addEventListener('loadedmetadata', onCanPlay, {once: true});
            audio.value!.addEventListener('error', onError, {once: true});

            audio.value!.src = `/api/track/?name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`;
            audio.value!.load();
        });

        isLoading.value = false;
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

    return {
        instance: audio,
        isPlaying: isPlaying as Readonly<typeof isPlaying>,
        isLoading: isLoading as Readonly<typeof isLoading>,
        currentTime: currentTime as Readonly<typeof currentTime>,
        duration: duration as Readonly<typeof duration>,
        volume: volume as Readonly<typeof volume>,
        loadTrack,
        play,
        pause,
        seek,
        setVolume
    };
}