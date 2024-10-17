import { defineStore } from 'pinia';
import useCachedRef from '@/shared/composables/useCachedRef';
import repeatModes from '@/widgets/MediaPlayer/constants/repeatModes';

type RepeatModes = 'onlyCurrentMusic' | 'repeatCurrentPlaylist' | 'repeatCurrentMusic';

export const useUserSettings = defineStore('useUserSettings', () => {
  const currentRepeatMode = useCachedRef<RepeatModes>(
      'repeatMode',
      'onlyCurrentMusic',
      {
        expectedValues: repeatModes
      }
    ),
    isShuffle = useCachedRef<boolean>('isShuffle', false, {
      expectedTypes: ['boolean']
    })

  function toggleRepeatMode() {
    const repeatModes: RepeatModes[] = [
      'onlyCurrentMusic',
      'repeatCurrentPlaylist',
      'repeatCurrentMusic'
    ];

    const currentIndex = repeatModes.indexOf(currentRepeatMode.value!);
    const nextIndex = (currentIndex + 1) % repeatModes.length;

    currentRepeatMode.value = repeatModes[nextIndex];
  }

  return {
    currentRepeatMode,
    isShuffle,
    toggleRepeatMode,

  };
});
