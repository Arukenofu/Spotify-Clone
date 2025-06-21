import type { MediaStreamSources } from '@/features/UserPreferences/types/MediaStreamSources.ts'
import type { RepeatModes } from '@/features/UserPreferences/types/RepeatModes'
import type { TrackListFormats } from '@/features/UserPreferences/types/TrackListFormats'
import { defineStore } from 'pinia'
import useCachedRef from '@/shared/composables/useCachedRef'
import repeatModes from '@/widgets/MediaPlayer/constants/repeatModes'

const userPreferencesStore = defineStore('userPreferences', () => {
  const currentRepeatMode = useCachedRef<RepeatModes>('repeatMode', 'onlyCurrentMusic', {
    expectedValues: repeatModes,
  })

  const isShuffle = useCachedRef<boolean>('isShuffle', false, {
    expectedTypes: ['boolean'],
  })

  const tracksFormat = useCachedRef<TrackListFormats>('playlistFormat', 'Compact', {
    expectedTypes: ['string'],
    expectedValues: ['Compact', 'List'],
  })

  function toggleRepeatMode() {
    const repeatModes: RepeatModes[] = [
      'onlyCurrentMusic',
      'repeatCurrentPlaylist',
      'repeatCurrentMusic',
    ]

    const currentIndex = repeatModes.indexOf(currentRepeatMode.value!)
    const nextIndex = (currentIndex + 1) % repeatModes.length

    currentRepeatMode.value = repeatModes[nextIndex]
  }

  function toggleIsShuffle() {
    isShuffle.value = !isShuffle.value
  }

  const mediaStreamSource = useCachedRef<MediaStreamSources>('mediaStreamSource', 'yt-music', {
    expectedTypes: ['string'],
    expectedValues: ['yt-music', 'youtube'],
  })

  return {
    tracksFormat,
    currentRepeatMode,
    isShuffle,
    mediaStreamSource,
    toggleRepeatMode,
    toggleIsShuffle,
  }
})

export { userPreferencesStore }
