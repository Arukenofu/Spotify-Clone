import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

import type {Music} from "@/shared/models/Music";
import baseQueue from "@/features/MediaPlayer/constants/baseQueue";
import basePlaylistInfo from "@/features/MediaPlayer/constants/basePlaylistInfo";
import type CurrentPlaylistInfo from "@/features/MediaPlayer/types/CurrentPlaylistInfo";

export default defineStore('usePlaylistStore', () => {
    const currentPlaylist = shallowRef<CurrentPlaylistInfo | null>(basePlaylistInfo);

    const currentQueue = ref<Music[]>(baseQueue);

    return {
        currentPlaylist,
        currentQueue
    }
});