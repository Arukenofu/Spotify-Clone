import type { SimplifiedTrack } from '@spotify/web-api-ts-sdk'
import type { PlayerTypes } from '@/features/MediaPlayer/types/PlayerTypes.ts'

function getPlaybackQueue(instance: PlayerTypes['tracks']['items']) {
  if ('added_at' in instance[0]) {
    return instance.map(track => track.track) as SimplifiedTrack[]
  }

  return instance as SimplifiedTrack[]
}

export { getPlaybackQueue }
