import {computed, shallowRef} from 'vue';
import {defineStore} from 'pinia';
import type {Track} from '@/services/types/Entities/Track';
import type {Playlist} from "@/services/types/Entities/Playlist";

export default defineStore('usePlaylistStore', () => {
  const currentPlaylistInfo = shallowRef<Playlist | null>(
    null
  );

  const currentQueue = shallowRef<Track[]>([]);

  function setCurrentPlaylistInfo(playlist: Playlist | null) {
    currentPlaylistInfo.value = playlist;
  }

  function setNewQueue(queue: Track[]) {
    currentQueue.value = queue;
  }

  return {
    currentPlaylistInfo: computed(() => currentPlaylistInfo.value),
    currentQueue: computed(() => currentQueue.value),
    setCurrentPlaylistInfo,
    setNewQueue
  };
});
