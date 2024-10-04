import {defineStore} from "pinia";
import {ref} from "vue";
import useMusicUtils from "../composables/useMusicUtils";

export default defineStore('useMusicStore', () => {
    const audio = ref<HTMLAudioElement | null>(null);

    const isPlaying = ref<Readonly<boolean>>(false);

    window.addEventListener('keydown',(event: KeyboardEvent) => {
        const { toggleTrackPlaying } = useMusicUtils();

        if (event.code === 'Space') {
            event.preventDefault();
            toggleTrackPlaying();
        }
    });

    return {
        audio,
        isPlaying
    }
});