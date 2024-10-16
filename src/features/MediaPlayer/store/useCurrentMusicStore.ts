import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import type { Music } from '@/services/types/Music';

export default defineStore('useCurrentMusicStore', () => {
  const playlistStore = usePlaylistStore();
  const currentAudioId = ref<number | null>(null);

  const currentAudioIndexInQueue = computed(() => {
    const index = playlistStore.currentQueue.findIndex(
      (value) => value.id === currentAudioId.value
    );

    return index !== -1 ? index : null;
  });

  const currentAudioData = computed<Music | null>(() => {
    if (currentAudioIndexInQueue.value === null) {
      return null;
    }

    return playlistStore.currentQueue[currentAudioIndexInQueue.value];
  });

  return {
    currentAudioId,
    currentAudioData,
    currentAudioIndexInQueue
  };
});
