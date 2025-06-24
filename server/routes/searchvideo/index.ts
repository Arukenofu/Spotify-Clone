import type { FastifyRequest } from 'fastify'
import type ytSearch from 'yt-search'
import { searchCache } from '../../utils/searchMedia'

async function videoSearchHandler(request: FastifyRequest) {
  try {
    const { name, artist } = request.query as {
      name?: string
      artist?: string
    }

    const cacheKey = `youtube:${name} - ${artist}`

    const data = searchCache.get(cacheKey)! as ytSearch.SearchResult

    return data.videos
  }
  catch (e) {
    console.error(e)

    return null
  }
}

export default videoSearchHandler
