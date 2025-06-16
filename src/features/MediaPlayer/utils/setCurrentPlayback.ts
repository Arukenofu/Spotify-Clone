import type { Album, Playlist, Track } from '@spotify/web-api-ts-sdk'
import type { PlayerTypesStr } from '@/features/MediaPlayer/types/PlayerTypes'
import { queryClient } from '@/app/lib/VueQuery'
import { useAudioStream } from '@/features/MediaPlayer'
import { currentPlaybackStore } from '@/features/MediaPlayer/store/currentPlaybackStore'
import { fetchAlbum } from '@/services/sdk/entities/album'
import { fetchPlaylist } from '@/services/sdk/entities/playlist'
import { getTrackData } from '@/services/sdk/entities/track.ts'

const queryHandlers: Record<PlayerTypesStr, (id: string) => Promise<Album | Playlist<Track>>> = {
  playlist: fetchPlaylist,
  album: fetchAlbum,
}

async function getPlaybackData(type: PlayerTypesStr, playbackId: string) {
  let data = queryClient.getQueryData<Album | Playlist<Track>>([type, playbackId])

  if (!data) {
    const queryHandler = queryHandlers[type]
    data = await queryHandler(playbackId)

    queryClient.setQueryData<Album | Playlist<Track>>([type, playbackId], data)
  }

  return data
}

export async function setCurrentPlayback(
  type: PlayerTypesStr,
  playbackId: string,
  trackId: string,
) {
  const currentPlayback = currentPlaybackStore()
  const stream = useAudioStream()

  if (trackId === currentPlayback.currentTrackId && playbackId === currentPlayback.currentPlaybackInfo?.id) {
    stream.toggle()
    return
  }

  stream.pause()

  currentPlayback.currentTrack = await getTrackData(trackId)
  currentPlayback.currentTrackId = trackId
  currentPlayback.currentPlaybackType = type

  if (playbackId !== currentPlayback.currentPlaybackInfo?.id) {
    currentPlayback.currentPlaybackInfo = await getPlaybackData(type, playbackId)
  }
}
