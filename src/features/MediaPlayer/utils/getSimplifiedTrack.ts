import type { PlaylistedTrack, SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'

export default function getSimplifiedTrack(
  item: PlaylistedTrack<Track> | SimplifiedTrack,
) {
  if ('added_at' in item) {
    return item.track
  }

  return item
}
