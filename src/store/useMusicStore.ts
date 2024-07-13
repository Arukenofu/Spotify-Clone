import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Music} from "@/models/Music";

export const useMusicStore = defineStore('musicStore', () => {
    const isPlaying = ref<boolean>(false);

    const currentQueue = ref<Music[]>([
        {
            id: 1,
            name: 'Мосты',
            artist: 'Rauf & Faik',
            url: '/Мосты.mp3',
            avatar: 'https://images.genius.com/fa191dad617f50d53659774740e3bc6d.500x500x1.jpg'
        },
        {
            id: 2,
            name: 'Ozin Gana',
            artist: 'Moldanazar',
            url: '/Moldanazar.mp3',
            avatar: 'https://i1.sndcdn.com/avatars-000061514491-975jfo-t1080x1080.jpg'
        }
    ]);
    const currentMusicId = ref<number>(2);

    const currentMusicData = computed(() => {
        return currentQueue.value.find(value => value.id === currentMusicId.value)!
    });

    return {
        isPlaying,
        currentQueue,
        currentMusicId,
        currentMusicData
    }
})