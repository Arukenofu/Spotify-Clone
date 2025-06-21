import ytSearch from 'yt-search'
import YTMusic from 'ytmusic-api'

export type SearchSources = 'yt-music' | 'youtube'

async function searchMedia(
  source: SearchSources,
  query: string,
) {
  if (source === 'youtube') {
    const results = await ytSearch(query)

    return results.videos[0].videoId
  }

  const ytmusic = new YTMusic()
  await ytmusic.initialize()
  const data = await ytmusic.searchSongs(query)

  return data[0].videoId
}

export { searchMedia }
