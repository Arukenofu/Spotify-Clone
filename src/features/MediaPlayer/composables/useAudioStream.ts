import {onUnmounted, ref} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";
import type {Track} from "@spotify/web-api-ts-sdk";

const audio = ref<HTMLAudioElement | null>(null);

export function useAudioStream(onMusicEnded: () => void) {
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = useCachedRef<number>('volume', 0.75, { min: 0, max: 1 });

    const currentTrack = ref<Track>();

    function initAudio() {
        if (audio.value) return;

        const el = new Audio();
        el.preload = 'none';
        el.crossOrigin = 'anonymous';
        el.volume = volume.value;

        el.addEventListener('loadedmetadata', () => {
            duration.value = isFinite(el.duration) ? el.duration : 0;
        });

        el.addEventListener('timeupdate', () => {
            currentTime.value = el.currentTime;
            if (duration.value && currentTime.value >= duration.value) {
                onMusicEnded();
            }
        });

        el.addEventListener('ended', onMusicEnded);

        el.addEventListener('play', () => isPlaying.value = true);
        el.addEventListener('pause', () => isPlaying.value = false);

        audio.value = el;
    }

    function setAudioUrl(track: Track) {
        if (!audio.value) initAudio();

        if (currentTrack.value?.id !== track.id) {
            audio.value!.src = `/api/track/${track.id}`;
            audio.value!.load();
        }
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
        audio,
        isPlaying,
        currentTime,
        duration,
        volume,
        setAudioUrl,
        play,
        pause,
        seek,
        setVolume
    };
}