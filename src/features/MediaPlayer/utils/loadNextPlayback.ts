import type { PlayerTypes, PlayerTypesStr } from '@/features/MediaPlayer/types/PlayerTypes'
import { queryClient } from '@/app/lib/VueQuery'
import { fetchNextAlbum } from '@/services/sdk/entities/album'
import { fetchNextPlaylist } from '@/services/sdk/entities/playlist'

const entities = {
  playlist: fetchNextPlaylist,
  album: fetchNextAlbum,
}

async function loadNextPlayback(
  playbackId: string,
  type: PlayerTypesStr,
  nextLink: string | null,
) {
  if (!nextLink)
    return

  const data = await entities[type](nextLink.replace('https://api.spotify.com/v1/', ''))

  const playback = queryClient.getQueryData<PlayerTypes>([type, playbackId])
  if (!playback)
    return

  const updatedPlayback: PlayerTypes = {
    ...playback,
    tracks: {
      ...playback.tracks,
      // @ts-ignore
      items: [...playback.tracks.items, ...data.items],
      next: data.next,
    },
  }

  queryClient.setQueryData([type, playbackId], updatedPlayback)

  return updatedPlayback
}

export { loadNextPlayback }
