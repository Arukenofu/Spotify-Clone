import type { PlayerTypesStr } from '@/features/MediaPlayer/types/PlayerTypes'
import { currentPlaybackStore } from '@/features/MediaPlayer'

function usePlaybackStates() {
  const currentPlayback = currentPlaybackStore()

  function isCurrentPlayback(type: PlayerTypesStr, id: string) {
    return type === currentPlayback.currentPlaybackType && id === currentPlayback.currentPlaybackInfo?.id
  }

  function isCurrentTrack(id: string) {
    return id === currentPlayback.currentTrackId
  }

  return {
    isCurrentPlayback,
    isCurrentTrack,
  }
}

export { usePlaybackStates }
