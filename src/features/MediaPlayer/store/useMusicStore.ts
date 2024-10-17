import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import useCachedRef from "@/shared/composables/useCachedRef";

export default defineStore('useMusicStore', () => {
  const audio = ref<HTMLAudioElement | null>(null);

  const isPlaying = ref<Readonly<boolean>>(false);
  const currentTime = ref<number>(0);
  const duration = ref<number>(0);
  const volume = useCachedRef<number>('volume', 0.75, {
    min: 0,
    max: 1
  });

  function setAudioUrl(url: string | '') {
    audio.value = new Audio(url);
  }

  function loadMetaData() {
    audio.value?.addEventListener('loadedmetadata', () => {
      audio.value!.volume = volume.value;
      duration.value = audio.value!.duration;
    });
  }

  function autoTimeUpdate(onMusicEnded: Function) {
    audio.value?.addEventListener('timeupdate', () => {
      currentTime.value = audio.value!.currentTime;

      if (currentTime.value === duration.value) {
        onMusicEnded();
      }
    });
  }

  return {
    audio: computed(() => audio.value),
    isPlaying,
    currentTime,
    duration,
    volume,
    setAudioUrl,
    loadMetaData,
    autoTimeUpdate
  };
});
