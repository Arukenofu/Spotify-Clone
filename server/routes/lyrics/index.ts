import type { FastifyReply, FastifyRequest } from 'fastify'
import { MusixMatchAPI } from 'musicxmatch-api'

interface FastifyReplyWithQueries extends FastifyRequest {
  query: {
    name?: string
    artist?: string
  }
}

async function trackLyricsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, artist } = (request as FastifyReplyWithQueries).query

  if (!name) {
    reply.status(400).send({ error: 'Параметр "name" обязателен.' })
    return
  }

  try {
    const musixMatchAPI = new MusixMatchAPI()
    const tracks = await musixMatchAPI.searchTracks({
      track: name,
      artist,
      page: 1,
    })

    const lyrics = await musixMatchAPI.getTrackLyrics(tracks.message.body.track_list[0]?.track?.track_id.toString())

    return lyrics.message.body.lyrics.lyrics_body
  }
  catch (error) {
    console.log(error)

    return null
  }
}

export default trackLyricsHandler
