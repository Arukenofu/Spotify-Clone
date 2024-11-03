import {computed, shallowRef} from 'vue';
import { defineStore } from 'pinia';
import type { Track } from '@/services/types/Entities/Track';
import type {PlaylistInfoDossier} from "@/services/api/music/types/PlaylistInfo";

export default defineStore('usePlaylistStore', () => {
  const currentPlaylistInfo = shallowRef<PlaylistInfoDossier | null>(
    null
  );

  const currentQueue = shallowRef<Track[]>([]);

  function setCurrentPlaylistInfo(playlist: PlaylistInfoDossier | null) {
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
