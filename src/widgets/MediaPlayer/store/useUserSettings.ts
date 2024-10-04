import { defineStore } from 'pinia';
import useCachedRef from '@/shared/composables/useCachedRef';
import repeatModes from '@/widgets/MediaPlayer/constants/repeatModes';

type RepeatModes = (typeof repeatModes)[number];

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
    }),
    volume = useCachedRef<number>('volume', 0.75, {
      min: 0,
      max: 1
    });

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
    volume
  };
});
