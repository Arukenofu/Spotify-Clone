import type { Artist, Page, SimplifiedTrack } from '@spotify/web-api-ts-sdk'
import { sdk } from '@/services/sdk'
import { getMaskColor } from '@/shared/utils/colors/getMaskColor'

async function fetchAlbumData(albumId: string) {
  return sdk.albums.get(albumId)
}

async function fetchArtistData(artists: Artist[]) {
  if (artists.length === 1) {
    return [await sdk.artists.get(artists[0].id)]
  }

  return artists
}

export async function fetchAlbum(albumId: string) {
  const data = await fetchAlbumData(albumId)

  data.tracks.items = data.tracks.items.filter(value => Boolean(value))

  const maskColor = await getMaskColor(data, 2)
  const artists = await fetchArtistData(data.artists)

  return { ...data, artists, maskColor }
}

export function fetchNextAlbum(nextLink: string) {
  return sdk.makeRequest<Page<SimplifiedTrack>>('GET', nextLink)
}
