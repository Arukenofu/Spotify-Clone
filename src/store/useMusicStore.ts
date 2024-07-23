import {defineStore} from "pinia";
import {computed, onMounted, ref} from "vue";

import type {Music} from "@/models/Music";

export const useMusicStore = defineStore('useMusicStore', () => {
    onMounted(() => {
        audio.value = new Audio(currentAudioData.value.url);
    })

    const audio = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref<boolean>(false);
    const currentAudioId = ref<number | null>(1);

    const currentQueue = ref<Music[]>([
        {
            id: 1,
            name: 'Мосты',
            artists: [
                {
                    id: 1,
                    name: 'Rauf',
                    url: 'rauf'
                },
                {
                    id: 2,
                    name: 'Faik',
                    url: 'faik'
                }
            ],
            url: '/Мосты.mp3',
            avatar: 'https://images.genius.com/fa191dad617f50d53659774740e3bc6d.500x500x1.jpg'
        },
        {
            id: 2,
            name: 'Ozin Gana',
            artists: [
                {
                    id: 3,
                    name: 'Moldanazar',
                    url: 'moldanazar'
                }
            ],
            url: '/Moldanazar.mp3',
            avatar: 'https://i1.sndcdn.com/avatars-000061514491-975jfo-t1080x1080.jpg'
        }
    ]);

    const currentAudioIndexInQueue = computed(() => {
        return currentQueue.value.findIndex(value => value.id === currentAudioId.value);
    });

    const currentAudioData = computed(() => {
        return getAudioData(currentAudioIndexInQueue.value);
    });

    function getAudioData(index: number) {
        return currentQueue.value[index]
    }

    function loadSong(data: Music, album?: Music[]) {
        if (album) {
            currentQueue.value = album;
        }

        currentAudioId.value = data.id;

        if (audio.value && audio.value.src) {
            audio.value.pause();
            isPlaying.value = false;
            audio.value.src = '';
        }

        audio.value = new Audio();
        audio.value.src = data.url;

        audio.value!.play().then(() => {
            isPlaying.value = true;
        });
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
            return audio.value!.play().then(() => {
                isPlaying.value = true;
            });
        }

        isPlaying.value = false;
        audio.value!.pause();
    }

    return {
        audio,
        isPlaying,
        currentAudioId,
        currentAudioIndexInQueue,
        currentAudioData,
        currentQueue,
        loadSong,
        toggleTrackPlaying,
        nextTrack,
        previousTrack
    }
})