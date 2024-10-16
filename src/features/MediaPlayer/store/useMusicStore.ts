import { defineStore } from 'pinia';
import {computed, ref} from 'vue';

export default defineStore('useMusicStore', () => {
  const audio = ref<HTMLAudioElement | null>(null);

  function setAudioUrl(url: string | '') {
    audio.value = new Audio(url);
  }

  const isPlaying = ref<Readonly<boolean>>(false);

  return {
    audio: computed(() => audio.value),
    isPlaying,
    setAudioUrl,
  };
});
