import ytdl from '@distube/ytdl-core'

export const mediaInfoCache = new Map<string, any>()

export async function getMediaInfo(id: string) {
  if (mediaInfoCache.has(id)) {
    return mediaInfoCache.get(id)!
  }

  const info = await ytdl.getInfo(id)
  mediaInfoCache.set(id, info)

  return info
}
