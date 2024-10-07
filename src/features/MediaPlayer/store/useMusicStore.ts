import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('useMusicStore', () => {
  const audio = ref<HTMLAudioElement | null>(null);

  const isPlaying = ref<Readonly<boolean>>(false);

  return {
    audio,
    isPlaying
  };
});
