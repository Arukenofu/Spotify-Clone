import type { Track } from '@spotify/web-api-ts-sdk'
import type { PlayerTypes, PlayerTypesStr } from '@/features/MediaPlayer/types/PlayerTypes'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getPlaybackQueue } from '@/features/MediaPlayer/utils/getPlaybackQueue.ts'
import getSimplifiedTrack from '@/features/MediaPlayer/utils/getSimplifiedTrack'
import { loadNextPlayback } from '@/features/MediaPlayer/utils/loadNextPlayback'

const currentPlaybackStore = defineStore('currentPlaybackStore', () => {
  const currentPlaybackType = ref<PlayerTypesStr | null>(null)
  const currentPlaybackInfo = ref<PlayerTypes | null>(null)
  const currentTrack = ref<Track | null>(null)
  const currentTrackId = ref<string>('none')

  const currentTrackIndex = computed<number>(() => {
    if (!currentPlaybackInfo.value || !currentTrackId.value)
      return -1

    return currentPlaybackInfo.value.tracks?.items?.findIndex((track) => {
      const simplifiedTrack = getSimplifiedTrack(track)

      return simplifiedTrack.id === currentTrackId.value
    })
  })

  const currentTracksQueue = computed(() => {
    if (!currentPlaybackInfo.value)
      return []

    return getPlaybackQueue(currentPlaybackInfo.value.tracks.items)
  })

  async function loadNextTracks() {
    const id = currentPlaybackInfo.value?.id
    const nextLink = currentPlaybackInfo.value?.tracks.next || null
    const type = currentPlaybackType.value

    if (!id || !type)
      return

    await loadNextPlayback(
      id,
      type,
      nextLink,
    )
  }

  return {
    currentPlaybackInfo,
    currentTracksQueue,
    currentPlaybackType,
    currentTrackId,
    currentTrackIndex,
    currentTrack,
    loadNextTracks,
  }
})

export { currentPlaybackStore }
