import ytSearch from 'yt-search'
import YTMusic, { type SongDetailed } from 'ytmusic-api'

export type SearchSources = 'yt-music' | 'youtube'

export const searchCache = new Map<string, ytSearch.SearchResult | SongDetailed[]>()

function getMediaId(data: ytSearch.SearchResult | SongDetailed[]) {
  return Array.isArray(data) ? data[0].videoId : data.videos[0].videoId
}

async function searchMedia(
  source: SearchSources,
  query: string,
) {
  const cacheKey = `${source}:${query}`

  if (searchCache.has(cacheKey)) {
    return getMediaId(searchCache.get(cacheKey)!)
  }

  let data: ytSearch.SearchResult | SongDetailed[]

  if (source === 'youtube') {
    data = await ytSearch(query)
  }
  else {
    const ytmusic = new YTMusic()
    await ytmusic.initialize()
    data = await ytmusic.searchSongs(query)
  }

  if (data) {
    searchCache.set(cacheKey, data)
  }

  return getMediaId(data)
}

export { searchMedia }
