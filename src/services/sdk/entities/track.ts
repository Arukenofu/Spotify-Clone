import type { Track } from '@spotify/web-api-ts-sdk'
import { queryClient } from '@/app/lib/VueQuery'
import { sdk } from '@/services/sdk'

export async function getTrackData(id: string) {
  let data = queryClient.getQueryData<Track>(['track', id])

  if (!data) {
    data = await sdk.tracks.get(id)

    queryClient.setQueryData<Track>(['track', id], data)
  }

  return data
}
