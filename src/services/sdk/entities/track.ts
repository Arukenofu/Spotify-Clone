import { sdk } from '@/services/sdk'
import { resolveWithCache } from '@/services/sdk/utils/resolveWithCache.ts'

export async function getTrackData(id: string) {
  return resolveWithCache(['track', id], () => sdk.tracks.get(id))
}
